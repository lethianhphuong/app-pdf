import { DiaChi } from '@/service/API/con-nguoi/types';
import { isEnvLocal } from './env';

export const converDiaChi = function (diaChi: DiaChi): string {
  let soNha_cv = diaChi.diaChiChiTiet || '';
  const tenXa = diaChi.xa;
  const tenHuyen = diaChi.huyen;
  const tenTinh = diaChi.tinh;
  const quocGia = diaChi.quocGia;

  if (tenXa && tenXa != '') {
    soNha_cv += ', ' + tenXa;
  }
  if (tenHuyen && tenHuyen != '') {
    soNha_cv += ', ' + tenHuyen;
  }
  if (tenTinh && tenTinh != '') {
    soNha_cv += ', ' + tenTinh;
  }
  if (quocGia && quocGia != '') {
    soNha_cv += ', ' + quocGia;
  }
  if (!diaChi.diaChiChiTiet || diaChi.diaChiChiTiet == '') {
    soNha_cv = soNha_cv.replace(', ', '');
  }

  return soNha_cv;
};

export const getContextPath = () => {
  let contextPath = '/';

  //#region Ưu tiên config trước
  const APP_CONTEXT_PATH = window.__APP_CONFIG__?.APP_CONTEXT_PATH;
  if (APP_CONTEXT_PATH) {
    return APP_CONTEXT_PATH;
  }
  //#endregion

  const checkURL = isEnvLocal;
  if (!checkURL) {
    const arrPathname = location.pathname.split('/');

    if (arrPathname.length >= 2) {
      contextPath += arrPathname[1];
    }
  }

  return contextPath;
};