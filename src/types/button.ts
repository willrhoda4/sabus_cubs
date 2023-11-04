








import { Theme } from './styles';



// interface for all-purpose button component
export interface ButtonProps {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
     onClick: (event: any) => any;
     text:    string;
     style?:  Theme;
 }





// type for ButtonBank's helper function Button
export type ButtonArgs = [ 

    string, 
    string | undefined, 
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
    icons?        : string[];
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
    editing?:     boolean | number;
    setEditing?:  (arg0: boolean | number) => void;
    releaseData?: {
                    html:     string;
                    publish:  boolean; 
                    pdf_url:  string;
                    headline: string;
                  }       
}





export interface SVGIconProps {
    icon:        string;
    alt:         string;
    stroke?:     string;
    size?:       string;
    wrapStyles?: string;
}
