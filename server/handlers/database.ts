







// configure your environment variables
import   dotenv from 'dotenv';
         dotenv.config();

import   pkg, { PoolClient } from 'pg';

const  { Pool  }  = pkg

import { Request, 
         Response,
         NextFunction } from 'express';



// set NODE_ENV to 'production' to activate Heroku configuration.
// otherwise, use local configuration.
const port = process.env.PG_PORT   ?   parseInt(process.env.PG_PORT, 10) : undefined;

const pool = process.env.NODE_ENV === 'production' ? new Pool({
                                                                connectionString: process.env.DATABASE_URL,
                                                                ssl: { rejectUnauthorized: false },
                                                             }) 
                                                   : new Pool({
                                                                user:     process.env.PG_USER,
                                                                host:     process.env.PG_HOST,
                                                                database: process.env.PG_DATABASE,
                                                                password: process.env.PG_PASSWORD,
                                                                port:     port,
                                                                ssl:      false
                                                             });



// type definition for the simpleQuery and atomicQuery functions.
type CallbackFunction = (data: unknown, response?: Response) => void;


// accepts an array of queries, parameters, and callbacks, then
// executes the queries in order, passing the results to the callbacks.
function atomicQuery (  request:     Request, 
                        response:    Response, 
                        queries:     string[],
                        parameters:  unknown[][], 
                        callbacks:   (CallbackFunction | undefined)[],
                        successMsg:  string, 
                        next?:       NextFunction
                     ) { 


    // start at the first query.
    let steps : number = 0;

    // recursive function that executes the queries in order.
    function step( err: Error, client: PoolClient, release: () => void ) : void {


        // set our index before incrementing steps.
        // if there is a parameter array at the index, pass it in with the query.
        const index     : number      = steps;
        const query     : string      = queries[index];
        const paramArgs : unknown[]   = parameters[index] ? parameters[index] : [];

      



        // if there are still queries left to execute, execute the next one.
        if (steps !== queries.length) {

            // increment steps.
            steps++;

           
            // execute the query.
            client.query( query, paramArgs, (err, res) => {

                // if there is an error, rollback the transaction and send the error message.
                if (err) { return client.query('ROLLBACK', () => {   release(); 
                                                                     console.error(`Error executing query ${steps}`, err.stack);
                                                                     response.status(400).send(err.stack)
                                                                 })
                         }
                
                // if there is no error, execute the callback (if defined) and move on to the next query.
                else     {  
                            callbacks[index]?.(res.rows, response); 
                            step(err, client, release);
                         }
            })


        // if there are no more queries to execute, commit the transaction.
        } else {

            client.query('COMMIT', (err) => {
            
                // if there is an error, rollback the transaction and send the error message.
                if (err) { return client.query('ROLLBACK', () =>    {   
                                                                        release();
                                                                        console.error('Error committing transaction', err.stack);
                                                                        response.status(400).send(err.stack)
                                                                    })
                         }

                // if there is no error, release the client and send the success message.
                else     {
                            release();
                            console.log('Transaction completed successfully');
                            next ? next () : response.send(successMsg);
                         }
            })
        }
    }

    // start the transaction.
    pool.connect((err, client, release) => {

        if (err) { return console.error('Error acquiring client', err.stack) }

        client.query('BEGIN', (err) => {

            if (err) { return console.error('Error starting transaction', err.stack) }

            // execute the first query.
            step(err, client, release);
        })
    }) 

}






// accepts a query, parameters, and a callback, then 
// executes the query and passes the results to the callback.
function simpleQuery(
                        response    : Response,
                        query       : string, 
                        parameters? : unknown[], 
                        cleanUp?    : CallbackFunction | undefined,
                        next?       : NextFunction
                    ) {

    // if there is a parameter array at the index, pass it in with the query.
    const paramArgs : unknown[]   = parameters ? parameters : [];

    pool.query(query, paramArgs, (err, res) => {
        
        if (err) { console.log(err.stack);
                   response.status(400).send(err.message);
                 } 
        else     { cleanUp && cleanUp( res.rows, response );
                   next     ? next() : response.send(res.rows); 
                 }
    });
}








