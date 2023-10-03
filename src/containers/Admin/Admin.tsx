







import FAQ from "./components/FAQ";



interface AdminProps {
    editing: string;
}



export default function Admin ({editing} : AdminProps) : JSX.Element {



    const displaying = editing === 'faq' ? <FAQ /> : <p>other</p>;






    return (<div className='w-3/4'>

            <p>{displaying}</p>

    </div>);
}