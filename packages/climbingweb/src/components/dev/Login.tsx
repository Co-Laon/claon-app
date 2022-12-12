import { useToken } from 'climbingweb/src/hooks/useToken';
import React, { useRef } from 'react';

const Login = () => {
  const access = useRef<HTMLInputElement>(null);
  const refresh = useRef<HTMLInputElement>(null);
  const { setSafeToken } = useToken();

  const handleLoginButtonClick = () => {
    if (!access.current?.value || !refresh.current?.value) return;
    setSafeToken({
      accessToken: access.current.value,
      refreshToken: refresh.current.value,
    });
    location.reload();
  };

  return (
    <div className="w-full">
      <div className="flex justify-between px-10">
        access:
        <input ref={access} className="border-2 border-black" type="text" />
      </div>
      <div className="flex justify-between px-10">
        refresh:{' '}
        <input
          ref={refresh}
          className="border-2 border-black"
          type="password"
        />
      </div>
      <button onClick={handleLoginButtonClick}>로그인</button>
    </div>
  );
};

export default Login;
