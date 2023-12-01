














import   ContentRack                    from '../../../common/ContentRack';  

import { ContentRackWrapperProps,
         ContentControls            }   from '../../../types/content';

import   NewsReleaseForm                from './forms/JournalistForm';

import { NewsRelease                 }   from '../../../types/admin';

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



        return  <div      key={id}
                    className={`flex flex-col`}
                >


                    <a key={index}
                                target="_blank"
                                rel="noreferrer"
                                href={pdf_url}
                    >

                        <div className={`flex flex-row justify-between items-center`}>
                            <h2 className={`text-2xl`}>{headline}</h2>
                            <p>{formattedDate}</p> 
                           
                        </div>
                    </a>
                    
                    {
                        admin && editing === id && <NewsReleaseForm getData={getData} update={release} setEditing={setEditing}/> 
                    }
              
                   
                    {   admin && <EditorButtons 
                                    id={id} 
                                    rank={rank} 
                                    index={index}
                                    table={table}
                                    pkName={'id'}
                                    editing={editing}
                                    loadData={getData}
                                    dataSize={dataSize}
                                    setEditing={setEditing}
                                    releaseData={releaseData}
                                 />
                    }
                </div>
    }

    

    return <ContentRack<NewsRelease> table={table} renderContent={renderRelease} />

    
}