






import { FooterLinksProps } from '../../../types/menu'

import { Link             } from 'react-router-dom';

import   FooterLink         from './FooterLink';



// generates a column of links for the FoooterLinksDiv component.
export default function FooterLinks( { page, links } : FooterLinksProps ) : JSX.Element {


    




    return (

        <div className={`
                            flex flex-col 
                            w-fit h-fit
                            mr-8
                       `}
        >
            <Link 
                       to={`/${page}`}
                className={`
                            my-2 
                            font-bold font-xl 
                            hover:text-brand-red 
                            cursor-pointer
                          `}
            >
                {page[0].toUpperCase()+page.slice(1)}
            </Link>

            { links && links.map( (link, index) => <div key={index} >{ <FooterLink page={page} link={link} /> }</div>) }
        </div>
    )
}