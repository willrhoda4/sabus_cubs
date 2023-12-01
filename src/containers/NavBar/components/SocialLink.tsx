








import { SocialLinkProps } from '../../../types/menu'

// import SVGIcon from "../../../common/images/SVGIcon";




export default function SocialLink({ icon : Icon, url} : SocialLinkProps): JSX.Element {


    return (

        <a href={url} target="_blank" rel="noopener noreferrer">

            <Icon
                stroke={'black'}
                height={'45px'}
                width={'45px'}
                className='mx-1 px-2 hover:animate-wiggle'
            />      
             
        </a>
    )
}