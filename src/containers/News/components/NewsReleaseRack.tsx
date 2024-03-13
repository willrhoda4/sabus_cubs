





/**
 *  content rack for news releases.
 *  gets displayed on the news page,
 *  and in the admin panel.
 */








import   ContentRack                    from '../../../common/ContentRack';  

import { ContentRackWrapperProps,
         ContentControls            }   from '../../../types/content';

// import   NewsReleaseForm                from '../../Admin/components/forms/JournalistForm';

import { NewsRelease                 }  from '../../../types/admin';

import   EditorButtons                  from '../../../common/buttons/EditorButtons';

import { useLocation }                  from 'react-router-dom';






export default function NewsReleaseRack({ admin } : ContentRackWrapperProps ): JSX.Element {


    // get the current path
    const   location = useLocation().pathname;

    const table = 'news_releases';

    // builder function for the news release components
    function renderRelease ( release : NewsRelease, index : number, controls : ContentControls ) : JSX.Element | null {


        // destructure the release object
        const   {
                    id,       
                    date, 
                    html,  
                    headline, 
                    pdf_url,  
                    rank,  
                    published,   
                    
                } = release;

                
        // destructure the controls object        
        const   {
                    getData,
                    editing, 
                    dataSize,
                    setEditing, 

                } = controls;

        // format the date        
        const formattedDate = new Date(date).toLocaleDateString();

        // build the releaseData object for EditorButtons.
        // id tells the endpoint which row to update in the database (set published to true).
        // publish tells it to send to the journalist list, and not the admin email.
        // published determines whether the publish button works or not.
        // the rest are used to get the email ready.
        const releaseData   = { id, headline, pdf_url, html, publish: true, published };


        // for the forward-facing site, if the release is not published, don't render it
        if ( location !== '/simba' && !published) { return null; }
                                                    

        return (
            <div      
                      key={id}
                className={`
                            flex flex-col 
                            w-full h-fit
                            my-8
                          `}
            >
                
                <a 
                         href={pdf_url}
                       target="_blank"
                          rel="noreferrer"
                >
                    <div className={`
                                        flex items-center justify-between
                                        w-full h-fit 
                                        py-5 px-8 
                                        font-bold font-body text-brand-red 
                                        bg-brand-blue rounded-md 
                                        border-2 border-black 
                                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                        block
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
                { admin && (

                    <div className={`
                                        flex flex-col 
                                        w-fit h-fit
                                        self-start
                                        mt-2
                                   `}
                    >

                        { <p className={ `mb-[-15px] ${published ? 'text-green-500' : ' text-red-500'}` }>{ published ? 'published' : 'unpublished' }</p> }

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
                    </div>
                )}
            </div>
        );
        
    }

    

    return  <ContentRack<NewsRelease> 
                        table={table} 
                renderContent={renderRelease} 
                    wrapStyle={`
                                mt-24
                                w-[800px] max-w-[90%]
                              `}
            />

    
}
