// import { Spin } from 'antd';
import Container from '../Container';

// import ElementLoader from '@/components/Business/ElementLoader';

export default function LoadComponentFallback() {
  return (
    // <div className='h-screen flex items-center justify-center'>
    //   <Spin spinning={true} size='large' fullscreen />
    // </div>
    // <ElementLoader />
    <Container loading={true}>
      <></>
    </Container>
  );
}
