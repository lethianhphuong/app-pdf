import { ChangeEvent, useEffect, useState } from 'react';
import { Input, Radio, Select, Typography } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import { debounce } from 'lodash';
import './styles.less';
import { Button, TextTooltip } from '@/components/Atoms';
import { diaDiemSinhHoatOptions as constantsDiaDiemSinhHoatOptions } from '@/constants/common';
import { DiaDiemSinhHoatEnums, PhanHeHoSoEnums } from '@/constants/enums';
import { useAsyncEffect } from '@/hooks/useAsyncEffect';
import { DiemHenBiMatApi, HoSoApi } from '@/service/API';
import { formatDate } from '@/utilities/date';

export interface DiaDiemSinhHoatValue {
  type: DiaDiemSinhHoatEnums;
  value: {
    label: string;
    value: string;
  };
  [x: string]: any;
}

export default function PopupSelectDiaDiemSinhHoat({ currentValue, handleChange, config }: any) {
  const [value, setValue] = useState<DiaDiemSinhHoatValue | undefined>();
  const [defaultValue, setDefaultValue] = useState<DiaDiemSinhHoatValue | undefined>();

  useEffect(() => {
    setValue(currentValue);
    setDefaultValue(currentValue);
  }, [currentValue]);

  return (
    <SelectDiaDiemSinhHoat
      value={value}
      defaultValue={defaultValue}
      onChange={(newValue: DiaDiemSinhHoatValue) => {
        setValue(newValue);
        handleChange(newValue.type, newValue.value, config);
      }}
    />
  );
}

