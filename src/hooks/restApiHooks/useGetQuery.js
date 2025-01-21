import { axiosInstance } from "services/API";
import { useEffect, useState } from "react";

const defaultOptions = {
    onError: null,
    onSuccess: null,
    errorString: "Error Fetching Data",
    fetchOnLoad: true,
    enabled: true,
    dependencyArray: [],
}

export const useGetQueryHook = (
    url,
    params,
    options = defaultOptions,
) => {
    const {
        onError,
        onSuccess,
        errorString,
        fetchOnLoad,
        enabled,
        dependencyArray,
    } = {...defaultOptions, ...options};

    const [data, updateData] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const fetchData = async (queryParams) => {
        if(!enabled)
            return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(url, { 
                params: queryParams, 
            });
            updateData(response?.data);
            typeof onSuccess === 'function' && onSuccess(response?.data);
        } catch(err) {
            if(typeof onError === 'function')
                onError(err);
            else {
              console.log('Error');
            }
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(fetchOnLoad) {
            fetchData(params);
        }
    }, [...dependencyArray]);

    return {
        fetchData, data, loading, error,
    }
};

export default useGetQueryHook;