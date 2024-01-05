









import   db         from './database';
import   Axios      from 'axios';
import { Request, 
         Response } from 'express';




interface IGToken {
    [key: string]: string | Date;

    id           : string;
    token        : string;
    refresh_date : Date;
}

async function getIGtoken(request: Request, response: Response) {          


    const { pool }       = db;
    
    const getQuery       = `SELECT * FROM ig_token WHERE id = 'api_token'`;

    const getIGTokenData = async (): Promise<IGToken | void> => {

        try         {
                        const res = await pool.query(getQuery);
                        return res.rows[0];
                    } 
        catch (err) {
                        const error = err as Error;
                        console.log(error.stack);
                        response.status(400).send(error.message);
                     }
    };



    const updateQuery = `UPDATE ig_token SET token = $1, refresh_date = $2 WHERE id = 'api_token'`;

    const updateIGTokenData = async (token: string, refreshDate: Date): Promise<void> => {

        try         {
                        await pool.query(updateQuery, [token, refreshDate]);
                    } 
        catch (err) {   
                        const error = err as Error;
                        console.log(error.stack);
                        response.status(400).send(error.message);
                    }
    };


    try {

        const   tokenData     = await getIGTokenData();

        if    (!tokenData) {  throw new Error('No token data found'); }

        const { token, 
                refresh_date } = tokenData;

        response.json( { token } );


        const currentDate = new Date();
        const refreshDate = new Date(refresh_date);


        if (currentDate >= refreshDate) {

            const tokenGetter = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&&access_token=${token}`;

            try         {
                            const response = await Axios.get(tokenGetter);
                            const newToken = response.data.access_token;
                            const newExpiry = response.data.expires_in;

                            const newRefreshDate = new Date();
                            newRefreshDate.setSeconds(newRefreshDate.getSeconds() + newExpiry - 2592000);  // 30 days buffer

                            await updateIGTokenData(newToken, newRefreshDate);
                        } 
            catch (err) {
                             console.error('Failed to refresh Instagram token:', err);
                             // Send an email notification here
                        }
        }

    } catch (err) {

        console.error('Failed to retrieve Instagram token data:', err);
        response.status(500).send('Server error');
    }
}

export default { getIGtoken };
