







import FullWidthImage from "../../common/FullWidthImage";

import stock1 from '../../assets/aistock1.jpeg';









// interface HomeProps {

//     imageUrl: string;
//     altText?: string;
//   }
  
//   export default function Home({ imageUrl, altText = '' }: HomeProps): JSX.Element {
  export default function Home(): JSX.Element {
  
  
    return (<>

        <FullWidthImage image={stock1} alt='stock1' />
        <p>home</p>
    
    </>);
  }
  
  