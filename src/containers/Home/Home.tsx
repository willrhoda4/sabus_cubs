







import   logo          from '../../assets/logo_large.png';
import   Intro         from './components/Intro';
import   Navigator     from './components/Navigator'; 

import { Helmet }      from 'react-helmet'






export default function Home(): JSX.Element { 


  return (

    <div className={`
                        w-full h-fit
                        flex flex-col items-center
                   `}
    >
      <Helmet>
        <title>Sabu's Cubs – Home</title>
        <meta name='description' content={`Sabu's Cubs is a Winnipeg-based non-profit focused on giving the youth of today the skills they need to become the leaders of tomorrow. We believe in equality, inclusion, and the aggregate potential of small direct actions to transform the communities we love. Come walk with us!`} />
      </Helmet>

      <img 
              src={logo} 
              alt={`Sabu's Cubs logo`} 
        className={`
                    h-auto 
                    w-2/12 min-w-[150px] max-w-[200px]
                    mt-12 mb-4
                  `}
        />


      <Intro />

      <Navigator />

    </div>
  );
}

  