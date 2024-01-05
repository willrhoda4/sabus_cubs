






export interface InfoProps {
    shadow: string;
}












// BoardMember interface, gets passed to Board component.
// also gets passed into the update property for BoardFormProps
export interface BoardMember {
    [key: string]: string | number;


    full_name:  string;
    title:      string;
    bio:        string;
    public_id:  string;
    rank:       number;
    id:         number;
}



// FAQ interface gets passed to FAQ component
// also gets passed into the update property for FAQFormProps
export interface FAQ {
    [key: string]: string | number;

    id:       number;
    question: string;
    answer:   string;
    rank:     number;
  }
  




// props interface for info copy
export interface ActionValueProps {
    title:      string;
    copy:       string;
    icon:       React.ComponentType<React.SVGProps<SVGSVGElement>>;
}











export interface Statement {
    title:      string;
    copy:       string;
    icon:       React.ComponentType<React.SVGProps<SVGSVGElement>>;
    stroke?:    string;
}



export interface StatementsProps {
    title:         string;
    blurb:         string;
    statements:    Statement[];
    statementsOn?: 'left' | 'right';
    bgClass:       string;
    textClass:     string;
}



export type FAQProps = {
    id              : number    
    question        : string
    answer          : string
    displayed       : false | number
    setDisplayed    : (id: false | number) => void
}