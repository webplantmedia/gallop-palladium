import { useEffect } from 'react';
import { state, useSnapshot } from '@state';

export default function useIsLoggedIn() {
  const snap = useSnapshot(state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/is-logged-in/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        const { data } = json;
        const { isLoggedIn } = data;
        state.isLoggedIn = isLoggedIn;
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchData();
  }, []);
}
