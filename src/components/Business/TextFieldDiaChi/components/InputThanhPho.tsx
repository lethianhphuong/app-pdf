import { BaseInputDiaChiProps } from '../types';
import { Input } from '@/components/Atoms';

const InputThanhPho: React.FC<BaseInputDiaChiProps> = (props) => {
  const { formConfig, ...rest } = props;

  return (
    <Input
      {...rest}
      required={formConfig.tinhThanhPho.required}
      name={formConfig.tinhThanhPho.name}
      label='Tỉnh/thành phố'
    />
  );
};

export default InputThanhPho;
