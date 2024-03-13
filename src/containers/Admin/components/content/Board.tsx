




/**
 * 
 *  container component for Board tab on content page in admin dashboard.
 * 
 *  we use the useRenderKey hook to force a re-render of 
 *  the BoardRoster component after a new board member is added.
 * 
 *  as a redundnacy, we check if a token is in local storage
 *  before rendering the admin controls for the BoardRoster.
 *  this is easy to workaround, but the EditorButtons component
 *  gets all its requests tested on the server anyway.
 */












import     useRenderKey     from '../../../../hooks/useRenderKey';

import     BoardRoster      from '../../../Info/components/BoardRoster';
import     BoardForm          from '../forms/BoardForm';





export default function Board(): JSX.Element {


    const [ renderKey, renderFAQs ] = useRenderKey();

    const   admin                   = localStorage.getItem('jwt') !== null;

    return (
        
        <div>
                  
            <BoardForm getData={renderFAQs} />

            <BoardRoster key={renderKey} admin={admin} />
                  
        </div>
    )
}


