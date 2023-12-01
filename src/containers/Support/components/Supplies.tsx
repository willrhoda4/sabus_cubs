




import copy      from '../../../assets/copy';

import ItemsList from './ItemsList';





export default function Supplies(): JSX.Element {

    return (

        <div   className={` flex flex-col items-start p-8`} >

            <p className={`
                            font-body
                            w-full pr-[40%]
                            mt-8 mb-16   
                         `}
            >{ copy('supplies') }</p>

            <ItemsList />

        </div>

    );

}