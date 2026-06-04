import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getMyUrls } from "../services/urlService";

const UrlContext = createContext();

export function UrlProvider({ children }) {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrls = async () => {
    try {
      const response = await getMyUrls();

      setUrls(response.data || []);
    } catch (error) {
      console.error(
        "Fetch URL Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const addUrl = (url) => {
    setUrls((prev) => [
      url,
      ...prev,
    ]);
  };

  const removeUrl = (id) => {
    setUrls((prev) =>
      prev.filter(
        (url) => url._id !== id
      )
    );
  };

  return (
    <UrlContext.Provider
      value={{
        urls,
        loading,
        fetchUrls,
        addUrl,
        removeUrl,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
}

export function useUrls() {
  return useContext(UrlContext);
}