import { createContext, ReactNode, useState } from 'react';
import Toast from './Toast';

export const ToastContext = createContext({
  toastOpen: false,
  toast: (message: string) => {
    console.log(message);
  },
});

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
