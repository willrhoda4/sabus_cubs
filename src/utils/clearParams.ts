








  // Remove query parameters from the current URL
  export default function clearParams () {

    if ( window.history.pushState ) {

      const newurl = window.location.protocol 
                   + "//" 
                   + window.location.host 
                   + window.location.pathname; 
                   
                     window.history.pushState({path:newurl}, '', newurl);
    }
  }
 