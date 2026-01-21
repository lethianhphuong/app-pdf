import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { omit } from 'lodash';
import { useNavigate } from 'react-router-dom';
import SearchBox, { FormTimKiemValues } from './components/FormTimKiem';
import { DsVuAnFormValues } from './types';
import { Container, ProTable, ProTableColumn, TextTooltip } from '@/components/Atoms';
import { RouterUrl } from '@/constants/business/enums';
import { DEFAULT_PAGE_PARAMS } from '@/constants/common/const';
import { VuAnApi } from '@/service/API';
import { DsVuAnRequest, DsVuAnRequest_Schema, VuAnResponse } from '@/service/API/vu-an/types';
import { getStartAndEndDateIsoFromDateRangeV2 } from '@/utilities/date';
import { omitNil } from '@/utilities/object';
import { getColumnIndex } from '@/utilities/table';

function DanhSachVuAn() {
  //#region Contructor
  const navigate = useNavigate();
  const [params, setParams] = useState<DsVuAnRequest>({
    isDsVuViecVuAn: true,
    ...DEFAULT_PAGE_PARAMS
  });
  const [dataTable, setDataTable] = useState<VuAnResponse[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const columns: ProTableColumn<VuAnResponse>[] = [
    getColumnIndex(params),
    {
      title: 'Mã số VAHS',
      dataIndex: 'maVuAn',
      width: 130,
      render(value, record, _index) {
        return (
          <TextTooltip ellipsis={{ tooltip: { title: value } }}>
            <Typography.Link onClick={() => onOpenDetail(record?.id)}>{value}</Typography.Link>
          </TextTooltip>
        );
      }
    },
    {
      title: 'Tên vụ án',
      dataIndex: 'tenVuAn',
      width: 400,
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Thời gian, địa điểm',
      dataIndex: 'diaDiemXayRa',
      width: 200,
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Hạn xử lý',
      dataIndex: 'hanXuLy',
      width: 150,
      align: 'center',
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'QĐ khởi tố',
      dataIndex: 'soQuyetDinhKhoiTo',
      width: 160,
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Ngày khởi tố',
      dataIndex: 'ngayKhoiTo',
      width: 120,
      align: 'center',
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThaiStr',
      width: 120,
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Tình trạng',
      dataIndex: 'tinhTrangStr',
      width: 120,
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Người tạo',
      dataIndex: 'nguoiTao',
      width: 140,
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    }
  ];
  //#endregion

  //#region Function

  //#region onSearch
  function onSearch(data: FormTimKiemValues<DsVuAnFormValues>) {
    data.isDsVuViecVuAn = true;
    data.keySearch = data.tuKhoaTimKiem;
    data.trangThai = data.listTrangThaiStr?.split('-');
    const [ngayTaoTu, ngayTaoDen] = data.ngayLap ? getStartAndEndDateIsoFromDateRangeV2(data.ngayLap) : [];

    const searchParams = omitNil({
      ...params,
      ...omit(data),
      ngayTaoTu,
      ngayTaoDen
    });

    fetchDsVuAn(searchParams);
  }

  async function fetchDsVuAn(searchParams: DsVuAnRequest) {
    try {
      setLoading(true);

      setParams(searchParams);
      console.log('fetchDsVuAn', searchParams);
      const res = await VuAnApi.getListVuAn(DsVuAnRequest_Schema.parse(searchParams));
      setDataTable(res?.data?.content);
      setTotal(res?.data?.totalElements);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  //#endregion

  //#region Detail
  function onOpenDetail(id?: string) {
    console.log('onOpenDetail', id);
    navigate(`/${RouterUrl.DienBienVuAn}?id=${id}`);
  }
  //#endregion

  //#endregion

  //#region onChange
  useEffect(() => {
    fetchDsVuAn(params);
  }, []);
  //#endregion

  return (
    <Container loading={loading}>
      <div className='flex flex-col gap-2 h-full'>
        <SearchBox<DsVuAnFormValues> onSearch={onSearch} />
        <div className='flex-1 overflow-auto'>
          <ProTable
            columns={columns}
            dataSource={dataTable}
            onChange={(pagination) => {
              const newParams = {
                ...params,
                page: pagination.current || params.page,
                size: pagination.pageSize || params.size,
                sort: DEFAULT_PAGE_PARAMS.sort
              };
              fetchDsVuAn(newParams);
            }}
            pagination={{
              total: total,
              current: params?.page,
              pageSize: params?.size
            }}
          />
        </div>
      </div>
    </Container>
  );
}

export default DanhSachVuAn;
