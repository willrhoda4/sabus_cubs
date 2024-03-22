







// configure your environment variables
import   dotenv from 'dotenv';
         dotenv.config();

import   pkg, { PoolClient } from 'pg';

const  { Pool  }  = pkg

import { Request, 
         Response,
         NextFunction } from 'express';





// Assuming your environment variables are correctly set for your production environment
// and there's no need for SSL in the internal communication between your app and database.

const pool = new Pool({
    user:     process.env.PG_USER,     // e.g., 'sabus_cubs_admin'
    host:     process.env.PG_HOST,     // Since it's on the same droplet, this could be 'localhost'
    database: process.env.PG_DATABASE, // e.g., 'sabus_cubs'
    password: process.env.PG_PASSWORD,
    port:     process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) 
                                  : 5432, // Default PostgreSQL port
} );





// type definition for the simpleQuery and atomicQuery functions.
export type CallbackFunction = (data: unknown[], response?: Response) => void;


// accepts an array of queries, parameters, and callbacks, then
// executes the queries in order, passing the results to the callbacks.
function atomicQuery (
                        request:    Request, 
                        response:   Response, 
                        queries:    string[],
                        parameters: unknown[][], 
                        callbacks:  CallbackFunction[],
                        successMsg: string, 
                        next?:      NextFunction
                     ) { 


    // start at the first query.
    let steps : number = 0;

    // recursive function that executes the queries in order.
    function step( err: Error, client: PoolClient, release: () => void ) : void {   console.log('stepping')


        // set our index before incrementing steps.
        // if there is a parameter array at the index, pass it in with the query.
        const index     : number      = steps;
        const query     : string      = queries[index];
        const paramArgs : unknown[]   = parameters[index] ?? [];

      



        // if there are still queries left to execute, execute the next one.
        if (steps !== queries.length) {

            // increment steps.
            steps++;
                                    console.log('prequery\n')
           
            // execute the query.
            client.query( query, paramArgs, (err, res) => {         console.log('postquery\n')

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
            } )


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
    pool.connect((err, client, release) => {    console.log('connecting')

        if (err) { return console.error('Error acquiring client', err.stack) }

        console.log('about to begin');
        client.query('BEGIN', (err) => {    console.log('beginnig\n');

            if (err) { return console.error('Error starting transaction', err.stack) }

            console.log('about to step\n');
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
                        cleanUp?    : CallbackFunction,
                        next?       : NextFunction
                    ) {

    // if there is a parameter array at the index, pass it in with the query.
    const paramArgs : unknown[] = parameters ? parameters : [];

    pool.query(query, paramArgs, (err, res) => {
        
        if (err) {  
                    console.log(err.stack);
                    response.status(400).send(err.message);
                 } 
        else     {   
                    cleanUp && cleanUp( res.rows, response );
                    if (!response.writableEnded) {  // check if the headers (response) have already been sent (during cleanUp)
                                                    // if they haven't, either call next() or send the response.
                        next ? next() : response.send(res.rows); 
                    }
                 }    
    } ) 
}                 




/* 
Universal getData function that accepts request bodies in this format => [   'table_name', 
                                                                           [ [array, of], [filter, arrays] ],
                                                                           { 
                                                                                orderBy: 'optional',
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

        for (let i = 0; i < filters.length; i++) {                
                  
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





// updateData function that accepts a table name, 
// an object containing the columns and values to update as key-value pairs, 
// and an array of arrays containing the columns and values to filter by.
// [ 'table', { column: value, column2: value2 }, [ [column, value], [column, value] ] ]
const updateData = (request: Request, response: Response) => {                 


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




