






/**
 * 
 * this hook expects an SVG file to be passed in as a prop,
 * as well as an alt tag for accessibility.
 * 
 * stroke, size, and wrapStyles are optional.
 * 
 * stroke sets colour. It defaults to black.
 * size sets width and height. It defaults to 24.
 * wrapStyles sets any additional Tailwiind styles for the wrapping div.
 * 
 * Call it like this:
 * 
 * 
 * 
 * import trashIcon from '../../assets/icon_trash.svg';
 * import useSVGIcon from "../../hooks/useSVGIcon";
 * 
 * 
 * export default function deleteButton () {
 * 
 *   const DeleteIcon = useSVGIcon({
 *      icon: trashIcon,
 *      alt: 'Delete icon',
 *      stroke: '#2774AB',
 *      size: '24',
 *      wrapStyles: 'border border-orange-300',
 *    });
 * 
 *   const delete = () => console.log('delete it.');
 * 
 *   return <button onClick={delete}><DeleteIcon /></button>;
 
 */





import { 
         useState, 
         useEffect, 
         ReactElement } from 'react';


import { SVGIconProps } from '../../types/button';




export default function SVGIcon ({
                                   icon,
                                   alt,
                                   stroke     = 'black',
                                   size       = '24',
                                   wrapStyles = '',

                                  }: SVGIconProps): ReactElement | null  {



    const [ svgContent, setSVGContent ] = useState<string | null>(null);


    useEffect(() => {

    
        fetch(icon).then( response => response.text() )
                .then( data     => {

                    const parser     = new DOMParser();
                    const svgDoc     = parser.parseFromString(data, 'image/svg+xml');
                    const svgElement = svgDoc.querySelector('svg');

                    if  ( svgElement )  {

                            svgElement.setAttribute( 'stroke', stroke );
                            svgElement.setAttribute( 'width',  size   );
                            svgElement.setAttribute( 'height', size   );

                            setSVGContent(svgElement.outerHTML);
                    }
                    } )
                .catch( error => console.error( 'Error fetching SVG:', error ) );


    }, [ icon, stroke, size ]);

    return svgContent ?  <div className={wrapStyles} dangerouslySetInnerHTML={{ __html: svgContent }} aria-label={alt} />
                      :   null;
}

