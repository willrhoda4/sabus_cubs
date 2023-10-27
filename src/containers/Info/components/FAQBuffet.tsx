










import   dropdownIcon    from '../../../assets/icon_dropdown.svg';

import   EditorButtons   from '../../../common/buttons/EditorButtons';

import   FAQForm         from '../../Admin/components/forms/FAQForm';

import { useState, 
         useEffect }     from 'react';

import   Axios           from 'axios';

import { FAQ, FAQBuffetProps } from '../../../types/info';






export default function FAQBuffet({admin}:FAQBuffetProps ): JSX.Element {





    const [ faqs,       setFaqs       ] = useState<FAQ[]>([]);
    const [ displayed,  setDisplayed  ] = useState<number | boolean>(false);
    const [ editing,    setEditing    ] = useState<number | boolean>(false);






    // requests FAQ data from server amd sets it to state
    function getFAQs() {

        const reqBody = [ 'faq', undefined, { orderBy: 'rank' } ];

        Axios.post(`${import.meta.env.VITE_API_URL}getData`, reqBody )
             .then(   res => setFaqs(res.data)                       )
             .catch(  err => console.log(err )                       );
    }

    // get FAQS on initial load
    useEffect(() => { getFAQs() }, [] )






    // genrates question components for the FAQ buffet
    function makeFAQ(faq : FAQ, index : number) {

        const  { question, answer, id, rank } = faq;

        return (

            <div key={id} className={`
                                        w-full h-fit 
                                        border border-blue-300
                                    `}
            >
                <div className='flex justify-between' onClick={ () => displayed === id ? setDisplayed(false) : setDisplayed(id) }>

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
