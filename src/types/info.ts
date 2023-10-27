



import { SvgIcon } from './image';



// props interface for info copy
export interface ActionValueProps {
    title:      string;
    copy:       string;
    icon:       SvgIcon;
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
  

export interface FAQBuffetProps {
    
    
    admin?: boolean;
    key?:   number;

}
