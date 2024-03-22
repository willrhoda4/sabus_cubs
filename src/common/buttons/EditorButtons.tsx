










import   useNotification              from '../../hooks/useNotification.js';

import { EditorButtonsProps }         from '../../types/button.js';

import   ButtonBank                   from './ButtonBank.js';

import   DeleteIcon                   from '../../assets/icons/trash.svg?react';
import   EditIcon                     from '../../assets/icons/edit.svg?react';
import   DemoteIcon                   from '../../assets/icons/arrowDown.svg?react';
import   PromoteIcon                  from '../../assets/icons/arrowUp.svg?react';
import   MailIcon                     from '../../assets/icons/mail.svg?react';

import   Axios                        from 'axios';  

import   authToken                   from '../../utils/authToken.js';







// Provides a bank of buttons for the editor pages.
export default function EditorButtons ({    id, 
                                            rank, 
                                            index,
                                            table,
                                            pkName,
                                            editing,
                                            loadData,
                                            dataSize,
                                            wrapStyle,
                                            setEditing,
                                            releaseData  }
                                          : EditorButtonsProps ) { 


    const notification = useNotification();





    // reveals or hides the form for editing the item.
    function showForm () {                             

        // function is only available if 
        // editing andsetEditing is passed in.
        if (!(editing !== undefined && setEditing)) return;            

        editing !== id ? setEditing(id)
                       : setEditing(false);            
    }








    
    // deletes an item from the database.
    function deleteItem() {


        const warning   = "Are you sure you want to delete this item from the database?";
      
        const reqBody = [ table, pkName, id, rank ];
    

        window.confirm(warning) &&

            Axios.post(`${import.meta.env.VITE_API_URL}admin/deleteData`, reqBody, authToken() )
                 .then( ()   => loadData()                                                )
                 .catch( err => console.log(err)                                          );
        
      }








    // reranks an item in the database.
    
    function rerankItem (newRank : number) {  


            const reqBody =  [ table, pkName, id, rank, newRank ];
                    
            Axios.post( `${import.meta.env.VITE_API_URL}admin/reRankData`,  reqBody,  authToken()  )  
                 .then(  ()  => loadData()                                                    )
                .catch(  err => console.log(err)                                              );              

    }

        // note that we decrement the rank of the item being demoted,
        // but we increment the index, as they're loaded inversely.
        const demoteItem =  () => rerankItem(rank-1);

        const promoteItem = () => rerankItem(rank+1);





    // triggers a news release publication.
    function publish () {


        // typeguard to faciliatate destructuring.
        if ( !releaseData || !( 'published' in releaseData ) ) { return; }


        // remove the published property from the release data.
        // the remaining object will be our request body.
        const { published, ...reqBody } = releaseData;
        /**
         * Property 'published' does not exist on type '{ id: number; html: string; pdf_url: string; headline: string; publish: boolean; published: boolean; } | undefined'.ts(2339)
         */


        // if the release has already been published,
        // alert the user and abort the request.
        if ( published ) return window.alert('this news release has already been published.')

        
        const warning = "Are you sure you want to publish this news release?";
        

        // otherwise, confirm the publication
        if  ( window.confirm(warning) ) { 

            notification('publishing news release...');

            Axios.post(`${import.meta.env.VITE_API_URL}admin/publishNewsRelease`, reqBody, authToken()  )
                 .then(  res => { notification(res.data);   loadData() }                          )
                 .catch( err =>   notification(err.message)                                       );
        }
    }




    // the button arrays are passed in when rendering the component.
    const buttonNames       = [ 'delete',         'edit',           'promote',        'demote'              ];
    const buttonIcons       = [  DeleteIcon,       EditIcon,         PromoteIcon,      DemoteIcon           ];
    const buttonFunctions   = [  deleteItem,       showForm,         promoteItem,      demoteItem           ];
    const buttonConditions  = [  true,             true,             index !== 0,      index !== dataSize-1 ];




    // implements the publish button if releaseData is passed in.
    if ( table === 'news_releases' ) {

             buttonNames.push('publish');
             buttonIcons.push(MailIcon);
         buttonFunctions.push(publish);
        buttonConditions.push(true);
    }
    

   // render the button bank.
    return (

        <div className={wrapStyle}>
            <ButtonBank
                names={      buttonNames      }
                icons={      buttonIcons      }
                stroke={    '#252D33'         }
                onClicks={   buttonFunctions  }
                conditions={ buttonConditions }
            />
        </div>
    )
}
