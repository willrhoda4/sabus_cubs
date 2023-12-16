







import logo          from '../../assets/logo_large.png';
import Intro         from './components/Intro';
import Navigator     from './components/Navigator'; 






export default function Home(): JSX.Element {


  return (

    <div className={`
                        w-full h-fit
                        flex flex-col items-center
                   `}
    >

      <img src={logo} alt={`Sabu's Cubs logo`} className='h-auto w-2/12 my-12' />


      <Intro />

      <Navigator />

    </div>
  );
}

  