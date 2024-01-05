






/**
 * helper function to display what a donation amount can buy.
 * strictly works for the donation component in the same directory.
 */



export default function thisBuysUs( amount : number, monthly : boolean ) {

    if ( amount > 500 ) return 'Large donations like this make a huge difference in our ability to help the community. Thank you!';


    const purchase =  amount >= 500 ? '300 hygiene kits'
                    : amount >= 200 ? 'a new foldable wagon to haul supplies on our walks' 
                    : amount >= 100 ? '100 ear warmers or 100 pairs of socks'
                    : amount >= 50  ? 'a week\'s worth of sandwiches'
                    : amount >= 20  ? '48 granola bars or 40 hand warmers'
                    : amount >= 10  ? 'a new heavy duty trash picker or headlamp'
                    : amount >= 5   ? '24 bottles of water for thirsty people in the community'
                    :                 ''

    return `With a ${ monthly ? 'monthly ' : ''}donation of $${amount}, we can afford ${purchase}.`;
}
