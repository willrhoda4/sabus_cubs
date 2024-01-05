










import   React    from 'react';
import   Fallback from './Fallback';



// define the interface for the ErrorBoundary's props.
// this allows the ErrorBoundary to accept any valid React children.
interface ErrorBoundaryProps { children: React.ReactNode; }


// define the interface for the ErrorBoundary's state.
// this includes a boolean property 'hasError' to track if an error occurred.
interface ErrorBoundaryState { hasError: boolean;         }



// define the ErrorBoundary class component, specifying props and state types.
class ErrorBoundary extends React.Component< ErrorBoundaryProps, ErrorBoundaryState > {

  constructor( props: ErrorBoundaryProps ) {
    
    super(props);
    this.state = { hasError: false }; // initialize the component's state with hasError set to false.
  }


  // static method to update state when a child component throws an error.
  static getDerivedStateFromError(): ErrorBoundaryState {

    // return an object to update the state, setting hasError to true.
    return { hasError: true };
  }


  render() {

    // check if an error has occurred.
    // if an error has occurred, return a fallback UI.
    // if no error has occurred, render the children components as usual.
    if (this.state.hasError) { return <Fallback 
                                          title='Error!'
                                          text={`It looks like something went wrong. Try refreshing the window, and please let us know if the problem persists.`}
                                      />;
                             }
    else                     { return this.props.children; }

  }

}

export default ErrorBoundary;
