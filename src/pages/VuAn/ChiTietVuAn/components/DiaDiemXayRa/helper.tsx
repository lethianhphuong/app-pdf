import { DiaDiemXayRaParams } from './types';

export function convertDiaDiemXayRa(data: DiaDiemXayRaParams, isGio = false) {
  if (!data) return '';

  let diaDiemChiTiet = data.diaDiemChiTiet || '';
  const xa = data.xa || '';
  const huyen = data.huyen || '';
  const tinh = data.tinh || '';
  const ngayXayRa = data.ngayXayRa;
  const xayRaKhoang = data.xayRaKhoang;
  const gioXayRa = data.gioXayRa && data.gioXayRa.split(':');

  let diaDiem = '';
  const gio = gioXayRa && gioXayRa[0];
  const phut = gioXayRa && gioXayRa[1];

  if (!isGio) {
    if (xayRaKhoang) {
      diaDiem += xayRaKhoang;
    } else if (gioXayRa) {
      diaDiem += 'Vào lúc ' + gio + ' Giờ ' + phut + ' phút';
    }
  }

  if (ngayXayRa) {
    if (diaDiem.trim()) {
      diaDiem += ', ngày ' + ngayXayRa;
    } else {
      diaDiem += 'ngày ' + ngayXayRa;
    }
  }

  if (xa && xa != '') {
    if (diaDiemChiTiet.trim()) {
      diaDiemChiTiet += ', ' + xa;
    } else {
      diaDiemChiTiet += xa;
    }
  }
  if (huyen && huyen != '') {
    diaDiemChiTiet += ', ' + huyen;
  }
  if (tinh && tinh != '') {
    diaDiemChiTiet += ', ' + tinh;
  }
  if (diaDiemChiTiet.trim().substring(0, 1) == ',') {
    diaDiem += ' tại ' + diaDiemChiTiet.slice(2, diaDiemChiTiet.length);
  } else if (diaDiemChiTiet) {
    diaDiem += ' tại ' + diaDiemChiTiet;
  }

  if (diaDiem && diaDiem.trim().startsWith('tại')) {
    diaDiem = diaDiem.slice(4, diaDiem.length);
  }

  if (diaDiem.trim().substring(0, 1) == ',') {
    diaDiem = diaDiem.slice(2, diaDiem.length);
  }

  return diaDiem;
}
