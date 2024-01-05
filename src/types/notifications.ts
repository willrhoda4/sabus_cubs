






import { ReactNode } from "react";

import { BrandColours } from "../utils/brandColours";


// simple interface for NotificationProvider component
export interface NotificationProviderProps { children : ReactNode; }



/**
 * type definition for the context value.
 * 
 * defines a function 'showNotification' that displays a notification message.
 * the function accepts a message string and an optional duration in milliseconds.
 */
export interface NotificationContextValue {

  showNotification: (  message   : string, 
                       duration? : number  ) => void;
}



// interface for Notifcation component,
// which works for the NotificationProvider
export interface NotificationProps {

    id          : number
    message     : string;
    duration    : number;
    colours     : BrandColours;
} 



export interface CardProps {
  wrapClass?     : string;
  headingClass?  : string;
  heading        : string;
  contentClass?  : string;
  children       : React.ReactNode;
}
