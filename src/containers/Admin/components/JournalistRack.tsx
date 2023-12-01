








import   ContentRack                    from '../../../common/ContentRack';  

import { ContentRackWrapperProps,
         ContentControls            }   from '../../../types/content';

import   JournalistForm                from './forms/JournalistForm';

import { Journalist                 }   from '../../../types/admin';

import   EditorButtons                  from '../../../common/buttons/EditorButtons';




4

export default function JournalistRack({ admin } : ContentRackWrapperProps ): JSX.Element {





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



        return  <ul      key={id}
                    className={`flex flex-col`}
                >
                    <div className={`
                                        flex flex-col 
                                        hover:cursor-copy
                                        border border-blue-300
                                   `} 
                         onClick={ () => navigator.clipboard.writeText(email) } 
                    >
                        <h3>{name}</h3>
                        <p>{email}</p>
                        <p>{outlet}</p>
                    </div>
                    
                    {
                        admin && editing === id && <JournalistForm getData={getData} update={journalist} setEditing={setEditing}/> 
                    }
              
                   
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
                </ul>
    }

    return <ContentRack<Journalist> table="journalists" renderContent={renderJournalist} />

    
}