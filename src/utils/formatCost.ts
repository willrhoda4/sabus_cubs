






/**
 * simple utility function to format an integer amount into a price string.
 */




export default function formatCost ( amount : number ) {
    
    return `$${(Number(amount) / 100).toFixed(2)}`;
} 

// Use formatAmount in your code like this:
// <p>{formatAmount(data.amount)}</p>

