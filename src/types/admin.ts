







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




export interface NewsRelease {
    [key: string]: string | number | Date;

    id:         number;
    date:       Date;
    headline:   string;
    content:    string;
    pdf_url:    string;
    html:       string;
    rank:       number;
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




