import { useCallback } from 'react';

const useHttp = processData => {
  const sendRequest = useCallback(
    async (url, requestConfig) => {
      try {
        const response = await fetch(url, requestConfig);

        if (!response.ok) {
          throw new Error('Request failed!');
        }

        const data = await response.json();

        processData(data);
      } catch (err) {
        console.error(err.message || 'Something went wrong!');
      }
    },
    [processData]
  );

  return { sendRequest };
};

export default useHttp;
