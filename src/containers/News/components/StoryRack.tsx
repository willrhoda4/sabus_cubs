











import   ContentRack                    from '../../../common/ContentRack';

import   EditorButtons                  from '../../../common/buttons/EditorButtons';

import   StoryForm                      from '../../Admin/components/forms/StoryForm';

import { Story  }                       from '../../../types/news';

import { ContentRackWrapperProps,
         ContentControls            }   from '../../../types/content';




export default function FAQBuffet({admin}:ContentRackWrapperProps ): JSX.Element {



    const table = 'stories';






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

                console.log(`${date}\n${typeof date}`);

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
                                        border border-blue-300
                                    `}
            >
                <a     
                    target="_blank"
                       rel="noreferrer"
                      href={url}
                >
                    <div className='flex flex-col border border-orange-300' >

                        <p>{formattedDate}</p>
                        <p>{outlet}</p>
                        <img  src={image_url} alt={ image_alt } className='w-[250px]' />
                        <p>{headline}</p>
                        
                    </div>
                </a>


                { admin &&  <EditorButtons 
                                id={id} 
                                rank={rank as number} 
                                index={index}
                                table={'faq'}
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







   return <ContentRack<Story> table={table} renderContent={renderStories} />

}
