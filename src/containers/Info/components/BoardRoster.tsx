












/**
 * displays the board roster on the info page,
 * as well as on the admin dashboard
 */



import   BoardForm                 from '../../Admin/components/forms/BoardForm';

import   boardProfile              from './BoardProfile';

import   EditorButtons             from '../../../common/buttons/EditorButtons';

import { BoardMember             } from '../../../types/info';

import   ContentRack               from '../../../common/ContentRack';

import { ContentControls,
         ContentRackWrapperProps } from '../../../types/content';




export default function Board ( { admin } : ContentRackWrapperProps ): JSX.Element {





    // package boardProfile with conditionaly rendered EditorButtons and updateForm
    function BoardProfile ( boardMember : BoardMember, 
                            index       : number, 
                            controls    : ContentControls ) : JSX.Element {


        const {  id, rank } = boardMember;

        const { 
                getData,
                editing, 
                dataSize,
                setEditing, 
        
              } = controls;


        return (

            <div className='flex flex-col items-center'>

                { boardProfile(boardMember) }

                {
                    admin && 
                    
                    <>
                    
                        <EditorButtons  
                                    id={ id   as number   } 
                                  rank={ rank as number   } 
                                 index={ index            }
                                 table={ 'board'          }
                                pkName={ 'id'             }
                               editing={ editing          }
                              loadData={ getData          }
                              dataSize={ dataSize         }
                             wrapStyle={ 'mt-4'           }
                            setEditing={ setEditing       } 
                        />

                    { editing === id && <BoardForm getData={getData} update={boardMember} /> }
                    
                    </>
                }

            </div>
        )
    }




    

    return  <ContentRack<BoardMember> 
                        table='board' 
                renderContent={BoardProfile} 
                    wrapStyle={`
                                w-full h-fit
                                py-24 px-8 xl:px-24
                                grid gap-8 xl:gap-16
                                grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                              `}
            />
}