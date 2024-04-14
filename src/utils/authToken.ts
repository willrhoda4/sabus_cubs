






/**
 *  prepares a a headers object with the authorization header set 
 *  to the admin token, if it exists in local storage.
 */





import  { jwtDecode } from 'jwt-decode';


interface DecodedToken {
    exp: number;
}




export default function authToken( check? : 'check' ) : Partial<{ headers: { Authorization: string } }> | boolean {


    // helper function to redirect to login page
    function redirectToLogin() {
        window.location.href = '/simba?tokenError=true';
    }


    // check for token in local storage
    const token = localStorage.getItem('jwt');


    // if check is set to 'check' return true if token exists
    if ( check ) return !!token;
    

    // handle missing token - redirect and return empty config
    if ( !token ) {

        window.location.href !== '/simba' && redirectToLogin();
        return {};
    }


    // decode the token to check expiry
    const decodedToken : DecodedToken = jwtDecode(token); 
    const currentTime  = Date.now() / 1000;


    // Handle expired token - redirect and return empty config
    if (decodedToken.exp < currentTime) {

        redirectToLogin();
        localStorage.removeItem('jwt');
        return {};
    }

    // if all's well return config with authorization header set
    return { headers: { Authorization: `Bearer ${token}` } };
}


