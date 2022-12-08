import { useContext } from 'react';
import { ToastContext } from '../components/common/Toast/ToastClient';

/**
 * ToastContext를 사용하기 위한 커스텀 훅
 * @returns { toast } toast 메시지를 띄우기 위한 함수
 */
export const useToast = () => {
  return useContext(ToastContext);
};
