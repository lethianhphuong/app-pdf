import { useState } from 'react';
import { useAppDispatch } from '../common/useAppDispatch';
import { useAsyncEffect } from '../common/useAsyncEffect';
import { DanhMucEnums } from '@/constants/business/enums';
import { DanhMucQtud } from '@/service/API/danhmuc';
import { DanhMucDths } from '@/service/API/danhmuc/types';
import { store } from '@/store';
import {
  getDanhMucCapBac,
  getDanhMucChucVu,
  getDanhMucDanToc,
  getDanhMucDiaBan,
  getDanhMucDthsDonViTiepNhan,
  getDanhMucDthsNguonKhoiTo,
  getDanhMucDthsNguonKhoiToTuCTNV,
  getDanhMucGioiTinh,
  getDanhMucLoaiDiaBan,
  getDanhMucLoaiDiaBanDacTrung,
  getDanhMucLoaiTuyenDuong,
  getDanhMucNgheNghiep,
  getDanhMucPhanLoaiDangVien,
  getDanhMucQuocTich,
  getDanhMucThanhPhanGiaDinh,
  getDanhMucThanhPho,
  getDanhMucTonGiao,
  getDanhMucTrinhDoVanHoa
} from '@/store/slices/danhMuc/services';
import { DanhMucState } from '@/store/slices/danhMuc/types';

export interface BaseDanhMucConfig extends Partial<DanhMucQtud>, Partial<DanhMucDths> {}

export function useDanhMuc(danhMucArr: DanhMucEnums[], arg?: Object) {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useAppDispatch();

  useAsyncEffect(async () => {
    try {
      await fetchDanhMuc();
    } catch (_) {
      //
    } finally {
      setIsFetched(true);
    }
  }, []);

  async function fetchDanhMuc() {
    for (const danhMuc of danhMucArr) {
      switch (danhMuc) {
        case DanhMucEnums.ThanhPho:
          await dispatch(getDanhMucThanhPho());
          break;
        case DanhMucEnums.GioiTinh:
          await dispatch(getDanhMucGioiTinh());
          break;
        case DanhMucEnums.QuocTich:
          await dispatch(getDanhMucQuocTich());
          break;
        case DanhMucEnums.DanToc:
          await dispatch(getDanhMucDanToc());
          break;
        case DanhMucEnums.TonGiao:
          await dispatch(getDanhMucTonGiao());
          break;
        case DanhMucEnums.NgheNghiep:
          await dispatch(getDanhMucNgheNghiep());
          break;
        case DanhMucEnums.CapBac:
          await dispatch(getDanhMucCapBac());
          break;
        case DanhMucEnums.ChucVu:
          await dispatch(getDanhMucChucVu());
          break;
        case DanhMucEnums.TrinhDoVanHoa:
          await dispatch(getDanhMucTrinhDoVanHoa());
          break;
        case DanhMucEnums.ThanhPhanGiaDinh:
          await dispatch(getDanhMucThanhPhanGiaDinh());
          break;
        case DanhMucEnums.PhanLoaiDangVien:
          await dispatch(getDanhMucPhanLoaiDangVien());
          break;

        //#region Dths
        case DanhMucEnums.DthsDonViTiepNhan:
          if (arg) {
            await dispatch(getDanhMucDthsDonViTiepNhan(arg));
          }
          break;
        case DanhMucEnums.DthsNguonKhoiTo:
          await dispatch(getDanhMucDthsNguonKhoiTo());
          break;
        case DanhMucEnums.DthsNguonKhoiToTuCTNV:
          await dispatch(getDanhMucDthsNguonKhoiToTuCTNV());
          break;
        //#endregion

        case DanhMucEnums.LoaiTuyenDuong:
          await dispatch(getDanhMucLoaiTuyenDuong());
          break;
        case DanhMucEnums.DiaBan:
          await dispatch(getDanhMucDiaBan());
          break;
        case DanhMucEnums.LoaiDiaBan:
          await dispatch(getDanhMucLoaiDiaBan());
          break;
        case DanhMucEnums.LoaiDiaBanDacTrung:
          await dispatch(getDanhMucLoaiDiaBanDacTrung());
          break;
        default:
          break;
      }
    }
  }

  if (!isFetched) return danhMucArr.map((_danhMucItem) => []);

  const state: DanhMucState = store.getState().danhMucManager;
  return danhMucArr.map((danhMucItem) => (state[danhMucItem]?.data as BaseDanhMucConfig[]) || []);
}
