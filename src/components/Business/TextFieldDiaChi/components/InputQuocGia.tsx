import { BaseInputDiaChiProps } from '../types';
import { Input } from '@/components/Atoms';

const InputQuocGia: React.FC<BaseInputDiaChiProps> = (props) => {
  const { formConfig, ...rest } = props;

  return <Input {...rest} name={formConfig.quocGia?.name} required={formConfig.quocGia?.required} label='Quốc gia' />;
};

export default InputQuocGia;
