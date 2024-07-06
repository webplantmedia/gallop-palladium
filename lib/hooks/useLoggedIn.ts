import { useEffect } from 'react';
import { state } from '@state';

export default function useLoggedIn() {
  useEffect(() => {
    const token = localStorage.getItem('wpToken');
    state.isLoggedIn = !!token;
  }, []);

  return true;
}
