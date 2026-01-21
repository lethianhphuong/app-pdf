// import { useEffect } from 'react';
// import { Form } from 'antd';
import { useMemo } from 'react';
import FormDiaChiWithQG from './components/FormWithQuocGia';
import FormDiaChiWithoutQG from './components/FormWithoutQuocGia';
import { getAdministrativeUnitTag, sortAdministratives } from './helper';
import { ChildFormConfig, FormDiaChiProps } from './types';
import { DanhMucEnums, DiaDiemEnums } from '@/constants/business/enums';
import { useDanhMuc } from '@/hooks';
import { DanhMucApi } from '@/service/API';

const FormDiaChi: React.FC<FormDiaChiProps> = ({
  title,
  prefixName,
  fieldsName,
  fieldsRequired,
  isShowChiTiet = false,
  isShowXaHuyenTinh = true,
  disabled = false,
  fetchWhenDropdownOpen = false
}) => {
  const [danhMucQuocGia, danhmucThanhPho] = useDanhMuc([DanhMucEnums.QuocTich, DanhMucEnums.ThanhPho]);

  const sortDanhmucThanhPho = useMemo(() => {
    return sortAdministratives((danhmucThanhPho as DanhMucApi.DanhMucDiaDiem[]) || []);
  }, [danhmucThanhPho]);

  const formConfig: ChildFormConfig = {
    [DiaDiemEnums.QuocGia]: {
      name: fieldsName?.[DiaDiemEnums.QuocGia],
      options: danhMucQuocGia.map((item) => ({ label: item.name, value: item.code })),
      required: fieldsRequired?.includes(DiaDiemEnums.QuocGia)
    },
    [DiaDiemEnums.TinhThanhPho]: {
      name: fieldsName?.[DiaDiemEnums.TinhThanhPho] || `${prefixName}TinhThanhPho`,
      options: sortDanhmucThanhPho.map((item) => ({
        label: item.name,
        value: item.code,
        fullLabel: (
          <>
            <span>{item.name}</span>
            {getAdministrativeUnitTag((item as any)?.endDate)}
          </>
        )
      })),
      required: fieldsRequired?.includes(DiaDiemEnums.TinhThanhPho)
    },
    [DiaDiemEnums.QuanHuyen]: {
      name: fieldsName?.[DiaDiemEnums.QuanHuyen] || `${prefixName}QuanHuyen`,
      options: [],
      required: fieldsRequired?.includes(DiaDiemEnums.QuanHuyen)
    },
    [DiaDiemEnums.XaPhuong]: {
      name: fieldsName?.[DiaDiemEnums.XaPhuong] || `${prefixName}XaPhuong`,
      options: [],
      required: fieldsRequired?.includes(DiaDiemEnums.XaPhuong)
    },
    [DiaDiemEnums.ChiTietDiaDiem]: {
      name: fieldsName?.[DiaDiemEnums.ChiTietDiaDiem] || `${prefixName}DiaChi`,
      required: fieldsRequired?.includes(DiaDiemEnums.ChiTietDiaDiem)
    }
  };

  // const form = Form.useFormInstance();
  // const watchedTinhThanhPho = Form.useWatch(
  //   fieldsName?.[DiaDiemEnums.TinhThanhPho] || `${prefixName}TinhThanhPho`,
  //   form
  // );
  // const watchedQuanHuyen = Form.useWatch(fieldsName?.[DiaDiemEnums.QuanHuyen] || `${prefixName}QuanHuyen`, form);
  // const watchedXaPhuong = Form.useWatch(fieldsName?.[DiaDiemEnums.XaPhuong] || `${prefixName}XaPhuong`, form);
  // const districtHidden = Form.useWatch('districtHidden', form);

  // const computeDiaChi = ({ tinhThanhPho, quanHuyen, xaPhuong, districtInfo }: any) => {
  //   const quanHuyenIsXaMoi = districtInfo?.data?.effectiveDate === '2025-07-01'; //độ dài xã mới
  //   if (quanHuyenIsXaMoi) return { tinhThanhPho, quanHuyen: null, xaPhuong: quanHuyen };
  //   return { tinhThanhPho, quanHuyen, xaPhuong };
  // };

  // useEffect(() => {
  //   const { tinhThanhPho, quanHuyen, xaPhuong } = computeDiaChi({
  //     watchedTinhThanhPho,
  //     watchedXaPhuong,
  //     watchedQuanHuyen,
  //     districtInfo: districtHidden
  //   });
  //   form.setFieldsValue({
  //     [fieldsName?.[DiaDiemEnums.TinhThanhPho] || `${prefixName}TinhThanhPho`]: tinhThanhPho,
  //     [fieldsName?.[DiaDiemEnums.QuanHuyen] || `${prefixName}QuanHuyen`]: quanHuyen,
  //     [fieldsName?.[DiaDiemEnums.XaPhuong] || `${prefixName}XaPhuong`]: xaPhuong
  //   });
  // }, [watchedTinhThanhPho, watchedXaPhuong, districtHidden, watchedQuanHuyen]);

  return (
    <div>
      {title && typeof title === 'string' ? <b>{title}</b> : title}
      {formConfig.quocGia?.name ? (
        <FormDiaChiWithQG
          formConfig={formConfig}
          isShowChiTiet={isShowChiTiet}
          isShowXaHuyenTinh={isShowXaHuyenTinh}
          disabled={disabled}
          fetchWhenDropdownOpen={fetchWhenDropdownOpen}
        />
      ) : (
        <FormDiaChiWithoutQG
          formConfig={formConfig}
          isShowChiTiet={isShowChiTiet}
          disabled={disabled}
          fetchWhenDropdownOpen={fetchWhenDropdownOpen}
        />
      )}
    </div>
  );
};

export default FormDiaChi;
