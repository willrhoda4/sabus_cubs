














export interface ContentControls {

    getData:      () => void;
    dataSize:     number;
    editing:      number | false;
    setEditing:   React.Dispatch<React.SetStateAction<number | false>>;
    displayed:    number | false;
    setDisplayed: React.Dispatch<React.SetStateAction<number | false>>;
}





export interface ContentRackProps<T> {

    table:          string;
    wrapStyle?:     string;
    key?:           number;
    renderContent: (    content:   T, 
                        index:     number,
                        controls : ContentControls     
                   ) => JSX.Element | null;
}





export interface ContentRackWrapperProps {
    
    admin?: boolean;
    key?:   number;
}





export interface SectionTitleProps {

    title          : string;
    blurb          : string;
    bgClass        : string;
    textClass      : string;
    textRight?     : boolean;
    responsive?    : boolean;
}



