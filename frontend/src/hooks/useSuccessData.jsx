import { useState, useEffect } from "react";
import successData from "../components/success/sucess.json";

const useSuccessData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setTimeout(() => {
        setData(successData);
        setLoading(false);
      }, 100);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
};

export default useSuccessData;
