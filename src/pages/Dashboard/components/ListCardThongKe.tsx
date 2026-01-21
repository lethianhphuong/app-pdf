import { useState } from 'react';
import { FileProtectOutlined, FileTextOutlined, SolutionOutlined, TeamOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';
import { BgImageBase64Obj } from '../types';
import { TextTooltip } from '@/components/Atoms';
import { useAsyncEffect } from '@/hooks';

const ListCardThongKe = () => {
  const [bgImageBase64Obj, setBgImageBase64Obj] = useState<BgImageBase64Obj>();

  useAsyncEffect(async () => {
    getBgImageBase64();
  }, []);

  async function getBgImageBase64() {
    const { BG_IMAGE_STATISTIC_YELLOW_BASE64, BG_IMAGE_STATISTIC_GREEN_BASE64, BG_IMAGE_STATISTIC_BLUE_BASE64 } =
      await import('@/constants');
    setBgImageBase64Obj({
      deXuat: BG_IMAGE_STATISTIC_YELLOW_BASE64,
      hoSo: BG_IMAGE_STATISTIC_GREEN_BASE64,
      doiTuong: BG_IMAGE_STATISTIC_BLUE_BASE64,
      lucLuong: BG_IMAGE_STATISTIC_BLUE_BASE64
    });
  }

  return (
    <Row
      gutter={[
        { xxl: 16, sm: 8 },
        { xxl: 16, sm: 8 }
      ]}
      align='stretch'
      justify='space-between'
    >
      <Col sm={10} xl={5}>
        <div
          className='statistic-wrapper'
          aria-hidden={!bgImageBase64Obj?.deXuat}
          style={{ backgroundImage: `url(${bgImageBase64Obj?.deXuat})` }}
        >
          <Statistic
            title={
              <>
                <FileProtectOutlined />
              </>
            }
          />
          <Statistic
            title={
              <TextTooltip ellipsis={{ tooltip: { title: 'Chưa xử lý' } }}>
                {/* <Link to={`/tong-hop-de-xuat?trangThai=${TrangThaiXuLyEnums.ChoXuLy}`}>Chưa xử lý</Link> */}
                Chưa xử lý
              </TextTooltip>
            }
            className='mb-1'
          />
          <Statistic
            title={
              <TextTooltip ellipsis={{ tooltip: { title: 'Đã xử lý' } }}>
                {/* <Link to={`/tong-hop-de-xuat?trangThai=${TrangThaiXuLyEnums.DaXuLy}`}>Đã xử lý</Link> */}
                Đã xử lý
              </TextTooltip>
            }
          />
        </div>
      </Col>
      <Col sm={14} xl={7}>
        <div
          className='statistic-wrapper'
          aria-hidden={!bgImageBase64Obj?.hoSo}
          style={{ backgroundImage: `url(${bgImageBase64Obj?.hoSo})` }}
        >
          <Statistic
            title={
              <>
                <FileTextOutlined />
                <TextTooltip>Số lượng hồ sơ hiện hành</TextTooltip>
              </>
            }
            className='font-bold text-base'
          />
          <Row gutter={16} justify='space-between'>
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>
        </div>
      </Col>
      <Col sm={12} xl={6}>
        <div
          className='statistic-wrapper'
          aria-hidden={!bgImageBase64Obj?.doiTuong}
          style={{ backgroundImage: `url(${bgImageBase64Obj?.doiTuong})` }}
        >
          <Statistic
            title={
              <>
                <SolutionOutlined />
                <TextTooltip>Số lượng đối tượng</TextTooltip>
              </>
            }
            className='font-bold text-base'
          />
        </div>
      </Col>
      <Col sm={12} xl={6}>
        <div
          className='statistic-wrapper'
          aria-hidden={!bgImageBase64Obj?.lucLuong}
          style={{ backgroundImage: `url(${bgImageBase64Obj?.lucLuong})` }}
        >
          <Statistic
            title={
              <>
                <TeamOutlined />
              </>
            }
            className='font-bold text-base'
          />
          <Statistic
            title={
              <TextTooltip ellipsis={{ tooltip: { title: 'Đặc tình' } }}>
                {/* <Link to={`/luc-luong-bi-mat/quan-ly?loaiLucLuong=${LoaiLLBMEnums.DacTinh}`}>Đặc tình</Link> */}
                Đặc tình
              </TextTooltip>
            }
          />
          <Statistic
            title={
              <TextTooltip ellipsis={{ tooltip: { title: 'CTV' } }}>
                {/* <Link to={`/luc-luong-bi-mat/quan-ly?loaiLucLuong=${LoaiLLBMEnums.Ctv}`}>CTV</Link> */}
                CTV
              </TextTooltip>
            }
          />
          <Statistic
            title={
              <TextTooltip ellipsis={{ tooltip: { title: 'Cơ sở bí mật' } }}>
                {/* <Link to={`/luc-luong-bi-mat/quan-ly?loaiLucLuong=${LoaiLLBMEnums.Csbm}`}>Cơ sở bí mật</Link> */}
                Cơ sở bí mật
              </TextTooltip>
            }
          />
        </div>
      </Col>
    </Row>
  );
};

export default ListCardThongKe;
