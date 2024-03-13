






/**
 * 
 *  displays a list of journalists.
 *  gets managed on its own page in the admin dashboard.
 *  this is the list we feed our news releases to.
 */






import   ContentRack                    from '../../../../common/ContentRack';  

import { ContentRackWrapperProps,
         ContentControls            }   from '../../../../types/content';

import   JournalistForm                from '../forms/JournalistForm';

import { Journalist                 }   from '../../../../types/admin';

import   EditorButtons                  from '../../../../common/buttons/EditorButtons';






export default function JournalistRack({ admin } : ContentRackWrapperProps ): JSX.Element {




    // builder function for each journalist
    function renderJournalist ( journalist : Journalist, index : number, controls : ContentControls ) : JSX.Element {


        const   {
                    id,
                    name,
                    rank,
                    email,
                    outlet,
                    
                } = journalist;

        const   {
                    getData,
                    editing, 
                    dataSize,
                    setEditing, 

                } = controls;


                // one list item per journalist
        return  <ul      key={id}
                    className={`
                                w-[600px] maw-w-10/12
                                flex flex-col
                                p-2 border-b-2 border-black
                              `}
                >
                    <div className={`
                                        flex flex-row 
                                        items-center justify-between
                                   `}
                    >
                        {/* display name, email and outlet, and if they click copy the email. */}
                        <div className={`
                                            flex flex-col 
                                            hover:cursor-copy
                                    `} 
                            onClick={ () => navigator.clipboard.writeText(email) } 
                        >
                            <h3>{ name   }</h3>
                            <p>{  email  }</p>
                            <p>{  outlet }</p>
                        </div>
                        
                    
                        {/* we'll provide the full editor button suite,
                            but delete and edidt are the only two that are really relevant. */}
                        {   admin && <EditorButtons 
                                        id={id} 
                                        rank={rank} 
                                        index={index}
                                        table={'journalists'}
                                        pkName={'id'}
                                        editing={editing}
                                        loadData={getData}
                                        dataSize={dataSize}
                                        setEditing={setEditing}
                                    />
                        }
                    </div>
                        
                    {/* if we're editing this journalist, show the form. */}
                    {               
                        admin && editing === id && <JournalistForm getData={getData} update={journalist} setEditing={setEditing}/> 
                    }
              
                </ul>
    }

    return  <ContentRack<Journalist> 
                table='journalists' 
                renderContent={renderJournalist} 
                wrapStyle={`
                            mt-24
                            rounded-md
                            border-2 border-black
                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                          `} 
            />

    
}