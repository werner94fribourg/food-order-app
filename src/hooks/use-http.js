import { useCallback, useState } from 'react';

const useHttp = processData => {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const sendRequest = useCallback(
    async (url, requestConfig) => {
      try {
        setIsLoading(true);
        const response = await fetch(url, requestConfig);

        if (!response.ok) {
          throw new Error('Request failed!');
        }

        const data = await response.json();

        processData(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err.message || 'Something went wrong!');
        setHttpError(err.message || 'Something went wrong!');
        setIsLoading(false);
      }
    },
    [processData]
  );

  return { isLoading, httpError, sendRequest };
};

export default useHttp;
