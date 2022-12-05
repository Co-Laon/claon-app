import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  setToastOpenState: React.Dispatch<React.SetStateAction<boolean>>;
}

// 공통 toast 컴포넌트, message를 받아서 toast 메시지를 띄워준다.
const Toast = ({ message, setToastOpenState }: ToastProps) => {
  const commonCss =
    'absolute m-2 bottom-10 z-10 flex justify-center w-full py-2 px-16 rounded bg-gray-800 text-white -translate-y-10 transition-all';
  const [css, setCss] = useState<string>(
    `${commonCss} opacity-0 translate-y-10`
  );
  // Toast 컴포넌트가 처음 렌더링 될 때, css를 변경시키기 위해 useEffect 사용
  useEffect(() => {
    setCss(`${commonCss} opacity-100 translate-y-0`);
    setTimeout(() => {
      setCss(`${commonCss} opacity-0 translate-y-10`);
    }, 2000);
    setTimeout(() => {
      setToastOpenState(false);
    }, 2500);
  }, [setToastOpenState]);
  return <div className={css}>{message}</div>;
};

export default Toast;
