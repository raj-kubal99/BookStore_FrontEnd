import { useState, useEffect } from "react";

const useGetBooks = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {

        setTimeout(() =>{   
            fetch(url, {method:'GET'})
                .then(res => {
                    if (!res.ok){
                        throw Error('Could not fetch data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setPending(false);
                    setError(null);
                    console.log(data);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted')
                    } else {
                        setPending(false);
                        setError(err.message);
                    }
                })
        }) ;  
    }, [url]        
    );

    return{data, isPending, error}
}
 
export default useGetBooks;