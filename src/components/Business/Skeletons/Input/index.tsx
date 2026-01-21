import { Skeleton } from 'antd';
import { SkeletonInputProps } from 'antd/es/skeleton/Input';
import classNames from 'classnames';

const SkeletonInput: React.FC<SkeletonInputProps> = ({ block = true, active = true, className, ...rest }) => {
  return <Skeleton.Input className={classNames('py-1', className)} block={block} active={active} {...rest} />;
};

export default SkeletonInput;
