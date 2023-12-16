




/**
 * 
 * simple utility function to scroll to an element on the page.
 * it accepts a single argument, the css id of the element to scroll to.
 */






export default function scrollTo(id : string) {

    const element = document.getElementById(id);

    if (element) {

        // Get the top position of the element
        const rect = element.getBoundingClientRect();
        const top = rect.top + window.scrollY;

        // Scroll to the element
        window.scrollTo({ top: top, behavior: 'smooth' });
    }
}
