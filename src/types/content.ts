








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
    className?:     string;
    key?:           number;
    renderContent: (    content:   T, 
                        index:     number,
                        controls : ContentControls     
                   ) => JSX.Element;
}



export interface ContentRackWrapperProps {
    
    
    admin?: boolean;
    key?:   number;

}

