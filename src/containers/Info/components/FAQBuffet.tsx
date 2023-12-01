










import   ContentRack               from '../../../common/ContentRack';

// import   dropdownIcon              from '../../../assets/icon_dropdown.svg';

import   EditorButtons             from '../../../common/buttons/EditorButtons';

import   FAQForm                   from '../../Admin/components/forms/FAQForm';

import { FAQ }                     from '../../../types/info';

import   FAQAccordian              from './FAQAccordian';

import { ContentControls,
         ContentRackWrapperProps } from '../../../types/content';




export default function FAQBuffet({ admin } : ContentRackWrapperProps ): JSX.Element {






    // genrates question components for the FAQ buffet
    function renderFAQ( 
                        faq : FAQ, 
                        index : number,
                        controls : ContentControls 
                    ) {

        const   { 
                    id, 
                    rank, 
                    answer, 
                    question, 

                } = faq;

        const   { 
                    getData,
                    editing, 
                    dataSize,
                    displayed, 
                    setEditing, 
                    setDisplayed, 
            
                } = controls;

        return (

            <div key={id} className={`
                                        w-full h-fit 
                                        border border-blue-300
                                    `}
            >


                <FAQAccordian 
                    question={question} 
                    answer={answer} 
                    id={id} 
                    displayed={displayed} 
                    setDisplayed={setDisplayed}
                />
                

                { admin && <EditorButtons 
                                id={id} 
                                rank={rank} 
                                index={index}
                                table={'faq'}
                                pkName={'id'}
                                editing={editing}
                                loadData={getData}
                                dataSize={dataSize}
                                setEditing={setEditing}
                            />
                }

                { admin && editing === id && <FAQForm getData={getData} update={faq} setEditing={setEditing}/> }

                
            </div>
        )
    }




    return <ContentRack<FAQ> table='faq' renderContent={renderFAQ} />

}


