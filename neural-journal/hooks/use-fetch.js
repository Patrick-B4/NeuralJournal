import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  // Initialize data to null, loading to false, and error to null
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      // Await the callback function and store the result
      const response = await cb(...args);
      setData(response);
      return response; // Optionally return the response for chaining
    } catch (err) {
      setError(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
