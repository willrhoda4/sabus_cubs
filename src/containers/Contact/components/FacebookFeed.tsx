







// import { useEffect, useMemo } from 'react';





// interface FacebookFeedProps {
//         name: string;
//         url: string;
//     }

// // loads a facebook feed component.
// // basically implements the embed instructions from facebook.
// // https://developers.facebook.com/docs/plugins/page-plugin/
// // just pass in the url of the page you want to embed as a prop.
// // name prop  only displays on failure.
// export default function FacebookFeed ({name, url} : FacebookFeedProps) {


//     // injects the facebook sdk script into the DOM when the component mounts.
//     useEffect(() => {

//         const script = document.createElement('script');
//               script.src='https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0&appId=1229119547492444&autoLogAppEvents=1';
//               script.crossOrigin='anonymous';
//               script.nonce='DSHjCoBi';
//               script.async = true;
//               script.defer = true;                      
                        
//         document.body.prepend(script);

//         return () => { document.body.removeChild(script); }

//     }, [name, url]);


//     // checks if the facebook sdk has loaded every 250ms
//     // once it has, it parses the DOM for any facebook embeds.
//     // this prevents display errors when user navigates away from the page and back.
//     useEffect(() => { 

//         declare var FB: any;
        
//         function loadFeed () {

//             if (Object.hasOwn(window, 'FB')) {  return window.FB.XFBML.parse();          }
//             else                             {  return setTimeout(() => loadFeed, 250);  }
        
//         }
        
//         loadFeed();
        
//     },[]);

// /*
//     hasOwn throws this:
//     Property 'hasOwn' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2022' or later.ts(2550)

//          vv
//     wind.FB.XFBML.parse() throws this:
//     Property 'FB' does not exist on type 'Window & typeof globalThis'.ts(2339)

// */



//     // returns the facebook feed component. 
//     const feed = (url : string, name : string) =>     <>
//                                                         <div id="fb-root"/>

//                                                         <div style={{width: '40vmin', height: '60vmin'}}
//                                                             className='fb-page'
//                                                             data-href={url}
//                                                             data-tabs='timeline'
//                                                             data-width="500"
//                                                             data-small-header='true'
//                                                             data-adapt-container-width='true'
//                                                             data-hide-cover='true'
//                                                             data-show-facepile='true'
//                                                         >
                                                            
//                                                             <blockquote
//                                                                 cite={url}
//                                                                 className='fb-xfbml-parse-ignore'
//                                                             >
//                                                                 <a href={url}>{name}</a>
//                                                             </blockquote>
                                                            
//                                                         </div>
//                                                     </>
    
//     // memoizes the feed component or it won't render.
//     const  thisFeed = useMemo (() => feed(url, name), [url, name]);
     

//     // returns the feed component.
//     return thisFeed;


// }

import { useEffect } from 'react';

declare const FB : { XFBML: { parse: () => void; }; }

;
interface FacebookFeedProps {
    name: string;
    url: string;
}

export default function FacebookFeed({ name, url }: FacebookFeedProps) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0&appId=1229119547492444&autoLogAppEvents=1';
        script.crossOrigin = 'anonymous';
        script.nonce = 'DSHjCoBi';
        script.async = true;
        script.defer = true;

        // Load feed once the script is loaded
        script.onload = () => {
            if (Object.prototype.hasOwnProperty.call(window, 'FB')) {
                FB.XFBML.parse(); 
            }
        };

        document.body.prepend(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div id="fb-root" />

            <div 
                style={{ width: '40vmin', height: '60vmin' }}
                className='fb-page'
                data-href={url}
                data-tabs='timeline'
                data-width="500"
                data-small-header='true'
                data-adapt-container-width='true'
                data-hide-cover='true'
                data-show-facepile='true'
            >
                <blockquote cite={url} className='fb-xfbml-parse-ignore'>
                    <a href={url}>{name}</a>
                </blockquote>
            </div>
        </div>
    );
}

