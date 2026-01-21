import FormDiaChiWithQG from './components/FormWithQuocGia';
import FormDiaChiWithoutQG from './components/FormWithoutQuocGia';
import { ChildFormConfig, TextFieldDiaChiProps } from './types';
import { DiaDiemEnums } from '@/constants/business/enums';

const TextFieldFormDiaChi: React.FC<TextFieldDiaChiProps> = ({
  title,
  prefixName,
  fieldsName,
  fieldsRequired,
  isShowChiTiet = false,
  isShowXaHuyenTinh = true,
  isVN = true
}) => {
  const formConfig: ChildFormConfig = {
    [DiaDiemEnums.QuocGia]: {
      name: fieldsName?.[DiaDiemEnums.QuocGia],
      required: fieldsRequired?.includes(DiaDiemEnums.QuocGia)
    },
    [DiaDiemEnums.TinhThanhPho]: {
      name: fieldsName?.[DiaDiemEnums.TinhThanhPho] || `${prefixName}TinhThanhPho`,
      required: fieldsRequired?.includes(DiaDiemEnums.TinhThanhPho)
    },
    [DiaDiemEnums.QuanHuyen]: {
      name: fieldsName?.[DiaDiemEnums.QuanHuyen] || `${prefixName}QuanHuyen`,
      required: fieldsRequired?.includes(DiaDiemEnums.QuanHuyen)
    },
    [DiaDiemEnums.XaPhuong]: {
      name: fieldsName?.[DiaDiemEnums.XaPhuong] || `${prefixName}XaPhuong`,
      required: fieldsRequired?.includes(DiaDiemEnums.XaPhuong)
    },
    [DiaDiemEnums.ChiTietDiaDiem]: {
      name: fieldsName?.[DiaDiemEnums.ChiTietDiaDiem] || `${prefixName}DiaChi`,
      required: fieldsRequired?.includes(DiaDiemEnums.ChiTietDiaDiem)
    }
  };

  return (
    <div>
      {title && typeof title === 'string' ? <b>{title}</b> : title}
      {formConfig.quocGia?.name ? (
        <FormDiaChiWithQG
          isVN={isVN}
          formConfig={formConfig}
          isShowChiTiet={isShowChiTiet}
          isShowXaHuyenTinh={isShowXaHuyenTinh}
        />
      ) : (
        <FormDiaChiWithoutQG formConfig={formConfig} isShowChiTiet={isShowChiTiet} />
      )}
    </div>
  );
};

export default TextFieldFormDiaChi;