/* 
Universal getData function that accepts request bodies in this format => [   'table_name', 
                                                                           [ [array, of], [filter, arrays] ],
                                                                           { 
                                                                                orderBy: optional,
                                                                                groupBy: option_object,
                                                                                limit:   7
                                                                                columns: comma-separated string of columns to select. Default is *
                                                                           },
                                                                          ]
*/


const getData = (request:Request, response:Response) => {



    const table      : string      = request.body[0];
    const filters    : unknown[][] = request.body[1];
    
    let columns, limit, orderBy, groupBy;
    
    if (request.body[2])  {( { 
                                orderBy,
                                limit,
                                groupBy,
                                columns    } = request.body[2]
                          )}
          
   
    let    query                      = !columns  ?  `SELECT * FROM "${table}"`  : `SELECT ${columns} FROM "${table}"`;
    const  parameters : unknown[]     = [];
    let    index                      =  1;

    
    console.log(`generating getData query for ${table}...`);


    if (filters) {

        query += ' WHERE ';

        for (let i = 0; i < filters.length; i++) {                  console.log(query);
                  
            // filter arrays with length 2 look for strict equivalence and are parameterized
            if        (filters[i].length === 2)              {      query += `${filters[i][0]} = $${index} AND `; 
                                                                    parameters.push(filters[i][1]);
                                                                    index += 1;          
                                                             }
            // filter arrays with length 3 and the string 'or' at index 2 are treated the same as filter arrays with
            // length 2, but chained together with an OR.           NOTE: DO NOT REMOVE THIS TRAILING SPACE vvvv
            else if   (       filters[i][2]  === 'or'    )   {      query += `${filters[i][0]} = $${index} OR  `;
                                                                    parameters.push(filters[i][1]);
                                                                    index += 1;          
                                                             }
            // other filter arrays with length three and a string at index 2 pass in the string in lieu of =
            else if   (typeof(filters[i][2]) === 'string')   {      query += `${filters[i][0]} ${filters[i][2]} $${index} AND `; 
                                                                    parameters.push(filters[i][1]);
                                                                    index += 1;          
                                                             }
            // other filter arrays with length three are assumed to have numbners at index 1 and 2 which will be treated
            // as upper and lower limits for the range being queired.                                            
            else if   (filters[i].length === 3)              {      query += `${filters[i][0]} > $${index}   AND `+
                                                                             `${filters[i][0]} < $${index+1} AND `;  
                                                                    parameters.push( parseInt(filters[i][1] as string), 
                                                                                     parseInt(filters[i][2] as string));
                                                                    index += 2;                                                          
                                                             } 
            else                                             {      continue;      }
        }
        query = query.slice(0,-4);
    }

    
    // the following three if statements handle any extrap properties passed in the request body's option object, if present.
    if (groupBy) {                                query += ` GROUP BY ${groupBy}`;
                 }
    if (orderBy) { typeof(orderBy) === 'string' ? query += ` ORDER BY ${orderBy} DESC`
                                                : query += ` ORDER BY ${orderBy[0]} ASC`;
                 }
    if (limit)   {                                query += ` LIMIT ${limit}`; 
                 }
    

    console.log(`query: ${query}\n`);

    
    return simpleQuery(response, query, parameters);
}





// accepts a table name, a primary key name, and an id, then deletes the row with the matching id.
const deleteData = ( request : Request, response : Response ) => {

    const table  : string = request.body[0];
    const pkName : string = request.body[1];
    const id     : number = request.body[2];
    const rank   : number = request.body[3];

    const query1  = `DELETE FROM "${table}" WHERE ${pkName} =$1`;
    const query2  = `UPDATE "${table}" SET rank = rank-1 WHERE rank > $1`;

    if (rank) {

        return atomicQuery(     request, 
                                response,
                              [   query1,   query2   ],
                              [ [ id ],   [ rank ]   ],
                              [],
                                'data successfully deleted'
                          );
    } else {

        return simpleQuery(response, query1, [id]);
    }
}






