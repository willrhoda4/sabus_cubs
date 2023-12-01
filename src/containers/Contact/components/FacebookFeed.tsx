







import { useEffect } from 'react';

import { FacebookFeedProps } from '../../../types/contact';

declare const FB : { XFBML: { parse: () => void; }; }




export default function FacebookFeed({ name, url }: FacebookFeedProps) {


    // on mount, inject the script tag into the DOM
    useEffect(() => {

        const   script             =  document.createElement('script');
                script.src         = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0&appId=133959569807066'
                script.crossOrigin = 'anonymous';
                script.nonce       = 'DSHjCoBi';
                script.async       =  true;
                script.defer       =  true;

                // Load feed once the script is loaded
                script.onload = () => {
                    if (Object.prototype.hasOwnProperty.call(window, 'FB')) {
                        FB.XFBML.parse(); 
                    }
                };

        document.body.prepend(script);

        return () => { document.body.removeChild(script); }


    }, []);



    return (
        <div className="w-full h-full"> {/* assumethe parent controls the size */}
            <div id="fb-root" />

            <div 
                className='fb-page w-full h-full' 
                data-href={url}
                data-tabs='timeline'
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

