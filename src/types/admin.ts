







import { FAQ, BoardMember } from './info';
import { Item }             from './support';
import { Field }            from './form';


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
    fields       :  Field[];
    table        :  string;
}

// interface for components that wrap AdminForm
export interface AdminFormParentProps {

    update?      :  FAQ | BoardMember | Item;
    getData      :  dataReqType;
    setEditing?  :  setEditingType;

}