// accepts a table name, a primary key name, an id, an old rank, and a new rank, then 
// updates the rank of the row with the matching id.
const reRankData = (request: Request, response: Response) => {


    const table         :  string            = request.body[0];
    const pkName        :  string            = request.body[1];
    const id            :  string | number   = request.body[2];
    const oldRank       :           number   = request.body[3];
    const newRank       :           number   = request.body[4];

    
    const parameters1   :           number[]  = [ oldRank, newRank ]; 
    const parameters2   : (string | number)[] = [ newRank, id      ];



    // build query based on whether the new rank is higher or lower than the old rank.
    // if the new rank is the same as the old rank, send an error message.
    let query1;

         if (oldRank > newRank) { query1 = `UPDATE "${table}" SET rank = rank+1 WHERE (rank < $1 AND rank >= $2)` }
    else if (oldRank < newRank) { query1 = `UPDATE "${table}" SET rank = rank-1 WHERE (rank > $1 AND rank <= $2)` }
    else                        { return response.status(400).send('data error (rank === newRank)')               }

    // cleanup query is simpler because it only needs to update the rank of the row with the matching id.
    const query2 =                          `UPDATE "${table}" SET rank = $1 WHERE (${pkName} = $2)`;

    // log to the console before starting query
    console.log(`reRanking data for ${table}\n`);

    return atomicQuery(       request, 
                              response,
                            [ query1,      query2       ],
                            [ parameters1, parameters2  ],
                            [],
                             'rank successfully updated'
                      );
} 





// accepts a table name, an array of columns, a two-dimensional array of parameters, and a returning clause, then
// inserts a new row into the table with the specified columns and parameters.


                                                                        // example request body: [
                                                                        //      table ==>              'articles',
                                                                        //      columns ==>         [  'headline', 'link', 'image', 'description' ], 
                                                                        //      parameters ==>      [ 
                                                                        //                              [ headline1, link1, imageUrl1, description1 ] 
                                                                        //                              [ headline2, link2, imageUrl2, description2 ] 
                                                                        //                          ],
                                                                        //      returning ==>            'article_id'
                                                                        //                        ]
// async function addData (request : Request, response : Response) {


//     // destructure the request body.
//     // convert columns to a string.
//     const table        :   string      = request.body[0];
//     const columns      :   string[]    = request.body[1].join(', ');
//     const columnCount  :   number      = request.body[1].length;
//     const parameters   :   unknown[][] = request.body[2];
//     const returning    :   string | number      = request.body[3];
 
//     // log to the console before starting query
//     console.log(`Adding data to ${table} \n`);
    
//     // transform the parameters array into a values string.
//     const values       =    parameters.map((row, rowIndex) => {

//                                 // make a string of parameter placeholders for each row.
//                                 // get the values into an array, then join them together with commas.
//                                 // return the string wrapped in parentheses and followed by a comma.
//                                 const      rowValues = row.map((value, colIndex) => `$${ colIndex + 1 + (rowIndex * columnCount) }` ).join(', ');
//                                 return `(${rowValues}),`;


//                             // join the rows together with spaces and remove the trailing comma.
//                             }).join(' ').slice(0,-1);

//     // build the query.
//     let query      = `INSERT INTO "${table}" (${columns}) VALUES ${values}`;

//     // if there's a returning clause, add it to the end.
//     // otherwise, just add a semicolon.
//     if (returning) { query+=` RETURNING ${returning};` }
//     else           { query+=';'                        }

//     // log the query to the console.
//     console.log(`${query}\n`);

