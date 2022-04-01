import { useEffect, useState } from "react"
import axios from "axios";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();       
        setTimeout(() => {
            axios.get(url, {
                cancelToken: source.token,
            })
            .then((response) => {
                setData(response.data);
            })
            .catch(e => {
                console.log(e);
            })
        }, 1000);
        return () => {
            source.cancel();
        }
    }, [url])

    return { data };
}

export default useFetch;