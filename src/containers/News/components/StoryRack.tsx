










import   dropdownIcon    from '../../../assets/icon_dropdown.svg';

import   EditorButtons   from '../../../common/buttons/EditorButtons';

import   FAQForm         from '../../Admin/components/forms/FAQForm';

import { useState, 
         useEffect }     from 'react';

import   Axios           from 'axios';

import { Story, StoryRackProps } from '../../../types/news';






export default function FAQBuffet({admin}:StoryRackProps ): JSX.Element {





    const [ stories,    setStories    ] = useState<FAQ[]>([]);
    const [ editing,    setEditing    ] = useState<number | boolean>(false);






    // requests FAQ data from server amd sets it to state
    function getStories() {

        const reqBody = [ 'stories', undefined, { orderBy: 'rank' } ];

        Axios.post(`${import.meta.env.VITE_API_URL}getData`, reqBody )
             .then(   res => setStories(res.data)                    )
             .catch(  err => console.log(err )                       );
    }

    // get FAQS on initial load
    useEffect(() => { getStories() }, [] )






    // genrates question components for the FAQ buffet
    function story( story : Story, index : number) {

        const  { question, answer, id, rank } = story;

        return (

            <div key={id} className={`
                                        w-full h-fit 
                                        border border-blue-300
                                    `}
            >
                <div className='flex justify-between' >

                    <div className='flex items-center'>
                        <h5 style={{marginRight: '2.5vmin', fontSize: '5vmin'}}>Q:</h5>
                        <p>{question}</p>
                    </div>

                    <img className={ `h-10 m-5 ${ displayed === id && 'transform rotate-180' }` } 
                               alt={ 'dropdown icon' }
                           onClick={  displayed !== id ? () => setDisplayed(id)
                                                       : () => setDisplayed(false)
                                   }
                               src={dropdownIcon}
                    />
                </div>

                { displayed === id && <p style={{whiteSpace: 'pre-line', paddingBottom: '10vmin'}}>{answer}</p> }


                { admin && <EditorButtons 
                                id={id} 
                                rank={rank} 
                                index={index}
                                table={'faq'}
                                pkName={'id'}
                                editing={editing}
                                loadData={getFAQs}
                                dataSize={faqs.length}
                                setEditing={setEditing}
                            />
                }

                { admin && editing === id && <FAQForm getData={getFAQs} update={faq} setEditing={setEditing}/> }

                
            </div>
        )
    }







    return (<>



    <div className='my-12'>
        { faqs && faqs.map( (faq, index) => makeFAQ(faq, index) ) }
    </div>

    </>)
}
