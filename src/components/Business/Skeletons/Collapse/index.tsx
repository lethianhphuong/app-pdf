import { Skeleton } from 'antd';
import { FieldSet } from '@/components/Atoms';

interface SkeletonCollapseProps {
  open?: boolean;
  size?: number;
}

const SkeletonCollapse: React.FC<SkeletonCollapseProps> = ({ open = false, size = 17 }) => {
  return (
    <FieldSet title='' className='py-2' classNames={{ container: 'flex flex-col gap-2' }}>
      <div className='flex gap-2'>
        <Skeleton.Avatar active size={size} shape='square' />
        <Skeleton.Input active size='small' style={{ width: 200, height: size }} />
      </div>
      {open && <Skeleton.Input active block style={{ height: 181 }} />}
    </FieldSet>
  );
};

export default SkeletonCollapse;
