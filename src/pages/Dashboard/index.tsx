import ListCardThongKe from './components/ListCardThongKe';
import './index.less';
import { Container } from '@/components/Atoms';

const Dashboard = () => {
  return (
    <Container className='dashboard'>
      <div className='p-4 flex flex-col gap-4 h-full'>
        <div>
          <div className='flex items-center justify-between gap-2 mb-2'>
            <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Thống kê</div>
          </div>
          <ListCardThongKe />
        </div>
        <div className='overflow-auto'></div>
      </div>
    </Container>
  );
};

export default Dashboard;
