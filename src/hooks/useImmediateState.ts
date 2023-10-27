






/**
 * this one could also be thought of as a useRenderRef hook.
 * 
 * if useState's asynchronous nature is causing problems,
 * and you need to access the state value immediately,
 * but you don't want to use a ref because you want to trigger a re-render,
 * then this hook is for you.
 * 
 * it works by storing the value in both a ref and a state variable,
 * and returning a getter function that knows to return the ref value
 * if the state value hasn't updated yet.
 * 
 * declare it just like a useState hook:
 * 
 *    const [ state, setState ] = useImmediateState();
 * 
 * and use it just like useState, with one caveat:
 * 
 * because state represents a getter function, rather than directly 
 * referring to the state value, you must call it to retrieve the value:
 * 
 *      state();                <== returns the current value of state
 * 
 *      setState('new value');
 *      console.log(state());   <== returns 'new value', even if state hasn't updated yet.
 */




import {  useRef, useState } from 'react';




export default function useImmediateState<T>(initialValue?: T): [ () => T | undefined, (value: T) => void ] {


    const [ state,      setState] = useState<T>(initialValue as T);
    const   stateRef              = useRef(initialValue);
  
  
  
    const setImmediateState = (value : T) => {

        stateRef.current = value;    // update ref value for immediate access         
        setState(value);             // update state to trigger re-render
    };                                  

                                     // return the ref value if the state value hasn't updated yet
    const getImmediateState = () =>  stateRef.current === state ? state : stateRef.current;
  

    return [ getImmediateState, setImmediateState ];
  }
  