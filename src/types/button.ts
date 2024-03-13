








import { Theme } from './styles';



// interface for all-purpose button component
export interface ButtonProps {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
     onClick?   :  (event: any) => any;
     text       :   string;
     theme?     :   Theme;
     styles?    :   string;
 }





// type for ButtonBank's helper function Button
export type ButtonArgs = [ 

    string, 
    React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined, 
    string | undefined,
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, 
    boolean | null | undefined,
    number
];



// props interface for ButtonBank component
export interface ButtonBankProps {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClicks      : ((event: any) => any)[];
    names         : string[];
    icons?        : React.ComponentType<React.SVGProps<SVGSVGElement>>[];
    stroke?       : string;
    conditions?   : boolean[];
    wrapStyle?    : string;
    currentState? : string | number;
}





export interface EditorButtonsProps {
    id:           number;
    rank:         number;
    index:        number;
    table:        string;
    pkName:       string;
    loadData:     () => void;
    dataSize:     number;
    editing:      false | number;
    wrapStyle?:   string;
    setEditing?:  (arg0: false | number) => void;
    releaseData?: {
                    id:        number;
                    html:      string;
                    pdf_url:   string;
                    headline:  string;
                    publish:   boolean;
                    published: boolean
                  }       
}



