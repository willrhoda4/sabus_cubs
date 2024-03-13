







import { FAQ, BoardMember } from './info';
import { Item }             from './support';
import { Field }            from './form';
import { Story }            from './news';
import { Theme }            from './styles';
import { BrandColours }     from '../utils/brandColours';




type dataReqType    = () => void;
type setEditingType = (arg0: false | number) => void;


// interface for Admin container component
export interface AdminProps {
    editing: string;
    brandColours: BrandColours;
}




export interface Journalist {
    [key: string]: string | number;

    id:         number;
    name:       string;
    outlet:     string;
    email:      string;
    rank:       number;
}


export interface EmailListUser {
    [key: string]: string | number;

    id:         number;
    email:      string;
}




export interface NewsRelease {
    [key: string]: string | number | Date | boolean;

    id:         number;
    date:       Date;
    headline:   string;
    content:    string;
    pdf_url:    string;
    html:       string;
    rank:       number;
    published:  boolean;
}




// interface for Admin form components
export interface AdminFormProps {

    update?      :  FAQ  | Story      | BoardMember
                 |  Item | Journalist | NewsRelease;
    getData      :  dataReqType;
    setEditing?  :  setEditingType;
    fields       :  Field[];
    table        :  string;
    style?       :  Theme;
}
 
// interface for components that wrap AdminForm
export interface AdminFormParentProps {

    update?      :  FAQ  | Story      | BoardMember
                 |  Item | Journalist | NewsRelease;
    getData      :  dataReqType;
    setEditing?  :  setEditingType;
    // style?       :  Theme;

}



export interface LoginProps { 
    
    setAuthenticated : React.Dispatch<React.SetStateAction<boolean>> 

}



// interfaces for DonationRack
export interface DonationRackProps { 
    displayed : string 
}

export interface Donee {
    name: string;
    email: string;
    created_on: string;
}
  
 export  interface Donation {
    name: string;
    date: string;
    amount: number;
    subscription_id: string;
}
  
export   interface Subscription {
    name: string;
    amount: number;
    created_on: string;
    cancelled_on: string;
    cancelled_because: string;
}
  
export type DonationData = Donee | Donation | Subscription;
  
 