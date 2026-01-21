import { memo, useState } from 'react';
import { Button, Flex, TableColumnsType } from 'antd';
import ConNguoiDialog from '../ConNguoi/ConNguoiDialog';
import { FlexTable, TableAction, TextTooltip } from '@/components/Atoms';
import { TypeViewCoNguoi } from '@/constants';

const QuanHeGiaDinh: React.FC = () => {
  const [showModal, setShowModal] = useState<{
    show: boolean;
    id: string | undefined;
  }>({
    show: false,
    id: ''
  });

  const columns: TableColumnsType = [
    {
      title: 'STT',
      align: 'center',
      width: 60,
      render: (_value, _row, index) => {
        return index + 1;
      }
    },
    {
      title: 'Họ và tên',
      dataIndex: 'hoTen',
      width: 200,
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Năm sinh',
      dataIndex: 'namSinh',
      width: 150
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioiTinh',
      width: 150
    },
    {
      title: 'CCCD/CMT',
      dataIndex: 'soCccd',
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      },
      width: 160
    },
    {
      title: 'Nơi ở hiện này',
      dataIndex: 'noiOHienNay',
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Thao tác',
      sorter: false,
      dataIndex: 'action',
      width: 100,
      fixed: 'left',
      render() {
        return <TableAction onEdit={() => {}} onDelete={() => {}} />;
      }
    }
  ];

  const handleClose = () => {
    setShowModal({
      show: false,
      id: ''
    });
  };
  return (
    <Flex gap={8} vertical>
      <Flex justify='end'>
        <Button type='primary' onClick={() => setShowModal({ show: true, id: '' })}>
          Thêm mới
        </Button>
      </Flex>
      <FlexTable rowKey='id' columns={columns} dataSource={[]} />

      {showModal.show && (
        <ConNguoiDialog
          close={handleClose}
          visible={showModal.show}
          idConNguoi={showModal?.id}
          typeView={TypeViewCoNguoi.QUAN_HE}
        />
      )}
    </Flex>
  );
};

export default memo(QuanHeGiaDinh);
