import { createContext, ReactNode, useState } from 'react';
import Toast from './Toast';

export const ToastContext = createContext({
  toastOpen: false,
  toast: (message: string) => {
    console.log(message);
  },
});

// 성능 개선 필요
// children 을 React.memo 로 감싸도 Toast 컴포넌트가 mount, unmount 될 때 children 렌더링이 계속 되는 문제가 있음
// 전역 상태 말고 다른 것으로 해결 할 수 있을까?
export const ToastClient = ({ children }: { children: ReactNode }) => {
  const [toastOpen, setToastOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <ToastContext.Provider
      value={{
        toastOpen,
        toast: (toastMessage: string) => {
          setToastOpen(true);
          setMessage(toastMessage);
        },
      }}
    >
      {children}
      {toastOpen && (
        <Toast message={message} setToastOpenState={setToastOpen} />
      )}
    </ToastContext.Provider>
  );
};
