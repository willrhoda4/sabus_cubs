






/**
 * 
 *  displays a list of emails.
 *  gets managed on the emails page in the admin dashboard,
 *  along with our list of journalists.
 * 
 *  although it's called "EmailListRack", it doesn't actually
 *  leverage the ContentRack component, like other racks in this project,
 *  since it doesn't require ranks.
 * 
 */






import { useState,
         useEffect   }       from 'react';

import   useNotification     from '../../../../hooks/useNotification';

import   Axios               from 'axios';

import   Card                from '../../../../common/cards/Card';
import   Button              from '../../../../common/buttons/Button'; 

import { EmailListUser   }   from '../../../../types/admin';

import   IconDelete          from '../../../../assets/icons/trash.svg?react';
import   IconCopy            from '../../../../assets/icons/copy.svg?react';
import   IconError           from '../../../../assets/icons/error.svg?react';

import   copy                from '../../../../assets/copy';

import   authToken          from '../../../../utils/authToken';



export default function EmailListRack(): JSX.Element {


    const [ users, setUsers      ] = useState< EmailListUser[] | 'error' >([]);

    const          notification    = useNotification();



    // requests email data from server 
    function loadData() {

        Axios.post(`${import.meta.env.VITE_API_URL}admin/getAdminData`, ['emails'], authToken() )    
             .then( res => setUsers(res.data)                                                   )
             .catch( () => setUsers('error')                                                    )
    }

    // sets data to state on initial render
    useEffect(() => { loadData() }, [] )

        



    // builder function for each journalist
    function renderEmailListUser ( user : EmailListUser ) : JSX.Element {


        const   {
                    id,
                    email,
                } = user;

         
        // click handler for delete icon.
        // deletes an item from the database.
        function deleteEmail ( id : number ) {

            // warning msg for alert
            const warning   = 'Are you sure you want to delete this email from your database?';
        
            // request body for delete request
            const reqBody = [ 'emails', 'id', id,  ];

            // success handler
            const deleteSuccess = () => {
                                            loadData();
                                            notification('email successfully deleted.');
                                        }
            
            
            const deleteFailure = () =>     notification('there was a problem deleting the email. please try again later.');
        

            // confirm the delete before you send the request
            window.confirm(warning) &&

                Axios.post(`${import.meta.env.VITE_API_URL}admin/deleteData`, reqBody, authToken() )
                     .then(  ()  => deleteSuccess()                                                )
                     .catch( ()  => deleteFailure()                                                );
        }


        // click handler for copy icon.
        // copies the email to the clipboard.
        function copyEmail () {

            navigator.clipboard.writeText(email);
            notification('email copied to clipboard.');
        }
      


        // one list item per user
        return  (
            
            <ul      key={id}
                className={`
                                w-[600px] maw-w-10/12
                                flex items-center justify-between
                                p-2 
                                border-b-2 border-black
                          `}
            >
                {/* email on the left side */}
                <p>{email}</p>


                {/* copy and delete icon on right side */}
                <div className={`
                                    flex items-center justify-between
                                    w-[70px]

                                `}
                >
                    <IconCopy
                        height={'24'}
                        width={'24'}
                        onClick={ () => copyEmail() }
                        className={'cursor-pointer'}
                    />

                    <IconDelete
                        height={'24'}
                        width={'24'}
                        onClick={ () => deleteEmail(id) }
                        className={'cursor-pointer'}        
                    />

                </div>
            
            </ul>
        )
    }


    // click handler for copy list button.
    function copyList ()  {

        // if there's an error, don't try to copy the list.
        // just notify the user.
        if (users === 'error') { return notification('there was a problem copying the list. please try again later.') }

        // otherwise, copy the list.

        // first, build the list of emails.
        const emailList = users.map( user => user.email ).join(', ');

        // then, copy it to the clipboard.
        navigator.clipboard.writeText(emailList);

        // finally, notify the user.
        notification('list copied to clipboard.');
    }


    return  (
        
       <div>
        {
            users === 'error'   ?   <Card 
                                           wrapClass='max-w-2xl self-center justify-self-center'
                                        headingClass='bg-brand-red text-white'
                                             heading='database error'
                                        contentClass='flex items-center justify-between'
                                    >
                                        <IconError 
                                            className='mr-8'
                                            height={'100'}
                                            width={'100'} 
                                        />
                        
                                        { copy('databaseError') }
                                    </Card>

                                :   <div className={`
                                                        w-fit h-fit
                                                        flex flex-col items-center
                                                   `}
                                    >
                                        <div className={`
                                                            w-fit h-fit max-x-2xl
                                                            overflow-scroll
                                                            flex flex-col 
                                                            rounded-md
                                                            border-2 border-black
                                                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                                    `}
                                        >
                                            { users.map(renderEmailListUser) }
                                        </div>

                                        <Button 
                                            text='copy list'
                                            onClick={ () => copyList() }
                                            styles={'my-8'}
                                        />


                                    </div>
            }
        </div>
    )
}