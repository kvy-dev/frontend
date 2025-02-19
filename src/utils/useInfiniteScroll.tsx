import Loader from "@/components/Loader";
import { axiosInstance } from "@/services/API";
import { useEffect, useState } from "react";

const useInfiniteScroll = (url: string, dependencies: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchMoreData = async () => {
    if (loadMore || !hasMoreData) return; // Prevent redundant API calls

    setLoadMore(true);
    try {
      const res = await axiosInstance.get(`${url}pageNumber=${pageNumber + 1}`);
      
      setData((prev) => [...prev, ...res.data]);
      setPageNumber((p) => p+1);
      
      if (res.data.length === 0) {
        setHasMoreData(false); // Stop fetching when no more data
      }
    } catch (error) {
      console.error("Error fetching visit history:", error);
    } finally {
      setLoading(false);
      setLoadMore(false);
    }
  };

  const initialFetch = async () => {
    setLoading(true);
    setHasMoreData(true);
    try {
      const res = await axiosInstance.get(`${url}pageNumber=${pageNumber}`);
      
      setData((prev) => res.data);
      
      if (res.data.length === 0) {
        setHasMoreData(false); // Stop fetching when no more data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    initialFetch();
  }, dependencies || [])

  const PageLoader = () => {
    if (loading && pageNumber === 0) {
      return <Loader />;
    }
    return null;
  }

  const LoadMore = () => {
    if (loading)
      return null;

    return (
      <>
        {!hasMoreData && <span><center></center></span>}
        {loadMore && <span><center>Loading...</center></span>}
        {!loadMore && hasMoreData && data.length > 0 && (
          <span onClick={fetchMoreData}>
            <center>Load more</center>
          </span>
        )}
      </>
    )
  }

  return {
    data,
    PageLoader,
    LoadMore,
    loading,
    initialFetch,
  }
}

export default useInfiniteScroll;