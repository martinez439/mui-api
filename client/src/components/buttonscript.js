import React from 'react'
import useScript from './useScript';


const MyComponent = () => {
    useScript('https://appcenter.intuit.com/Content/IA/intuit.ipp.anywhere-1.3.3.js');



    return(
        <div>
            <button onClick={useScript}>Test Componnent</button>
        </div>
    )
}
export default MyComponent