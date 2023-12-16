


/**
 * displays the board roster on the info page,
 * as well as on the admin dashboard
 */



import BoardForm from '../../Admin/components/forms/BoardForm';

import boardProfile from './BoardProfile';

import EditorButtons from '../../../common/buttons/EditorButtons';

import Axios from 'axios';

import { useState, useEffect } from 'react';

import { BoardMember } from '../../../types/info';




export default function Board ( { admin } : { admin? : boolean } ): JSX.Element {


    const [ boardData, setBoardData ] = useState<BoardMember[]>([]);
    const [ editing,   setEditing   ] = useState<false | number>(false);


    // getBoard is a function that makes a POST request to the server for the board data.
    const   getBoard = () => {

        const reqBody =  [ 'board', undefined, { orderBy: 'rank' } ]

        Axios.post( `${import.meta.env.VITE_API_URL}getData`, reqBody   )
             .then(   res => { setBoardData(res.data)                 } )
             .catch(  err => { console.log(err)                       } )

    }
    // get the data when the component mounts.
    useEffect(() => { getBoard(); }, [])


    // package boardProfile with conditionaly rendered EditorButtons and updateForm
    function BoardProfile (boardMember: BoardMember, index : number) : JSX.Element {


        const {  id, rank } = boardMember;

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
                              loadData={ getBoard         }
                              dataSize={ boardData.length }
                             wrapStyle={ 'mt-4'           }
                            setEditing={ setEditing       } 
                        />

                    { editing === id && <BoardForm getData={getBoard} update={boardMember} /> }
                    
                    </>
                }

            </div>
        )
    }




    

    return (

        <div className={`
                            w-full h-fit
                            py-24 px-8 xl:px-24
                            grid gap-8 xl:gap-16
                            grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                       `}
        >


            { boardData.length > 0 && boardData.map( (boardMember, index) =>    <div key={boardMember.public_id as string} className='flex justify-center'>
                                                                                    { BoardProfile(boardMember, index) }
                                                                                </div> 
                                                   ) 
            }

        </div>

    )
}