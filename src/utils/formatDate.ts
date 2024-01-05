






/**
 * simple function to format a date string from the database
 * before displaying it to the user.
 */


export default function formatDate ( dateString: string ) {

    // this conditional shouldn't see too much action,
    // but it's here just in case.
    if (!dateString) return 'N/A';

    const date = new Date(dateString);

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
  

  // Use formatDate in your code like this:
  // <p>{formatDate(data.created_on)}</p>
  