





// interface for GoogleMap component
export interface GoogleMapProps {
    src         : string;
    className?  : string;
}



// interface for FacebookFeed component
export interface FacebookFeedProps {
    name    : string;
    url     : string;
}



export interface SocialPlatformProps {
    name    : string;
    icon    : React.ComponentType<React.SVGProps<SVGSVGElement>>;
    content : React.ReactNode;
    url     : string;
}


export interface ContactProps {
    photoData   : string[];
}

