import { axiosInstance } from "services/API";
import { useState } from "react";

const defaultOptions = {
    onError: null,
    onSuccess: null,
    errorString: "Error Fetching Data",
    successString: "Successfully posted data",
}

export const usePostQueryHook = (
    url,
    options = defaultOptions,
) => {

    const {
        onError,
        onSuccess,
        errorString,
        successString,
    } = {...defaultOptions, ...options};
    const [data, updateData] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const postData = async (queryParams, requestData) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(url, requestData, { 
                params: queryParams, 
            });
            updateData(response?.data);
            if(typeof onSuccess === 'function')
                onSuccess(response?.data);
            else {
              console.log('Error');
            }
        } catch(err) {
            if(typeof onError === 'function')
                onError();
            else {
                console.log('Error');
            }
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return {
        postData, data, loading, error,
    }
};
