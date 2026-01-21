import { InputChiTietDiaDiemProps } from '../types';
import { Input } from '@/components/Atoms';
import { maxLengthConfig } from '@/constants/common/map';
import { ruleMaxLength, ruleNoSpecialCharacter } from '@/utilities/form/rules/common';

const InputChiTietDiaDiem: React.FC<InputChiTietDiaDiemProps> = ({ formConfig }) => {
  return (
    <Input
      label='Chi tiết địa điểm'
      name={formConfig.chiTietDiaDiem.name}
      rules={[ruleMaxLength(maxLengthConfig.lg), ruleNoSpecialCharacter]}
      required={formConfig.chiTietDiaDiem.required}
    />
  );
};

export default InputChiTietDiaDiem;
