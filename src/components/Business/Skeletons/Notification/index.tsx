import { Card, Skeleton } from 'antd';

export default function SkeletonNotification() {
  return (
    <Card size='small' bordered={false}>
      <div className='flex items-center'>
        <div style={{ width: '40px', fontSize: '18px' }} className='flex-none text-center'>
          <Skeleton.Avatar size={'small'} active />
        </div>
        <div className='flex-1'>
          <div className='mb-2'>
            <Skeleton.Input size='small' active />
          </div>
          <div className='w-full'>
            <Skeleton.Input block size='small' active />
          </div>
        </div>
        <Skeleton.Avatar size={10} active />
      </div>
    </Card>
  );
}
