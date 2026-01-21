import { useEffect, useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { Input, Radio, RadioChangeEvent, Select, Typography } from 'antd';
import { DiaDiemSinhHoatConfig } from '../types';
import { diaDiemSinhHoatOptions } from '@/constants/common';
import { DiaDiemSinhHoatEnums } from '@/constants/enums';
import { DiemHenBiMatApi, HoSoApi } from '@/service/API';
import { DiemHenBiMat } from '@/service/API/diem-hen-bi-mat/types';
import { notification } from '@/staticAlert';

interface PopupDiaDiemSinhHoatProps {
  config: DiaDiemSinhHoatConfig;
  handleChange: (
    type: DiaDiemSinhHoatEnums,
    value: { label: string; value: string },
    fieldOption?: DiaDiemSinhHoatConfig
  ) => void;
  currentValue: { type: DiaDiemSinhHoatEnums; value: { label: string; value: string } };
}

const PopupDiaDiemSinhHoat: React.FC<PopupDiaDiemSinhHoatProps> = ({ config, handleChange, currentValue }) => {
  const [value, setValue] = useState<{ label: string; value: string }>();
  const [type, setType] = useState<DiaDiemSinhHoatEnums>(DiaDiemSinhHoatEnums.HopThuBiMat);
  const [dsDiemHen, setDsDiemHen] = useState<DiemHenBiMat[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const isDiemHenBiMat = type === DiaDiemSinhHoatEnums.DiemHenBiMat;
  const isKhac = type === DiaDiemSinhHoatEnums.Khac;

  useEffect(() => {
    setType(currentValue?.type || DiaDiemSinhHoatEnums.HopThuBiMat);
    setValue(currentValue?.value || { label: '', value: '' });
  }, [currentValue]);

  useEffect(() => {
    getDanhSachDiemHen();
  }, []);

  async function getDanhSachDiemHen() {
    try {
      const res = await DiemHenBiMatApi.getDanhSachDiemHenTheoCanBoDangNhap();
      setDsDiemHen(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChangeRadio(e: RadioChangeEvent) {
    const newType = e.target.value;
    setType(newType);
    setIsError(false);

    const isDiemHenBiMat = newType === DiaDiemSinhHoatEnums.DiemHenBiMat;
    if (!isDiemHenBiMat) setValue({ value: '', label: '' });
  }

  function handleChangeSelect(val?: { value: string; label: string }) {
    if (!val) return;
    setValue(val);
    handleChange && handleChange(type, val, config);
  }

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const currentInput = e.target.value;
    setValue({ label: currentInput, value: currentInput });
  }

  async function handleConfirmInput(val: string) {
    if (isKhac) {
      handleChange && handleChange(type, { label: val, value: val }, config);
      return;
    }

    const isValid = await checkSoHsDangKy(val);
    isValid
      ? handleChange && handleChange(type, { label: val, value: val }, config)
      : notification.error({ message: 'Số đăng ký không hợp lệ' });
  }

  async function checkSoHsDangKy(soHoSo: string) {
    if (!soHoSo) {
      setIsError(true);
      return false;
    }
    try {
      const res = await HoSoApi.checkHoSoTonTai({ soDangKy: soHoSo, isTrangThai: true });
      setIsError(!res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      setIsError(true);
      return false;
    }
  }

  return (
    <div className='flex flex-col gap-1 p-2 rounded shadow-inner'>
      <Typography.Text strong>Chọn địa điểm sinh hoạt: </Typography.Text>
      <Radio.Group options={Object.values(diaDiemSinhHoatOptions)} value={type} onChange={handleChangeRadio} />
      <Select
        style={{
          height: isDiemHenBiMat ? 30 : 0,
          opacity: isDiemHenBiMat ? 1 : 0,
          transition: 'all 200ms ease-in-out'
        }}
        open
        allowClear
        showSearch
        placeholder='Chọn điểm hẹn bí mật'
        options={dsDiemHen?.map((item) => ({ label: item.tenDiemHen, value: item.id }))}
        value={value}
        labelInValue
        onChange={handleChangeSelect}
        dropdownRender={(menu) => {
          return isDiemHenBiMat ? (
            menu
          ) : (
            <Input.Search
              placeholder={isKhac ? 'Nhập địa điểm khác' : 'Nhập số đăng ký'}
              autoFocus
              value={value?.value}
              onChange={handleChangeInput}
              onSearch={handleConfirmInput}
              enterButton={<SendOutlined />}
              status={isError ? 'error' : ''}
            />
          );
        }}
        dropdownStyle={{ padding: isDiemHenBiMat ? 5 : 0 }}
      />
    </div>
  );
};

export default PopupDiaDiemSinhHoat;
