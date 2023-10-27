







import { EditorButtonsProps }         from '../../types/button.js';
import { SvgIcon            }         from '../../types/image.js';

import   ButtonBank                   from './ButtonBank.js';

import   deleteIcon                   from '../../assets/icon_trash.svg';
import   editIcon                     from '../../assets/icon_edit.svg';
import   demoteIcon                   from '../../assets/icon_arrowDown.svg';
import   promoteIcon                  from '../../assets/icon_arrowUp.svg';

// create SvgIcon objects
const    deleteIconObj  :  SvgIcon = { svgContent: deleteIcon  };
const    editIconObj    :  SvgIcon = { svgContent: editIcon    };
const    demoteIconObj  :  SvgIcon = { svgContent: demoteIcon  };
const    promoteIconObj :  SvgIcon = { svgContent: promoteIcon };





import Axios            from 'axios';  





// Provides a bank of buttons for the editor pages.
export default function EditorButtons ({    id, 
                                            rank, 
                                            index,
                                            table,
                                            pkName,
                                            editing,
                                            loadData,
                                            dataSize,
                                            setEditing  }
                                          : EditorButtonsProps ) { 



    // reveals or hides the form for editing the item.
    function showForm () {                                  console.log('showForm')

        // function is only available if 
        // editing andsetEditing is passed in.
        if (!(editing !== undefined && setEditing)) return;               console.log(id)

        editing !== id ? setEditing(id)
                       : setEditing(false);                 console.log(editing)
    }


    
    // deletes an item from the database.
    function deleteItem() {


        const warning   = "Are you sure you want to delete this item from the database?";
      
        const reqBody = [ table, pkName, id, rank ];
    

        window.confirm(warning) &&

            Axios.post(`${import.meta.env.VITE_API_URL}deleteData`, reqBody )
                 .then( ()   => loadData()                                  )
                 .catch( err => console.log(err)                            );
        
      }








    // reranks an item in the database.
    
    function rerankItem (newRank : number) {  


            const reqBody =  [ table, pkName, id, rank, newRank ];
                    
            Axios.post( `${import.meta.env.VITE_API_URL}reRankData`,  reqBody   )  
                 .then(  ()  => loadData()                                      )
                .catch(  err => console.log(err)                                );  

    }

        // note that we decrement the rank of the item being demoted,
        // but we increment the index, as they're loaded inversely.
        const demoteItem =  () => rerankItem(rank-1);

        const promoteItem = () => rerankItem(rank+1);


    // the button arrays are passed in when rendering the component.
    const buttonNames                 = [ 'delete',         'edit',           'promote',        'demote'              ];
    const buttonIcons  :    SvgIcon[] = [  deleteIconObj,    editIconObj,      promoteIconObj,   demoteIconObj        ];
    const buttonFunctions             = [  deleteItem,       showForm,         promoteItem,      demoteItem           ];
    const buttonConditions            = [  true,             true,             index !== 0,      index !== dataSize-1 ];



    

   // render the button bank.
    return (

            <ButtonBank
                names={      buttonNames      }
                icons={      buttonIcons      }
                onClicks={   buttonFunctions  }
                conditions={ buttonConditions }
            />
    )
}
