






/**
 *  prepares a a headers object with the authorization header set 
 *  to the admin token, it it exists in local storage.
 */





import  {jwtDecode } from 'jwt-decode';


interface DecodedToken {
    exp: number;
}




export default function authToken(): Partial<{ headers: { Authorization: string } }> {


    // helper function to redirect to login page
    function redirectToLogin() {
        window.location.href = '/simba?tokenError=true';
    }

    // check for token in local storage
    const token = localStorage.getItem('jwt');
    

    // handle missing token - redirect and return empty config
    if ( !token ) {

        redirectToLogin();
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


