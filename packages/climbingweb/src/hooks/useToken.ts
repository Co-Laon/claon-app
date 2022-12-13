import { useEffect, useState } from 'react';

interface Token {
  accessToken: string;
  refreshToken: string;
}

export const useToken = () => {
  const [token, setToken] = useState<Token>(() => {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const refreshToken = window.localStorage.getItem('refreshToken');
      return {
        accessToken: accessToken ? accessToken : '',
        refreshToken: refreshToken ? refreshToken : '',
      };
    } catch (error) {
      return { accessToken: '', refreshToken: '' };
    }
  });

  const dispatchStorgeEvent = (oldValue: Token, newValue: Token) => {
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'accessToken',
        oldValue: oldValue.accessToken,
        newValue: newValue.accessToken,
      })
    );
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'refreshToken',
        oldValue: oldValue.refreshToken,
        newValue: newValue.refreshToken,
      })
    );
  };

  const setSafeToken = (newToken: Token) => {
    try {
      window.localStorage.setItem('accessToken', newToken.accessToken);
      window.localStorage.setItem('refreshToken', newToken.refreshToken);
      dispatchStorgeEvent(token, newToken);
      setToken(newToken);
    } catch (error) {
      console.log(error);
    }
  };

  const isStorageLogin = () => {
    return token.accessToken !== '' && token.refreshToken !== '';
  };

  const logout = () => {
    try {
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken') {
        if (e.newValue === null) {
          setToken({ ...token, accessToken: '' });
        } else {
          setToken({ ...token, accessToken: e.newValue });
        }
      }
      if (e.key === 'refreshToken') {
        if (e.newValue === null) {
          setToken({ ...token, refreshToken: '' });
        } else {
          setToken({ ...token, refreshToken: e.newValue });
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [token]);

  return { token, setSafeToken, logout, isStorageLogin };
};
