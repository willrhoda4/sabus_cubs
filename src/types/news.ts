











// Story interface gets passed to Story component
// also gets passed into the update property for FAQFormProps
export interface Story {
    [key: string]: string | number | Date;

    id:         number;
    headline:   string;
    outlet:     string;
    url:        string;
    image_url:  string;
    image_alt:  string;
    date:       Date;
  } 
  

export interface StoryRackProps {
    
    admin?: boolean;
    key?:   number;

}