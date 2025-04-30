






/**
 * token authentication handler that acts as a gatekeeper to 
 * all the subscriber and admin routes.
 * 
 */


import      jwt            from 'jsonwebtoken';

import { 
            Request, 
            Response,
            NextFunction, } from 'express';





// first stop for authenticateToken.
// checks for a valid token in the request header.
function checkToken ( request: Request, response: Response, next: NextFunction ) {


    // get the token from the request header,
    // then remove the 'Bearer ' prefix.
    const authHeader = request.headers['authorization'];
    const token      = authHeader && authHeader.split(' ')[1];


    // if there is no token, send a 401 response.
    if (token == null) {
        
        console.error('No token found in request header');
        return response.sendStatus(401).statusMessage = 'no token';
    }


    // if there is a token, verify it.
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {

        // if the token is invalid, send a 403 response.
        // otherwise, attach the user object to the response.locals object.
        // then pass control to the next middleware.
        if (err) {
            
            console.error('Invalid token:', err);
            return response.sendStatus(403).statusMessage = 'invalid token';
        }

        response.locals.user = user;
        
        next();
 
    } );
}



// second stop for authenticateToken.
// checks the role of the user attached to the response.locals object.
function checkRole ( role : string ) {
    
    return ( request: Request, response: Response, next: NextFunction ) => {
        
        // if the role is not the one specified in the route, send a 403 response.
        // otherwise, pass control to the next middleware.
        if (response.locals.user.role !== role) {
            
            console.error(`User role ${response.locals.user.role} does not match required role ${role}`);
            return response.sendStatus(403).statusMessage = 'wrong role';
        }
        
        next();
    };
}


// to keep things clean on the top level,
// we export a function that returns an array of middleware.
// this array is then passed to the route handler, with the
// spread operator and the role being authenticated.
//
// eg: router.get('/admin', ...authenticateToken('admin'), adminHandler);
//
export default function authenticateToken ( role : string ) {

    return [ checkToken, checkRole(role) ];
}







 





