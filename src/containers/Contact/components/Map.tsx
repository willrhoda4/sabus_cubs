







export default function Map (): JSX.Element {



    function googleMap () {

        const mapHtml = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2569.5264802138595!2d-97.13338532293551!3d49.90769267149365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ea716c75c831ad%3A0x39f5bee041f8da01!2sGonzaga%20Middle%20School!5e0!3m2!1sen!2sca!4v1695846137768!5m2!1sen!2sca" 
                                 width="600" 
                                 height="450" 
                                 style="border:0;" 
                                 allowfullscreen="" 
                                 loading="lazy" 
                                 referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>`
        
        
        return     <div dangerouslySetInnerHTML={{ __html: mapHtml }} />
        
    }




    return (<>

        { googleMap() }
    
    </>);
}