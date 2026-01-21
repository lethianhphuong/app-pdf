import { InputChiTietDiaDiemProps } from '../types';
import { Input } from '@/components/Atoms';
import { maxLengthConfig } from '@/constants/common/map';
import { ruleMaxLength, ruleNoSpecialCharacter } from '@/utilities/form/rules/common';

const InputChiTietDiaDiem: React.FC<InputChiTietDiaDiemProps> = ({ formConfig, disabled = false, ...rest }) => {
  return (
    <Input
      autoTrim
      label='Chi tiết địa điểm'
      name={formConfig.chiTietDiaDiem.name}
      // rules={[ruleMaxLength(MAX_LENGTH.lg), ruleMinLength(MIN_LENGTH.sm), ruleNoSpecialCharacter]}
      required={formConfig.chiTietDiaDiem.required}
      {...(!disabled && {
        rules: [ruleMaxLength(maxLengthConfig.lg), ruleNoSpecialCharacter]
      })}
      disabled={disabled}
      {...rest}
    />
  );
};

export default InputChiTietDiaDiem;
