








import   Axios       from 'axios';
import { useState, 
         useEffect } from 'react';

import   FAQBuffet from '../../common/FAQBuffet';



export default function Info (): JSX.Element {


    interface FAQ {
        id:       number;
        question: string;
        answer:   string;
        rank:     number;
    }



    const [ faqs,       setFaqs       ] = useState<FAQ[]>([]);
    const [ displayed,  setDisplayed  ] = useState<number | boolean>(false);






    // requests FAQ data from server amd sets it to state
    function getFAQs() {

        const reqBody = [ 'faq', undefined, { orderBy: 'rank' } ];

        Axios.post(`${import.meta.env.VITE_API_URL}getData`, reqBody )
             .then(   res => setFaqs(res.data)                       )
             .catch(  err => console.log(err)                        );
    }

    // get FAQS on initial load
    useEffect(() => { getFAQs() }, [] )


    return (<>
    
        <FAQBuffet faqs={faqs} displayed={displayed} setDisplayed={setDisplayed} />
    
    
    </>)
}