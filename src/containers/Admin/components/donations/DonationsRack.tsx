






/**
 *  display component that renders the appropriate data based on the displayed tab
 *  for the donations page in the admin dashboard.
 * 
 *  we went with a bespoke component in lieu of using the ContentRack
 *  because the queries for this data require multiple tables, and
 *  don't use ranks, thereby making it impossible to leverage
 *   our currentgetData endpoint.
 */










import { useState,
         useEffect   }         from 'react';


import   Axios                  from 'axios';

import { DonationRackProps,
         Donee,
         Donation,
         Subscription,
         DonationData         } from '../../../../types/admin';

import   formatDate             from '../../../../utils/formatDate';
import   formatCost             from '../../../../utils/formatCost';

import   authToken             from '../../../../utils/authToken';



export default function DonationsRack( { displayed } : DonationRackProps ) : JSX.Element {


   // stores the donation data to be displayed.
   const [ data, setData ] = useState([]);


   // requests donation data from server amd sets it to state
   function getDonationData() {

      // pass the displayed tab name to the server
      // to make sure the correct data is returned
      const reqBody = [ displayed ];

      Axios.post(`${import.meta.env.VITE_API_URL}getDonationData`, reqBody, authToken() )
           .then(   res => setData(res.data)                                             )
           .catch(  err => console.log(err )                                             );
   }

   // get content on initial load
   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() => { getDonationData() }, [displayed] )


   // donee list item
   const donee =        (data : Donee) =>          <div>
                                                      <p>{data.name}</p>
                                                      <p>{data.email}</p>
                                                      <p>{'first donation: ' + formatDate(data.created_on)}</p>
                                                   </div>

   // donation list item
   const donation =     (data : Donation) =>       <div>
                                                      <p>{data.name}</p>
                                                      <p>{formatCost(data.amount)}</p>
                                                      <p>{'donated on: ' + formatDate(data.date)}</p>
                                                      <p>{data.subscription_id}</p>
                                                   </div>

   // subscription list item
   const subscription = (data : Subscription) =>   <div>
                                                      <p>{data.name}</p>
                                                      <p>{formatCost(data.amount)}</p>
                                                      <p>{'subscribed on: ' + formatDate(data.created_on)}</p>
                                                      {   data.cancelled_on && 
                                                            <p className={ 'text-brand-red' }>{'cancelled on: ' + formatDate(data.cancelled_on)}</p>
                                                      }
                                                   </div>   


   // renders the appropriate data based on the displayed tab
   const listItem =      (data : DonationData) =>  displayed === 'donees'        ? donee( data        as Donee )
                                                 : displayed === 'donations'     ? donation( data     as Donation )
                                                 : displayed === 'subscriptions' ? subscription( data as Subscription )
                                                 : null;


   return (

      <div className={`
                        w-full max-w-screen-sm
                        h-fit max-h-[1000px]
                        border-2 border-black
                        flex flex-col
                     `}
      >
         { data && data.map( ( row : DonationData, index : number ) =>  <div key={index}
                                                                     className={`
                                                                                 w-full h-fit
                                                                                 overflow-scroll
                                                                                 p-2
                                                                                 border-b-2 border-black
                                                                                 flex flex-col
                                                                               `}
                                                               >{listItem(row)}</div> 
                           ) }
      </div>

   )
}
