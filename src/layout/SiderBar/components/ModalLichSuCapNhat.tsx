import { useState } from 'react';
import { TableColumnsType } from 'antd';
import { fakeDataLichSuCapNhat } from '../config';
import { ChiTietLichSuCapNhat, ModalLichSuCapNhatProps } from '../types';
import { Button, FlexTable, Modal, TextTooltip } from '@/components/Atoms';
import { DEFAULT_PAGE_PARAMS } from '@/constants/common/const';
import { useDrawerInner } from '@/hooks';
import { SearchListQueryParams } from '@/service/API/types';
import { formatDate } from '@/utilities/date';
import { getColumnIndex } from '@/utilities/table';

const ModalLichSuCapNhat: React.FC<ModalLichSuCapNhatProps> = ({ ref$ }) => {
  const [params, setParams] = useState<SearchListQueryParams>(DEFAULT_PAGE_PARAMS);
  const [dsLichSuCapNhat, setDsLichSuCapNhat] = useState<ChiTietLichSuCapNhat[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { visible, close } = useDrawerInner(ref$, () => {
    fetchDsLichSuCapNhat(params);
  });

  const columns: TableColumnsType<ChiTietLichSuCapNhat> = [
    getColumnIndex(params),
    {
      title: 'Ngày cập nhật',
      dataIndex: 'ngayCapNhat',
      width: 125,
      // sorter: true,
      align: 'center',
      render(value) {
        return value && formatDate(value);
      }
    },
    {
      title: 'Tên chức năng',
      dataIndex: 'tenChucNang',
      width: 220,
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Nội dung',
      dataIndex: 'noiDung',
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Người dùng',
      dataIndex: 'tenLoaiNguoiDung',
      width: 155,
      render(value) {
        return <TextTooltip>Đối với tài khoản {value}</TextTooltip>;
      }
    },
    {
      title: 'Mục HDSD',
      dataIndex: 'tenMucHDSD',
      width: 155,
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    }
  ];

  async function fetchDsLichSuCapNhat(newParams: SearchListQueryParams) {
    try {
      setLoading(true);
      setParams(newParams);
      //call api
      const res = { data: { content: fakeDataLichSuCapNhat, totalElements: fakeDataLichSuCapNhat.length } };
      setDsLichSuCapNhat(res.data.content);
      setTotal(res.data.totalElements);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleAfterClose() {
    setParams(DEFAULT_PAGE_PARAMS);
    setDsLichSuCapNhat(undefined);
    setTotal(0);
  }

  return (
    <Modal
      title='Lịch sử cập nhật'
      loading={loading}
      onCancel={close}
      afterClose={handleAfterClose}
      footer={[
        <Button key='close' danger type='primary' onClick={close}>
          Đóng
        </Button>
      ]}
      width='max(65%, 800px)'
      open={visible}
    >
      <FlexTable
        bordered={false}
        columns={columns}
        dataSource={dsLichSuCapNhat}
        onChange={(pagination, _filters, sort) => {
          const newParams = {
            ...params,
            page: pagination.current || params.page,
            size: pagination.pageSize || params.size,
            sort: sort.converted || DEFAULT_PAGE_PARAMS.sort
          };
          fetchDsLichSuCapNhat(newParams);
        }}
        pagination={{ pageSize: params.size, current: params.page, total: total }}
      />
    </Modal>
  );
};

export default ModalLichSuCapNhat;
