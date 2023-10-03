









import   dropdownIcon from '../assets/icon_dropdown.svg';




interface FAQ {
    id:       number;
    question: string;
    answer:   string;
    rank:     number;
}

interface FAQBuffetProps {
    faqs: FAQ[];
    displayed: number | boolean;
    setDisplayed: React.Dispatch<React.SetStateAction<number | boolean>>;
}



export default function FAQBuffet({faqs, displayed, setDisplayed} : FAQBuffetProps): JSX.Element {






    // genrates question components for the FAQ buffet
    function makeFAQ(faq : FAQ) {

    const { question, answer, id } = faq;

    return (

    <div key={id} className={`
                                w-full h-fit 
                                border border-blue-300
                            `}
    >
        <div className='flex justify-between' onClick={() => displayed === id ? setDisplayed(false) : setDisplayed(id)}>

            <div className='flex items-center'>
                <h5 style={{marginRight: '2.5vmin', fontSize: '5vmin'}}>Q:</h5>
                <p>{question}</p>
            </div>

            <img className={displayed === id ? 'transform rotate-180' : ''} 
                        alt='dropdown icon'
                        style={{height: '5vh', margin: '2.5vh', color: 'red'}}
                    onClick={ displayed !== id ? () => setDisplayed(id)
                                                : () => setDisplayed(false)
                            }
                        src={dropdownIcon}
            />
        </div>

        { displayed === id && <p style={{whiteSpace: 'pre-line', paddingBottom: '10vmin'}}>{answer}</p> }
        
    </div>
    )
    }







    return (<>



    <div className='my-12'>
        { faqs && faqs.map( faq => makeFAQ(faq) ) }
    </div>

    </>)
}
