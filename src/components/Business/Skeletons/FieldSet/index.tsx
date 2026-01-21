import { Flex, Skeleton } from 'antd';
import { EachElement, FieldSet } from '@/components/Atoms';

interface SkeletonFieldSetProps {
  buttonQuantity?: number;
}

const SkeletonFieldSet: React.FC<SkeletonFieldSetProps> = ({ buttonQuantity }) => {
  return (
    <FieldSet title='' className='mt-1 py-2'>
      {buttonQuantity && (
        <Flex gap={8} justify='end' align='center' className='mb-2'>
          <EachElement
            of={Array.from({ length: buttonQuantity })}
            render={(_item, index) => <Skeleton.Button key={index} active />}
          />
        </Flex>
      )}
      <Skeleton.Input active block style={{ height: 181 }} />
    </FieldSet>
  );
};

export default SkeletonFieldSet;
