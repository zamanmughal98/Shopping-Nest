import { useState } from 'react';
import Cookies from 'js-cookie';
import DotEnvConfig from '../utils/DotEnvConfig';

const useAuthToken = () => {
  const [token, setToken] = useState(
    Cookies.get(DotEnvConfig.CookiesToken) || '',
  );

  const expiryTimeCalculator = () => {
    const hours = 5;
    return new Date(new Date().getTime() + hours * 60 * 60 * 1000);
  };
  const updateToken = (newToken) => {
    setToken(newToken);

    Cookies.set(DotEnvConfig.CookiesToken, newToken, {
      expires: expiryTimeCalculator(),
      secure: true,
      sameSite: 'Lax',
    });
  };

  const deleteToken = () => {
    Cookies.remove(DotEnvConfig.CookiesToken);
    setToken('');
  };

  return {
    token,
    updateToken,
    deleteToken,
  };
};

export default useAuthToken;
