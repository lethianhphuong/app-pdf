import { memo } from 'react';
import { Spin } from 'antd';
import '@/assets/style/loadingInitField.css';

const LoadingInitField = memo(function LoadingInitField({ text }: { text: boolean }) {
  return (
    <>
      {text && (
        <div className='loading-chuyen-doi-container'>
          <Spin
            tip={
              <>
                <div className='flex justify-center items-center mt-1'>
                  <p style={{ color: 'white', fontSize: 16, margin: 0, textShadow: 'none' }}>Đang cập nhật dữ liệu</p>
                  <div className='loading-dots ml-1'>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                  </div>
                </div>

                {/* <p style={{ color: 'white', fontSize: 14, margin: 0, textShadow: 'none' }}>{text} </p> */}
              </>
            }
            spinning={!!text}
            style={{ zIndex: 3002 }}
            size='large'
          >
            <div className='loading-chuyen-doi' style={{ width: 270, height: 120, marginTop: 30 }}></div>
          </Spin>
        </div>
      )}
    </>
  );
});

export default LoadingInitField;
