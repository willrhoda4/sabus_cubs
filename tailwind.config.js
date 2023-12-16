











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

    screens: {
      'sm':  '640px',  // Small devices like phones
      'md':  '768px',  // Medium devices like tablets
      'lg':  '1024px', // Large devices like laptops
      'xl':  '1280px', // Extra large devices like desktops
      '2xl': '1536px', // Extra extra large devices like large desktops
    },

    extend: {

      colors: {
        'brand-red':    '#A62826',
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


        slideInLeft: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)'     },
        },
        slideOutLeft: {
          '0%':   { transform: 'translateX(0)'     },
          '100%': { transform: 'translateX(-100%)' },
        },

        submenuSlideIn: {
          '0%':   { transform: 'translateX(-300%)' },
          '70%':  { transform: 'translateX(0)'     },
          '100%': { transform: 'translateX(0)'     },
        },
        submenuSlideOut: {
          '0%':   { transform: 'translateX(0)'     },
          '100%': { transform: 'translateX(-300%)' },
        },


        slideInRight: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)'    },
        },
        slideOutRight: {
          '0%':   { transform: 'translateX(0)'    },
          '100%': { transform: 'translateX(100%)' },
        },


        skewedSlideOutLeft: {
          '0%':   { transform: 'skewX(0)      translateX(0)'      },
          '100%': { transform: 'skewX(-45deg) translateX(-150%)'  }
        },
        skewedSlideOutRight: {
          '0%':   { transform: 'skewX(0)      translateX(0)'      },
          '100%': { transform: 'skewX(45deg) translateX(150%)'    }
        },
        skewedSlideInLeft: {
          '0%':   { transform: 'skewX(-45deg) translateX(150%)'  },
          '100%': { transform: 'skewX(0)      translateX(0)'     }
        },
        skewedSlideInDown: {
          '0%'  : { transform: 'translateY(-150%)'  },
          '100%': { transform: 'translateY(0)'      }
        },
        skewedSlideOutUp: {
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

        wiggle: {
          '0%':   { transform: 'translateY(0) rotate(0)'           },
          '25%':  { transform: 'translateY(-1.25px) rotate(-5deg)' },
          '50%':  { transform: 'translateY(-2.5px) rotate(5deg)'   },
          '75%':  { transform: 'translateY(-1.25px) rotate(-5deg)' },
          '100%': { transform: 'translateY(0) rotate(0)'           }
        },

        growDown: {
          '0%':   { transform: 'scaleY(0)'   },
          '100%': { transform: 'scaleY(1)'   }
        },

        growUp: {
          '0%':   { transform: 'scaleY(1)'   },
          '100%': { transform: 'scaleY(0)'   }
        },

        imageHop: {
          '0%, 100%': { transform: 'translateY(0)' },
          '5%, 90%': { transform: 'translateY(-2%)' },
        },

       
      },
      animation: {

        'menuOpen':                   'openMenu  400ms ease-in-out',
        'menuClose':                  'closeMenu 400ms ease-in-out',

        'nubOpen':                    'openNub  150ms linear',
        'nubClose':                   'closeNub 150ms linear 400ms',

        'fadeIn':                     'fadeIn 400ms ease-out',
        
        'fadeOut':                    'fadeOut 400ms ease-out',
        
        'loadTitle':                  'loadTitle 2500ms ease-out',
        

        'slide-in-left':             'slideInLeft 0.4s ease-out forwards',
        'slide-out-left':             'slideOutLeft 0.4s ease-out forwards',
        
        'slide-in-right':             'slideInRight 0.4s ease-out forwards',
        'slide-out-right':            'slideOutRight 0.4s ease-out forwards',
        
      
        'slide-in-left-after':        'slideInLeft 0.4s ease-out forwards .4s',
        'slide-out-left-after':       'slideOutLeft 0.3s ease-out forwards .2s',
        
        'slide-in-right-after':       'slideInRight 0.4s ease-out forwards .4s',
        'slide-out-right-after':      'slideOutRight 0.4s ease-out forwards .4s',


        'submenu-slide-in':           'submenuSlideIn  0.8s ease-out forwards',
        'submenu-slide-out':          'submenuSlideOut 0.4s ease-out forwards',
    
        'skewedSlideOutLeft':         'slideOutLeft 400ms ease-in',

        'skewedSlideOutRight':        'slideOutRight 400ms ease-in',
        
        'skewedSlideInLeft':          'slideInLeft 400ms ease-out',

        'skewedSlideInDown':          'slideInDown 400ms ease-out',

        'skewedSlideOutUp':           'slideOutUp 400ms ease-in',
        
        'spinIn':                     'spinIn 400ms ease-out',

        'spinOut':                    'spinOut 400ms ease-in',
        
        'popUp':                      'popUp 400ms ease-out',

        'popDown':                    'popDown 400ms ease-in',
        
        'wiggle':                     'wiggle 400ms ease-out',

        'growUp':                     'growUp 400ms ease-out',

        'growDown':                   'growDown 400ms ease-out',

        'imageHop':                   'imageHop 2s ease-out',








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
    // Your existing utility definitions
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-title': {
          fontFamily: fontFamilyTitle,
          fontWeight: '900',
          fontSize: '5rem', // Font size scales
        },
        '.text-heading': {
          fontFamily: fontFamilyHeading,
          fontWeight: '400',
          fontSize: '3rem', // Font size scales
        },
        '.text-body': {
          fontFamily: fontFamilyBody,
          fontWeight: '400',
          fontSize: '1.4rem', // Font size scales
        },
      };
  
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  
    // Adding child variants
    function ({ addVariant }) {
      // Add basic child variants
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
  
      // Add specific child variants
      addVariant('first-child', '& > :first-child');
      addVariant('last-child', '& > :last-child');
      addVariant('odd-child', '& > :nth-child(odd)');
      addVariant('even-child', '& > :nth-child(even)');
  
      // Function to generate sequential array for nth-child variants
      const generateSequentialArray = (limit) => {
        return Array.from({ length: limit }, (_, i) => i + 1);
      };
  
      // Generate nth-child variants
      const nthValues = generateSequentialArray(10); // Adjust the limit as needed
      nthValues.forEach(n => {
        addVariant(`nth-child-${n}`, `& > :nth-child(${n})`);
      });
    },
  ],  
}

