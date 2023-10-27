








// item interface for Items component.
// also gets called to the admin dashboard form.
export interface Item {
    [key: string]: string | number;
    
    id    : number;
    item  : string;
    rank  : number;
  
}



export interface ItemsListProps {
    
    
    admin?: boolean;
    key?:   number;

}