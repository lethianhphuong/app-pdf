import { forwardRef, useEffect, useState } from 'react';
import { WarningFilled } from '@ant-design/icons';
import { Card, List, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DoKhanEnums, DoMat, LoaiThongTinTraoDoiEnums } from '@/constants/business/enums';
import { TraoDoiThongTinApi } from '@/service/API';
import { formatDate } from '@/utilities/date';

const TagDoKhan = ({ doKhan, className }: { doKhan: DoKhanEnums; className?: string }) => {
  switch (doKhan) {
    case DoKhanEnums.Khan:
      return (
        <Tag color='var(--gt-warning-color)' className={className}>
          Khẩn
        </Tag>
      );
    case DoKhanEnums.HoaToc:
      return (
        <Tag color='var(--gt-error-color)' className={className}>
          Hỏa tốc
        </Tag>
      );
    default:
      return;
  }
};

export function TagDoMat({ doMat }: { doMat: DoMat }) {
  switch (doMat) {
    case DoMat.Mat:
      return <Tag color='var(--gt-warning-color)'>Mật</Tag>;
    case DoMat.ToiMat:
      return <Tag color='var(--gt-error-color)'>Tối mật</Tag>;
    default:
      return;
  }
}

const PopoverAlert = forwardRef(function PopoverAlert({ closePopup }: { closePopup?: () => void }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const [unreadAlerts, setUnreadAlerts] = useState<TraoDoiThongTinApi.TraoDoiThongTin[]>([]);

  useEffect(() => {
    getUnreadAlerts();
  }, []);

  const getUnreadAlerts = async () => {
    try {
      setLoading(true);
      const res = await TraoDoiThongTinApi.getdanhSachTraoDoiThongTinNhanDenHanTraLoi();
      setUnreadAlerts(res.data);
    } catch (_) {
      //
    } finally {
      setLoading(false);
    }
  };

  return (
    <List
      loading={loading}
      dataSource={unreadAlerts}
      className='notification-list'
      itemLayout='vertical'
      renderItem={(item) => {
        return (
          <List.Item className='notification-item'>
            <Card
              size='small'
              hoverable
              bordered={false}
              onClick={() => {
                navigate(
                  `/trao-doi-thong-tin?isEdit=true&taiLieuPhanHoiId=${item.idTraoDoiThongTin}&loaiThongTin=${LoaiThongTinTraoDoiEnums.ThongTinDen}`
                );
                closePopup && closePopup();
              }}
            >
              <div style={{ width: '40px', fontSize: '18px' }} className='flex-none text-center'>
                <WarningFilled style={{ color: 'var(--gt-warning-color)' }} />
              </div>
              <div className='relative flex-1'>
                <div className='h-full flex-col'>
                  <Typography.Title level={5} style={{ marginBottom: 0, marginTop: 0 }}>
                    <div className='flex items-center gap-2'>
                      <div>Đến hạn trao đổi thông tin</div>
                      <div>
                        {item.doKhan && <TagDoKhan doKhan={item.doKhan} className='mr-0.5' />}
                        {item.doMat && <TagDoMat doMat={item.doMat as DoMat} />}
                      </div>
                    </div>
                  </Typography.Title>
                  <div>Đơn vị gửi: {item.tenDonViGui}</div>
                  <div>Trạng thái: {item.tenTrangThai}</div>
                </div>
                <div className='text-right absolute right-0 bottom-0' key='time'>
                  <Typography.Text className='text-xs italic' style={{ color: 'var(--gt-primary-color)' }}>
                    {formatDate(item.ngayDen)}
                  </Typography.Text>
                </div>
              </div>
            </Card>
          </List.Item>
        );
      }}
    />
  );
});

export default PopoverAlert;
