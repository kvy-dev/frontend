import axios from "../../axios";
import { useEffect, useState } from "react";

const defaultOptions = {
    dependencyArray: [],
    getNextPageParam: () => {},
    enabled: true,
}

const useInfiniteGetQueryHook = (
    url,
    options = defaultOptions,
) => {
    const {
        dependencyArray,
        getNextPageParam,
        enabled,
    } = {...defaultOptions, ...options};

    const [data, updateData] = useState({pages: []});
    const [error, setError] = useState();
    const [page, setPage] = useState(1);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);

    const fetchFunctionGenerator = (initialFetch = true) => {
        const fetchFunction = async (queryParams) => {
            if(!enabled)
                return;
            if(initialFetch)
                setLoadingInitial(true);
            else
                setIsFetchingNextPage(true);
            try {
                const response = await axios.get(url, { 
                    params: {
                        ...queryParams,
                        page: initialFetch ? 1 : page,
                    },
                });
                const calculateNextPage = getNextPageParam({...response?.data}, response?.data?.pages);
                setPage(calculateNextPage);
                setHasNextPage(!!calculateNextPage);
                if(initialFetch) {
                    updateData({
                        pages: [
                            response?.data,
                        ]
                    });
                } else {
                    updateData(prevData => ({
                        pages: [
                            ...(prevData?.pages || {}),
                            response?.data,
                        ]
                    }));
                }
            } catch(err) {
                setError(true);
            } finally {
                if(initialFetch)
                    setLoadingInitial(false);
                else
                    setIsFetchingNextPage(false);
            }
        }

        return fetchFunction;
    }

    const fetchData = fetchFunctionGenerator();

    const fetchNextPage = fetchFunctionGenerator(false);

    useEffect(() => {
        fetchData();
    }, [...dependencyArray]);

    return {
        data, fetchData, loadingInitial, error, isFetchingNextPage, hasNextPage, fetchNextPage,
    }
};

export default useInfiniteGetQueryHook;