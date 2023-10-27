







import { FAQ, BoardMember } from './info';
import { Item }             from './support';


type dataReqType    = () => void;
type setEditingType = (arg0: boolean | number) => void;


// interface for Admin container component
export interface AdminProps {

    editing: string;
}



// interface for Admin form components
export interface AdminFormProps {

    update?      :  FAQ | BoardMember | Item;
    getData      :  dataReqType;
    setEditing?  :  setEditingType;
}



