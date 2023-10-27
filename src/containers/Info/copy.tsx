







import iconLion from '../../assets/lion.svg';

import { ActionValueProps } from '../../types/info';





// quick function to format text for display.
// replaces all whitespace with single spaces, and all || with double line breaks.
// if || has a space (or two) on either side, it/they will be stripped out, too.
function formatText (text : string) {

    const  singleSpaced =         text.replace( /\s+/g,        ' '    );
    const  paragraphed  = singleSpaced.replace( /\s?\|\|\s?/g, '\n\n' );
   
    return paragraphed;
}
  


    const missionText = `Empowering Youth, Strengthening Community. 
                         Non-profit organization dedicated to nurturing and empowering youth within our community`;

    const mission = formatText(missionText);





    const storyText =   `
                            Born in South Africa in 1921, Bill's journey was a relentless pursuit of justice and equality. 
                            He wasn't just an educator; he was also a passionate activist who fought vigorously against the injustice of apartheid.
                            ||
                            When Bill moved to Winnipeg, Canada, his unwavering commitment to positive change continued. 
                            He brought his passion for making a difference to a new community, leaving an indelible mark. Throughout his life, Bill enriched the lives of countless young people, 
                            not just as a teacher but as a mentor who inspired youth to stand up for what's right.
                            ||
                            It's crucial to note that apartheid in South Africa had roots in the residential school system of Canada. 
                            This underscores the importance of the fight for equality transcending borders.
                            ||
                            Bill earned the nickname 'Sabu' due to his resemblance to the 1940s actor Sabu. 
                            It became a symbol of his unique identity and his unwavering commitment to making the world a better place.
                            ||
                            Sabu's legacy lives on through Sabu's Cubs, where we continue the work of empowerment and positive change, 
                            guided by the principles and passion of William "Sabu" Rhoda.
                        `;


    const story = formatText(storyText);























const values  : ActionValueProps[] = [

    {
        title: 'Value 1',
        copy:  'This is the copy for value 1. It is a little longer than the title, but not too long.',
        icon:  { svgContent: iconLion }
    },

    {
        title: 'Value 2',
        copy:  'This is the copy for value 2. It is a little longer than the title, but not too long.',
        icon:  { svgContent: iconLion }
    },

    {
        title: 'Value 3',
        copy:  'This is the copy for value 3. It is a little longer than the title, but not too long.',
        icon:  { svgContent: iconLion }
    }
]

const actions : ActionValueProps[] = [

    {
        title: 'Action 1',
        copy:  'This is the copy for action 1. It is a little longer than the title, but not too long.',
        icon:  { svgContent: iconLion }
    },

    {
        title: 'Action 2',
        copy:  'This is the copy for action 2. It is a little longer than the title, but not too long.',
        icon:  { svgContent: iconLion }
    },

    {
        title: 'Action 3',
        copy:  'This is the copy for action 3. It is a little longer than the title, but not too long.',
        icon:  { svgContent: iconLion }
    },

    
]



export default { 
                    story, 
                    values, 
                    actions, 
                    mission, 
                }

