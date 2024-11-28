







/**
 * this script handles all the text resources for the website.
 * 
 * we export a single function, copy, which takes a string key and returns a JSX.Element.
 * 
 * in most cases it returns a div containing a single paragraph, 
 * but returns a div containing multiple paragraphs if the string 
 * signals a line break using ||.
 * 
 * copy accepts a second argument, styles, which will pass Tailwind classes
 * to the wrapper div being returned.
 * 
 * if styles === 'string', copy will return the text without any wrapper div.
 * this is useful if you need to retrieve a url or don't your text immediately
 * wrapped in a div.
 */






const textResources : { [ key: string ] : string }  = {


    // home resources

    intro       : `is a Winnipeg-based non-profit focused on giving today's youth the skills they need to become tomorrow's leaders. We believe in equality, inclusion, and the aggregate potential of small direct actions to transform the communities we love. Come walk with us!`,

    
    //info resources
    mission1     : `Empowering youth.`,
    mission2     : `Strengthening community.`,

    story:   `
                Sabu’s Cubs is a grassroots non-profit organization committed to providing youth with the support they need to make transformative differences in their community.  Powered by the generosity of our supporters and the dedication of our volunteers, we provide mentorship and safe spaces for our members and deliver impactful positive change through direct action in the Point Douglas neighbourhood.
                ||
                Our name is inspired by William “Sabu” Rhoda, a political activist who left South Africa with an exit visa in 1967, escaping apartheid and immigrating to Winnipeg where he spent over twenty years working with young people as a high school math and science teacher. He believed in hard work, equality and fighting for what’s right, and we try to honour the spirit of those beliefs with the work we do.
            `,




    // contact resources       
    contact  : `We operate out Gonzaga Middle School, at 174 Maple St N in the Point Douglas neighbourhood. We meet most Wednesdays from 5:45 p.m. to 8:00 p.m., and we’d love to see you at our next walk! We recommend reaching out by email or social media before you come out, just to make sure that there isn’t a cancellation this week.`,
        
    googleMapURL: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2569.5264802138595!2d-97.13338532293551!3d49.90769267149365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ea716c75c831ad%3A0x39f5bee041f8da01!2sGonzaga%20Middle%20School!5e0!3m2!1sen!2sca!4v1695846137768!5m2!1sen!2sca',






    // support resources
    donate          : `An online donation is often the easiest way to support the work we do. Whether it's a one-time amount or a monthly contribution, we accept all major credit cards and we're always grateful for your generosity.`,

    supplies        : `There's a constant need for supplies to help keep community members safe and comfortable. If you have any of the following items to donate, please contact us to arrange a drop-off time.`,

    fundraiser      : `We're always looking for new ways to raise funds for the neighbourhood. Whether it's an event or a supply drive, if you have an idea for a fundraiser, please contact us. We'd love to discuss it.`,

    volunteer       : `If you can can make the time, volunteering with us can be a really rewarding way to make an impact in the community. All volunteers are required to fill out a registration form and sign a waiver before participating in our walks. If you have access to a printer, links to the documents are available below. If not, we’ll have a hard copy ready for you at our next meeting.`,

    update          : `If you're trying to update your information or adjust your payments, you're in the right place.`,

    login           : `To verify your identity, we'll send a login link to the email you registered with.`,

    receipts        : `Receipts for charitable donations are available upon request, just get in touch with us. We'll be happy to hear from you!`,




    // gallery resources
    instaCTA        : `Don't forget to follow us on Instagram for regular updates on the work we're doing.`,




    // news resources
    newsStories     : `We feel fortunate to have been featured in some great news stories. Here's a few.`,

    newsReleases    : `To promote a culture of transparency, we publish all our press releases for the community to read.`,



    // update resources
    cancel           : `We hate to see you go, but that doesn't mean we don't appreciate everything you've already done. Thank you for all the support you've offered us!`,


    // admin resources
    databaseError      :  `There was a problem retrieving your email list from the database. Please try again later. If the problem persists, call tech support.`,
}




export default function copy ( key : string, styles? : string, grafGap : string = 'mb-6' ) {


    if ( styles === 'string' ) return textResources[key];


    function formatText ( text : string ) {

        const singleSpaced = text.replace(/\s+/g, ' ');
        const paragraphs   = singleSpaced.split(/\s?\|\|\s?/);
    
        return paragraphs;
    }


    const      paragraphs  = formatText(textResources[key]);

    
    return (

        <div className={`text-body ${ styles }` }>

            { paragraphs.map((paragraph, index) => (
                <p 
                          key={ index }
                    className={ index !== paragraphs.length-1 ? grafGap : '' }
                >{paragraph}</p>
            ) ) }

        </div>
    )
}





