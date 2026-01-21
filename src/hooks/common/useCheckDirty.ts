import { useAppDispatch } from './useAppDispatch';
import { modal } from '@/staticAlert';
import { store } from '@/store';
import { setDirtyState } from '@/store/slices/dirty';

export function useCheckDirty() {
  const dispatch = useAppDispatch();

  const getDirty = () => {
    const { isDirty } = store.getState().dirtyManager;
    return isDirty;
  };

  const setDirty = (payload: boolean) => {
    if (getDirty() === payload) return;
    dispatch(setDirtyState(payload));
  };

  const checkDirty = (callbackFn: () => any, customMessage?: string) => {
    if (getDirty()) {
      modal.confirm({
        title: 'Cảnh báo',
        content: customMessage || 'Nếu tiếp tục, tất cả các thay đổi sẽ bị hủy bỏ!',
        okText: 'Tiếp tục chuyển',
        cancelText: 'Đóng',
        centered: true,
        onOk: () => {
          setDirty(false);
          callbackFn();
        }
      });
    } else {
      callbackFn();
    }
  };

  return { isDirty: getDirty(), getDirty, setDirty, checkDirty };
}
