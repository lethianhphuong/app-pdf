import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Typography } from 'antd';
import { omit } from 'lodash';
import ConNguoiDialog from '../ConNguoi/ConNguoiDialog';
import FormAdvancedSearch from '../components/FormAdvancedSearch';
import { Container, ProTable, ProTableColumn, TextTooltip } from '@/components/Atoms';
import SearchBox, { FormSearchBox } from '@/components/Business/SearchBox';
import { DEFAULT_PAGE_PARAMS, LoaiDiaChi } from '@/constants';
import { getListConNguoi, getListConNguoiTraCuu } from '@/service/API/con-nguoi';
import { ConNguoi, ConNguoiDs, DataResResponse, DsConNguoiPrams } from '@/service/API/con-nguoi/types';
import { converDiaChi } from '@/utilities/common';
import { getStartAndEndDateIsoFromDateRangeV2 } from '@/utilities/date';
import { omitNil } from '@/utilities/object';
import { getColumnIndex } from '@/utilities/table';

function convertResConNguoi(dsCoNnguoi: ConNguoiDs[]) {
  return dsCoNnguoi.map((item: ConNguoiDs) => {
    const findDiaChi = (item.diaChi || []).find((x) => x.loaiDiaChi == LoaiDiaChi.THUONGTRU);

    const dataNew = {
      ...item,
      ngaySinh_cv: item.ngaySinhGoc || item.ngaySinh,
      diaChiThuongTru_cv: findDiaChi && converDiaChi(findDiaChi)
    };

    return dataNew as ConNguoiDs;
  });
}

type typeShowModal = {
  show: boolean;
  id: string | undefined;
};

function DS_ConNguoi() {
  const [showModal, setShowModal] = useState<typeShowModal>({
    show: false,
    id: ''
  });
  const [params, setParams] = useState<DsConNguoiPrams>({
    ...DEFAULT_PAGE_PARAMS,
    sort: ['ngaySua,desc']
  });
  const [dataDisplay, setDataDisplay] = useState<DataResResponse>({
    total: 0,
    data: []
  });

  const { mutate: mutationSearch, isPending } = useMutation({
    mutationFn: (dataRequest: DsConNguoiPrams): Promise<any> => {
      const filterParams = Object.keys(dataRequest).filter((x) => !['sort', 'size', 'page'].includes(x));
      if (filterParams.length) {
        return getListConNguoiTraCuu(dataRequest);
      }
      return getListConNguoi(dataRequest);
    },
    onSuccess: (res: any) => {
      if (res) {
        setDataDisplay({
          total: res.totalElements,
          data: convertResConNguoi(res.content || [])
        });
      }
    }
  });

  const columns: ProTableColumn<ConNguoi>[] = [
    getColumnIndex(params),
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      width: 180,
      render(value, record, _index) {
        return (
          <TextTooltip
            ellipsis={{ tooltip: { title: value } }}
            onClick={() => {
              setShowModal({
                show: true,
                id: record.id
              });
            }}
          >
            <Typography.Link>{value}</Typography.Link>
          </TextTooltip>
        );
      }
    },
    {
      title: 'CCCD/CMT',
      dataIndex: 'soCccd',
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Số hộ chiếu',
      dataIndex: 'soHoChieu',
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngaySinh_cv',
      align: 'center',
      width: 150,
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioiTinh',
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Địa chỉ thường trú',
      dataIndex: 'diaChiThuongTru_cv',
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDienThoai',
      render(value) {
        return <TextTooltip>{value}</TextTooltip>;
      }
    }
  ];

  useEffect(() => {
    loadListConNguoi(params);
  }, []);

  const handleSearch = function (dataForm: FormSearchBox<DsConNguoiPrams>) {
    const [ngaySinhTu, ngaySinhDen] = dataForm.ngaySinh ? getStartAndEndDateIsoFromDateRangeV2(dataForm.ngaySinh) : [],
      keySearch = dataForm.tuKhoaTimKiem;

    const newData = omitNil({
      ...params,
      ...omit(dataForm, ['ngaySinh', 'tuKhoaTimKiem']),
      ngaySinhTu,
      ngaySinhDen,
      keySearch
    });

    loadListConNguoi(newData);
  };

  const loadListConNguoi = function (dataSearch: DsConNguoiPrams) {
    setParams(dataSearch);
    mutationSearch({
      ...dataSearch
    });
  };

  const onChangePage = useCallback(
    (page: number, size: number) => {
      const newPageSize = {
        ...params,
        page: page,
        size: size
      };
      loadListConNguoi(newPageSize);
    },
    [params]
  );

  const handleClose = () => {
    setShowModal({
      show: false,
      id: ''
    });
  };

  return (
    <Container loading={isPending}>
      <div className='flex flex-col gap-2 h-full'>
        <SearchBox<DsConNguoiPrams>
          textButtonAdd='Thêm mới'
          onOpenAdd={() =>
            setShowModal({
              show: true,
              id: ''
            })
          }
          onSearch={handleSearch}
        >
          <FormAdvancedSearch />
        </SearchBox>
        <div className='flex-1 overflow-auto'>
          <ProTable
            columns={columns}
            dataSource={dataDisplay?.data}
            onChange={(pagination) => {
              onChangePage(pagination.current, pagination.pageSize);
            }}
            pagination={{
              total: dataDisplay?.total,
              current: params.page,
              pageSize: params.size
            }}
          />
        </div>

        {showModal.show && <ConNguoiDialog close={handleClose} visible={showModal.show} idConNguoi={showModal?.id} />}
      </div>
    </Container>
  );
}

export default DS_ConNguoi;
