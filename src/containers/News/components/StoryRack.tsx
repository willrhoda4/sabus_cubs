











import   ContentRack                    from '../../../common/ContentRack';

import   EditorButtons                  from '../../../common/buttons/EditorButtons';

import   StoryForm                      from '../../Admin/components/forms/StoryForm';

import { Story  }                       from '../../../types/news';

import { ContentRackWrapperProps,
         ContentControls            }   from '../../../types/content';




export default function FAQBuffet( { admin } : ContentRackWrapperProps ): JSX.Element {









    // genrates question components for the FAQ buffet
    function renderStories( story : Story, index : number, controls : ContentControls ) : JSX.Element {

        const  { 
                    id, 
                    url,
                    rank,
                    date,
                    outlet,
                    headline,
                    image_url,
                    image_alt,

                } = story;


        const   {
                    getData,
                    editing, 
                    dataSize,
                    setEditing, 

                } = controls;

                
        const formattedDate = new Date(date).toLocaleDateString();


        return (

            <div key={id} className={`
                                        w-full h-fit 
                                    `}
            >
                <a     
                    target="_blank"
                       rel="noreferrer"
                      href={url}
                >
                    <div className='flex flex-col items-center' >

                        <img  
                            src={image_url} 
                            alt={ image_alt } 
                            className='w-full h-auto' 
                        />

                        <div className={`
                                            w-10/12 h-fit
                                            flex flex-col items-center
                                            text-center
                                            mt-2
                                       `}
                        >

                            <p className={`
                                            font-heading text-2xl 
                                         `}
                            >{headline}</p>

                            <p className='font-body text-lg'>{outlet}</p>

                            <p className='font-body text-sm'>{formattedDate}</p>

                        </div>

                    </div>
                </a>


                { admin &&  <EditorButtons 
                                id={id} 
                                rank={rank as number} 
                                index={index}
                                table={'stories'}
                                pkName={'id'}
                                editing={editing}
                                loadData={getData}
                                dataSize={dataSize}
                                setEditing={setEditing}
                            />
                }

                { admin && editing === id && <StoryForm getData={getData} update={story} setEditing={setEditing}/> }

                
            </div>
        )
    }







   return   <ContentRack<Story> 
                        table={'stories'      } 
                renderContent={ renderStories }
                    wrapStyle={`
                                    grid gap-16
                                    grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                                    p-20
                              `} 
            />

}