export function SelectDiaDiemSinhHoat({
  value,
  defaultValue,
  onChange
}: {
  value?: DiaDiemSinhHoatValue;
  defaultValue?: DiaDiemSinhHoatValue;
  onChange?: (newValue: DiaDiemSinhHoatValue) => void;
}) {
  const [loaiDiaDiemSinhHoat, setLoaiDiaDiemSinhHoat] = useState<DiaDiemSinhHoatEnums>(
    value?.type || DiaDiemSinhHoatEnums.HopThuBiMat
  );
  const [diaDiemSinhHoatOptions, setDiaDiemSinhHoatOptions] = useState<DiaDiemSinhHoatValue[]>([]);
  const [loading, setLoading] = useState(false);
  const [tmpDiaDiemKhacValue, setTmpDiaDiemKhacValue] = useState<string>(
    value?.type === DiaDiemSinhHoatEnums.Khac ? value?.value?.value : ''
  );
  function handleLoaiDiaDiemSinhHoatChange(e: RadioChangeEvent) {
    setLoaiDiaDiemSinhHoat(e.target.value);
  }

  useEffect(() => {
    handleSoDangKySearch('');
  }, []);

  useEffect(() => {
    if (!defaultValue) return;
    setLoaiDiaDiemSinhHoat(defaultValue.type);
    if (defaultValue.type !== DiaDiemSinhHoatEnums.Khac) return;
    setTmpDiaDiemKhacValue(defaultValue.value.value);
  }, [defaultValue]);

  useAsyncEffect(async () => {
    if (loaiDiaDiemSinhHoat !== DiaDiemSinhHoatEnums.DiemHenBiMat) {
      setDiaDiemSinhHoatOptions([]);
      return;
    }

    try {
      setLoading(true);
      const res = await DiemHenBiMatApi.getDanhSachDiemHenTheoCanBoDangNhap();

      setDiaDiemSinhHoatOptions(
        res.data.map((item) => ({
          type: loaiDiaDiemSinhHoat,
          value: {
            value: item.id || '',
            label: item.tenDiemHen
          },
          data: item
        }))
      );
    } catch (_) {
      //
    } finally {
      setLoading(false);
    }
  }, [loaiDiaDiemSinhHoat]);

  function handleSoDangKySearch(searchValue: string) {
    if (loaiDiaDiemSinhHoat === DiaDiemSinhHoatEnums.Khac) {
      return;
    }
    fetchThongTinDiaDiemSinhHoat({ searchValue: searchValue || '' });
  }

  function handleDiaDiemKhacChange(e: ChangeEvent<HTMLInputElement>) {
    setTmpDiaDiemKhacValue(e.target.value);
  }

  async function fetchThongTinDiaDiemSinhHoat(params: { searchValue: string }) {
    if (!params?.searchValue) return;
    try {
      setLoading(true);
      if (loaiDiaDiemSinhHoat === DiaDiemSinhHoatEnums.HopThuBiMat) {
        const res = await HoSoApi.getDanhSachHoSoBySoDangKy({
          soDangKy: params.searchValue,
          loaiHoSo: PhanHeHoSoEnums.HopThuBiMat
        });
        setDiaDiemSinhHoatOptions(
          res.data.map((item) => ({
            type: loaiDiaDiemSinhHoat,
            value: {
              value: item.id,
              label: item.soDangKy
            },
            data: item
          }))
        );
        return;
      }

      if (loaiDiaDiemSinhHoat === DiaDiemSinhHoatEnums.NhaAnToan) {
        const res = await HoSoApi.getDanhSachHoSoBySoDangKy({
          soDangKy: params.searchValue,
          loaiHoSo: PhanHeHoSoEnums.NhaAnToan
        });
        setDiaDiemSinhHoatOptions(
          res.data.map((item) => ({
            type: loaiDiaDiemSinhHoat,
            value: {
              value: item.id || '',
              label: item.soDangKy || ''
            },
            data: item
          }))
        );
        return;
      }
    } catch (_) {
      //
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col gap-1 p-2 rounded shadow-inner'>
      {/* <Select
        placeholder='Chọn loại địa điểm sinh hoạt'
        options={Object.values(constantsDiaDiemSinhHoatOptions)}
        value={loaiDiaDiemSinhHoat as any}
        onChange={handleLoaiDiaDiemSinhHoatChange}
        open
        style={{ width: '170px' }}
      /> */}

      <Radio.Group
        onChange={handleLoaiDiaDiemSinhHoatChange}
        value={loaiDiaDiemSinhHoat as any}
        options={Object.values(constantsDiaDiemSinhHoatOptions)}
      />

      {loaiDiaDiemSinhHoat === DiaDiemSinhHoatEnums.Khac ? (
        <div className='flex gap-2'>
          <Input
            value={tmpDiaDiemKhacValue || ''}
            onChange={handleDiaDiemKhacChange}
            style={{ width: '100%' }}
            onPressEnter={() => {
              onChange &&
                onChange({
                  type: loaiDiaDiemSinhHoat,
                  value: {
                    value: tmpDiaDiemKhacValue,
                    label: tmpDiaDiemKhacValue
                  }
                });
            }}
          />
          <Button
            type='primary'
            onClick={() => {
              onChange &&
                onChange({
                  type: loaiDiaDiemSinhHoat,
                  value: {
                    value: tmpDiaDiemKhacValue,
                    label: tmpDiaDiemKhacValue
                  }
                });
            }}
          >
            Lưu
          </Button>
        </div>
      ) : (
        <Select
          loading={loading}
          placeholder='Nhập số đăng ký'
          labelInValue
          showSearch
          open
          filterOption={false}
          value={value?.value || ''}
          options={diaDiemSinhHoatOptions.map((item) => ({
            value: item.value.value,
            label: item.value.label,
            option: item.data
          }))}
          optionRender={(opt) => {
            const option = opt?.data?.option;
            return (
              <div>
                <Typography.Text strong>{option.soDangKy && `SĐK: ${option.soDangKy}`}</Typography.Text>
                <div>{option.tenCbQuanLy && <TextTooltip>Cán bộ quản lý: {option.tenCbQuanLy}</TextTooltip>}</div>
                <div>
                  {option.ngayDangKy && <TextTooltip>Ngày đăng ký: {formatDate(option.ngayDangKy)}</TextTooltip>}
                </div>
                <Typography.Text strong>{option.tenDiemHen && `Điểm hẹn: ${option.tenDiemHen}`}</Typography.Text>
              </div>
            );
          }}
          onSearch={debounce((e) => handleSoDangKySearch(e), 500)}
          onSelect={(_, option) => {
            onChange &&
              onChange({
                type: loaiDiaDiemSinhHoat,
                value: {
                  value: (option.value || '') as string,
                  label: (option.label || '') as string
                }
              });
          }}
          style={{ width: '100%', maxWidth: '500px' }}
        ></Select>
      )}
    </div>
  );
}
