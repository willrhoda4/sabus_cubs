









/** @type {import('tailwindcss').Config} */



// define your font-family stacks as variables for dryness.
const fontFamilySans = 'Inter, sans-serif';
const fontFamilySerif = 'Merriweather, serif';
const fontFamilyBody = 'DM Sans, sans-serif';
const fontFamilyHeading = 'Fjalla One, sans-serif';
const fontFamilyTitle = 'DM Sans, sans-serif';


export default {

  content:  [
              "./index.html",
              "./src/**/*.{js,ts,jsx,tsx}",
            ],

  theme: {

    extend: {

      colors: {
        'brand-red':    '#AB2927',
        'brand-blue':   '#2774AB',
        'brand-yellow': '#ABAB27',
        'brand-brown':  '#563130',
        'brand-grey':   '#252D33',
      },

      keyframes: {

        openMenu: {
          '0%':   { transform: 'scaleX(.15) scaleY(0)'   },
          '60%':  { transform: 'scaleX(.15) scaleY(1)'   },
          '100%': { transform: 'scaleX(1)   scaleY(1)'   }
        },
        closeMenu: {
          '0%':   { transform: 'scaleX(1)   scaleY(1)' },
          '60%':  { transform: 'scaleX(.15) scaleY(1)' },
          '100%': { transform: 'scaleX(.15) scaleY(0)' }
        },


        openNub: {
          '0%':   { height: '0'   },
          '100%': { height: '30%' }
        },
        closeNub: {
          '0%':   { height: '30%' },
          '100%': { height: '0'   }
        },


        fadeIn: {
          '0%':   { opacity: '0'  },
          '100%': { opacity: '1'  }
        },
        fadeOut: {
          '0%':   { opacity: '1'  },
          '100%': { opacity: '0'  }
        },
        

        popUp: {
          '0%':   { transform: 'rotateX(0.25turn)' },
          '100%': { transform: 'rotateX(0)'        }
        },
        popDown: {
          '0%':   { transform: 'rotateX(0)'        },
          '100%': { transform: 'rotateX(0.25turn)' }
        },


        loadTitle: {
          '0%':   { transform: 'rotateX(0.25turn)',   color: 'black' },
          '50%':  { transform: 'rotateX(0.125turn)',  color: 'black' },
          '100%': { transform: 'rotateX(0)',          color: 'white' }
        },


        slideOutLeft: {
          '0%':   { transform: 'skewX(0)      translateX(0)'      },
          '100%': { transform: 'skewX(-45deg) translateX(-150%)'  }
        },
        slideOutRight: {
          '0%':   { transform: 'skewX(0)      translateX(0)'      },
          '100%': { transform: 'skewX(45deg) translateX(150%)'    }
        },
        slideInLeft: {
          '0%':   { transform: 'skewX(-45deg) translateX(150%)'  },
          '100%': { transform: 'skewX(0)      translateX(0)'     }
        },
        slideInDown: {
          '0%'  : { transform: 'translateY(-150%)'  },
          '100%': { transform: 'translateY(0)'      }
        },
        slideOutUp: {
          '0%'  : { transform: 'translateY(0)'      },
          '100%': { transform: 'translateY(-150%)'  }
        },


        spinIn: {
          '0%':   { transform: 'rotateX(-.5turn)' },
          '100%': { transform: 'rotateX(0)'       }
        },
        spinOut: {
          '0%':   { transform: 'rotateX(0)'       },
          '100%': { transform: 'rotateX(-.5turn)' }
        },

       
      },
      animation: {

        'menuOpen':       'openMenu  400ms ease-in-out',
        'menuClose':      'closeMenu 400ms ease-in-out',

        'nubOpen':        'openNub  150ms linear',
        'nubClose':       'closeNub 150ms linear 400ms',

        'fadeIn':         'fadeIn 400ms ease-out',
        
        'fadeOut':        'fadeOut 400ms ease-out',
        
        'loadTitle':      'loadTitle 2500ms ease-out',

        'slideOutLeft':   'slideOutLeft 400ms ease-in',
        
        'slideOutRight':  'slideOutRight 400ms ease-in',
        
        'slideInLeft':    'slideInLeft 400ms ease-out',
        
        'slideInDown':    'slideInDown 400ms ease-out',

        'slideOutUp':     'slideOutUp 400ms ease-in',
        
        'spinIn':         'spinIn 400ms ease-out',

        'spinOut':        'spinOut 400ms ease-in',
        
        'popUp':          'popUp 400ms ease-out',

        'popDown':        'popDown 400ms ease-in'

      },
      
      fontFamily: {
        'sans':    [ fontFamilySans ],
        'serif':   [ fontFamilySerif ],
        'body':    [ fontFamilyBody ],
        'heading': [ fontFamilyHeading ],
        'title':   [ fontFamilyTitle ],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.font-title': {
          fontFamily: fontFamilyTitle,
          fontWeight: '900',
          fontSize: 'clamp(1.5rem, 2vw + 1rem, 3rem)',  // Font size scales between 1.5rem and 3rem as the viewport width increases
        },
        '.font-heading': {
          fontFamily: fontFamilyHeading,
          fontWeight: '400',
          fontSize: 'clamp(1.25rem, 1.5vw + 1rem, 2.5rem)',  // Font size scales between 1.25rem and 2.5rem as the viewport width increases
        },
        '.font-body': {
          fontFamily: fontFamilyBody,
          fontWeight: '400',
          fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.5rem)',  // Font size scales between 1rem and 1.5rem as the viewport width increases
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

