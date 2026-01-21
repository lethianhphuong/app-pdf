import { useRef, useState } from 'react';
import { Col, Divider, Form, Row, SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import SelectCanBoByDonVi from '../SelectCanBoByDonVi';
import { Button } from '@/components/Atoms/Button';
import { Modal } from '@/components/Atoms/Modal';

export default function SelectCanBoCapDuoi(props: {
  label: string;
  name: string;
  disabled?: boolean;
  onChange: SelectProps['onChange'];
  maDonVi: string;
  required?: boolean;
}) {
  const { label, name, disabled, onChange, maDonVi, required = false } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const form = Form.useFormInstance();
  const selectedCanBo = useRef<{ value: any; option: DefaultOptionType | DefaultOptionType[] }>();
  return (
    <>
      <SelectCanBoByDonVi
        canBoConfig={{
          label: label,
          name: name,
          labelInValue: true,
          disabled: disabled,
          required,
          onChange: onChange,
          dropdownRender: (menu) => (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              <div className='text-center'>
                <Button
                  type='text'
                  onClick={() => {
                    setIsOpenModal(true);
                  }}
                >
                  Chọn thêm
                </Button>
              </div>
            </>
          )
        }}
        maDonVi={maDonVi}
      />
      <Modal
        centered
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        destroyOnClose
        title='Chọn cán bộ'
        footer={
          <div>
            <Button
              type='primary'
              onClick={async () => {
                if (!selectedCanBo.current) {
                  setIsOpenModal(false);
                  return;
                }
                form.setFieldValue(name, selectedCanBo.current?.value);
                onChange && onChange(selectedCanBo.current?.value, selectedCanBo.current.option);
                setIsOpenModal(false);
              }}
            >
              Xác nhận
            </Button>
          </div>
        }
      >
        <Row>
          <Col span={24}>
            <SelectCanBoByDonVi
              hasDonViComponent={{ disabledCanBoWhenDonViNoValue: true }}
              donViConfig={{
                label: 'Đơn vị',
                name: 'donVi-additional',
                parentCode: maDonVi
              }}
              canBoConfig={{
                label: label,
                name: `${name}-additional`,
                onChange(value, option) {
                  if (!(option as Record<string, any>).account) return;
                  selectedCanBo.current = { value, option };
                }
              }}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
}
