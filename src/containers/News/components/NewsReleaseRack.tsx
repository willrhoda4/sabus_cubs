





/**
 *  content rack for news releases.
 *  gets displayed on the news page,
 *  and in the admin panel.
 */








import   ContentRack                    from '../../../common/ContentRack';  

import { ContentRackWrapperProps,
         ContentControls            }   from '../../../types/content';

import   NewsReleaseForm                from '../../Admin/components/forms/JournalistForm';

import { NewsRelease                 }  from '../../../types/admin';

import   EditorButtons                  from '../../../common/buttons/EditorButtons';






export default function NewsReleaseRack({ admin } : ContentRackWrapperProps ): JSX.Element {


    const table = 'news_releases';


    function renderRelease ( release : NewsRelease, index : number, controls : ContentControls ) : JSX.Element {


        const   {
                    id,       
                    date, 
                    html,  
                    headline, 
                    pdf_url,  
                    rank,     
                    
                } = release;

                
        const   {
                    getData,
                    editing, 
                    dataSize,
                    setEditing, 

                } = controls;

        const formattedDate = new Date(date).toLocaleDateString();

        const releaseData   = { headline, pdf_url, html, publish: true };



        return (
            <div      
                key={id}
                className={`
                            flex flex-col items-center 
                            my-4
                            w-full 
                          `}
            >
                {/* for reasons that are unclear, this anchor tag needed
                    to be styled to make this layout work. fuck with it at your own risk. */}
                <a 
                         href={pdf_url}
                       target="_blank"
                          rel="noreferrer"
                    className={`
                                block
                                w-full 
                                flex justify-center 
                                text-decoration-none
                              `} // Ensure the link is block level and takes the full width
                >
                    <div className={`
                                        flex items-center justify-between
                                        w-full max-w-4xl h-fit 
                                        py-5 px-8 
                                        font-bold text-brand-red 
                                        bg-brand-blue rounded-md 
                                        border-2 border-black 
                                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                   `}
                    >
                        <h2 className={`
                                        text-xl 
                                        w-4/5 
                                        whitespace-nowrap 
                                        overflow-hidden text-ellipsis 
                                      `}>
                            {headline}
                        </h2>

                        <p>{formattedDate}</p> 

                    </div>
                </a>
        
                {/* we'll also need a form and buttons for the admin dashboard */}
                {admin && (

                    <>
                        {editing === id && <NewsReleaseForm getData={getData} update={release} setEditing={setEditing}/> }

                        <EditorButtons 
                            id={id} 
                            rank={rank} 
                            index={index}
                            table={table}
                            pkName={'id'}
                            editing={editing}
                            loadData={getData}
                            dataSize={dataSize}
                            wrapStyle="mt-4"
                            setEditing={setEditing}
                            releaseData={releaseData}
                        />
                    </>
                )}
            </div>
        );
        
    }

    

    return  <ContentRack<NewsRelease> 
                        table={table} 
                renderContent={renderRelease} 
                    wrapStyle={`
                                w-full 
                                mt-24
                                flex flex-col
                                items-center
                              `}
            />

    
}