//     // execute the query.   
//     // flatten the parameters array before passing it in.                        
//     simpleQuery(response, query, parameters.flat());
// }






    type AddDataRequest = [ string, Array<Record<string, unknown>>, (string | number)?  ];
                       // [ table,  parameters,                     returning?          ]

    // accepts a table name and an array of objects.
    // column names are derived from the first object in the array.
    // note the objects in the array must have the same structure, by punishment of error.
    async function addData(request: Request, response: Response) {
  
      // Destructure the request body using named properties.
      const [table, parameters, returning] = request.body as AddDataRequest;
  
      // Extract columns from the first object in the parameters (assuming all objects have the same structure).
      const columns = Object.keys(parameters[0]);
  
      // Log to the console before starting query.
      console.log(`Adding data to ${table}\n`);
  
      // Generate placeholder values for SQL based on columns extracted.
      const values = parameters.map((_, rowIndex) => {
          const placeholders = columns.map((_, colIndex) => `$${colIndex + 1 + (rowIndex * columns.length)}`).join(', ');
          return `(${placeholders})`;
      }).join(', ');
  
      // Flatten parameters for SQL execution.
      const flattenedParameters = parameters.flatMap(row => columns.map(col => row[col]));
  
      // Build the SQL query.
      let query = `INSERT INTO "${table}" (${columns.join(', ')}) VALUES ${values}`;
  
      // If there's a returning clause, append it to the query.
      if (returning) { 
          query += ` RETURNING ${returning};`;
      } else { 
          query += ';'; 
      }
  
      // Log the query to the console for debugging.
      console.log(`${query}\n`);
  
      // Execute the query.
      simpleQuery(response, query, flattenedParameters);
  }







// accepts a table name (string), an array of columns, an array of values,
// and a two-dimensional array of conditions, then updates the row with the matching conditions.
// the conditions array must be in the format [[column, value], [column, value], ...]
// here's an example of a request body:
//
    // const reqBody = [
    //       'archive',                                                     <== table name
    //     [ 'headline',  'link', 'image',  'description'   ],              <== columns
    //     [  headline,    link,   imageUrl, description    ],              <== parameters
    //   [ [ 'article_id', articleId                        ] ]             <== conditions
    // ]
// const updateData = (request : Request, response : Response) => {

    
//     // destructure the request body.
//     const table      : string      = request.body[0];
//     const columns    : string[]    = request.body[1];
//     const parameters : unknown[]   = request.body[2];
//     const conditions : unknown[][] = request.body[3];
    
//     // log to the console before starting query
//     console.log(`Updating table ${table} \n`);

//     // build a string of comma-separated column names and parameter placeholders for the SET clause.
//     const colString : string  = columns.map( (column, index)    => `${column} = $${index+1}`).join(', ');

//     // build a string of AND-separated column names and parameter placeholders for the WHERE clause.
//     const conString : string   = conditions.map( (condition, index) => `${condition[0]} = $${index+1+columns.length}`).join(' AND ');

//     // build the query.
//     const query     : string   = `UPDATE ${table} SET ${colString} WHERE ${conString};`;

//     // log the query to the console.
//     console.log(`${query}\n`);

//     // combine the parameters and condition values into a single array.
//     const values   : unknown[] =  !conditions? parameters : parameters.concat( conditions.map( condition => condition[1] ) );

//     // execute the query.
//     simpleQuery(response, query, values);
// }


const updateData = (request: Request, response: Response) => {                  console.log('here it is : ',request.body[1]);



    // destructure the request body.
    const table         : string                     = request.body[0];
    const updateObj     : { [key: string]: unknown } = request.body[1];
    const conditions    : unknown[][]                = request.body[2];

    console.log(`Updating table ${table} \n`);          

    // Extract columns and values from the updateObj
    const columns         = Object.keys(updateObj);
    const values          = Object.values(updateObj);

    // Build the SET clause string
    const setClause       = columns.map((col, index) => `"${col}" = $${index + 1}`).join(", ");

    // Build the WHERE clause string and extract condition values
    const whereClause     = conditions.map((condition, index) => `${condition[0]} = $${index + 1 + columns.length}`).join(' AND ');
    const conditionValues = conditions.map(condition => condition[1]);

    // Combine values for the query
    const allValues       = values.concat(conditionValues);

    // Build the query string
    const query           = `UPDATE "${table}" SET ${setClause} WHERE ${whereClause};`;

    console.log(`${query}\n`);

    // Execute the query
    simpleQuery(response, query, allValues);
}


 


  
export default  {  pool,
                   getData, 
                   addData, 
                   deleteData, 
                   reRankData,
                   updateData,
                   simpleQuery,
                   atomicQuery,
                };




