








export interface ContentControls {
    getData:      () => void;
    dataSize:     number;
    editing:      number | boolean;
    setEditing:   React.Dispatch<React.SetStateAction<number | boolean>>;
    displayed:    number | boolean;
    setDisplayed: React.Dispatch<React.SetStateAction<number | boolean>>;
}



export interface ContentRackProps<T> {
    table:          string;
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

