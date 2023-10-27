







import   Axios                 from 'axios';

import { Item }                from '../../../types/support';

import { ItemsListProps }      from '../../../types/support';

import { useState, 
         useEffect }           from 'react';

import   EditorButtons         from '../../../common/buttons/EditorButtons';

import   ItemsForm             from '../../Admin/components/forms/ItemsForm';





export default function ItemsList ({ admin } : ItemsListProps) : JSX.Element {


    const [ items,      setItems      ] = useState<Item[]>([]);
    const [ editing,    setEditing    ] = useState<number | boolean>(false);


    // requests items data from server amd sets it to state
    function getItems () {

        const reqBody = ['items', undefined, { orderBy: 'rank' }];

        Axios.post(`${import.meta.env.VITE_API_URL}getData`, reqBody )
             .then(   res => setItems(res.data)                      )
            .catch(  err => console.log(err )                        );

    }

    // get items on initial load
    useEffect(() => {  getItems() }, [] )


    function itemLi (item : Item, index : number) : JSX.Element {



        return  <ul      key={item.id}
                    className={`flex flex-col`}
                >
                    
                    {
                        admin && editing === item.id 
                            ? <ItemsForm getData={getItems} update={item} setEditing={setEditing}/> 
                            : <p>{item.item}</p>
                    }
              
                   
                    {   admin && <EditorButtons 
                                    id={item.id} 
                                    rank={item.rank} 
                                    index={index}
                                    table={'items'}
                                    pkName={'id'}
                                    editing={editing}
                                    loadData={getItems}
                                    dataSize={items.length}
                                    setEditing={setEditing}
                                 />
                    }
                </ul>
    }

    return (

        <ul className={`
                            w-full h-fit
                            flex flex-col
                       `}
        >
            { items.length > 0 && items.map((item : Item, index) => itemLi(item, index)) }
        </ul>

    )
}