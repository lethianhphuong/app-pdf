import { useMemo } from 'react';
import { Col, Form, Row } from 'antd';
import { filterTinhSauSapNhap } from './helper';
import { CompDiaChiProps } from './type';
import { Input, Select } from '@/components/Atoms';
import { DEFAULT_QUOC_GIA, DanhMucEnums, DiaDiemEnums } from '@/constants';
import { useDanhMuc } from '@/hooks';
import { useGetCommon } from '@/hooks/business/useGetCommon';
import { DanhMucApi } from '@/service/API';

const CompDiaChi: React.FC<CompDiaChiProps> = ({ basePath, ...props }) => {
  const { labelSoNha, suDungDiaChiCu } = props;
  const form = Form.useFormInstance();

  const [danhMucQuocGia, danhmucThanhPho] = useDanhMuc([DanhMucEnums.QuocTich, DanhMucEnums.ThanhPho]);

  const danhMucTinhSauSapNhap = useMemo(() => {
    return filterTinhSauSapNhap((danhmucThanhPho as DanhMucApi.DanhMucDiaDiem[]) || []);
  }, [danhmucThanhPho]);

  const tinh = Form.useWatch([...basePath, 'tinh'], form);
  const tinhCu = Form.useWatch([...basePath, 'tinhCu'], form);
  const huyenCu = Form.useWatch([...basePath, 'huyenCu'], form);

  const {
    data: danhMucHuyen,
    isLoading: isLoadingHuyen,
    isFetching: isFetchingHuyen
  } = useGetCommon({
    key: DiaDiemEnums.QuanHuyen,
    params: {
      provinceCode: tinhCu?.value
    },
    options: {
      enabled: !!tinhCu?.value,
      keepPreviousData: true
    }
  });
  const {
    data: danhMucXaCu,
    isLoading: isLoadingXaCu,
    isFetching: isFetchingXaCu
  } = useGetCommon({
    key: DiaDiemEnums.XaPhuong,
    params: {
      provinceCode: huyenCu?.value
    },
    options: {
      enabled: !!huyenCu?.value,
      keepPreviousData: true
    }
  });
  const {
    data: danhMucXaMoi,
    isLoading: isLoadingXaMoi,
    isFetching: isFetchingXaMoi
  } = useGetCommon({
    key: DiaDiemEnums.XaPhuong,
    params: {
      provinceCode: tinh?.value,
      date: '2025-07-06'
    },
    options: {
      enabled: !!tinh?.value,
      keepPreviousData: true
    }
  });

  const spanConfig = useMemo(() => {
    const config = {
      quocGia: { span: 4 },
      quocGiaCu: { span: 0 },
      tinh: { span: 6 },
      tinhCu: { span: 0 },
      huyenCu: { span: 0 },
      xa: { span: 6 },
      xaCu: { span: 0 },
      soNha: { span: 8 },
      soNhaCu: { span: 0 }
    };

    if (suDungDiaChiCu) {
      return {
        quocGia: { span: 0 },
        quocGiaCu: { span: 4 },
        tinh: { span: 0 },
        tinhCu: { span: 4 },
        huyenCu: { span: 4 },
        xa: { span: 0 },
        xaCu: { span: 4 },
        soNha: { span: 0 },
        soNhaCu: { flex: 1 }
      };
    }

    return config;
  }, [suDungDiaChiCu]);

  return (
    <Row gutter={[8, 8]}>
      {/* SỐ NHÀ */}
      <Col {...spanConfig.soNha}>
        <Input autoTrim label={labelSoNha || 'Chi tiết địa điểm'} name={[...basePath, 'soNha']} />
      </Col>
      <Col {...spanConfig.soNhaCu}>
        <Input autoTrim label={labelSoNha || 'Chi tiết địa điểm'} name={[...basePath, 'soNhaCu']} />
      </Col>

      {/* TỈNH */}

      <Col {...spanConfig.xa}>
        <Select
          loading={isLoadingXaMoi || isFetchingXaMoi}
          label='Phường/Xã'
          name={[...basePath, 'xa']}
          showSearch
          labelInValue
          options={danhMucXaMoi?.list?.map((item: { [key: string]: any }) => ({ label: item.name, value: item.code }))}
        />
      </Col>
      <Col {...spanConfig.xaCu}>
        <Select
          loading={isLoadingXaCu || isFetchingXaCu}
          label='Phường/Xã cũ'
          name={[...basePath, 'xaCu']}
          showSearch
          labelInValue
          options={danhMucXaCu?.list?.map((item: { [key: string]: any }) => ({ label: item.name, value: item.code }))}
        />
      </Col>

      {/* HUYỆN */}
      <Col {...spanConfig.huyenCu}>
        <Select
          loading={isFetchingHuyen || isLoadingHuyen}
          label='Quận/Huyện cũ'
          name={[...basePath, 'huyenCu']}
          showSearch
          labelInValue
          options={danhMucHuyen?.list?.map((item: { [key: string]: any }) => ({ label: item.name, value: item.code }))}
        />
      </Col>

      {/* TỈNH */}

      <Col {...spanConfig.tinh}>
        <Select
          label='Tỉnh/TP'
          name={[...basePath, 'tinh']}
          showSearch
          labelInValue
          options={danhMucTinhSauSapNhap.map((item) => ({ label: item.name, value: item.code }))}
        />
      </Col>
      <Col {...spanConfig.tinhCu}>
        <Select
          label='Tỉnh/TP cũ'
          name={[...basePath, 'tinhCu']}
          showSearch
          labelInValue
          options={danhmucThanhPho.map((item) => ({ label: item.name, value: item.code }))}
        />
      </Col>

      {/* QUỐC GIA */}
      <Col {...spanConfig.quocGia}>
        <Select
          label='Quốc tịch'
          name={[...basePath, 'quocGia']}
          showSearch
          labelInValue
          options={danhMucQuocGia.map((item) => ({ label: item.name, value: item.code }))}
          initialValue={DEFAULT_QUOC_GIA}
        />
      </Col>
      <Col {...spanConfig.quocGiaCu}>
        <Select
          label='Quốc tịch cũ'
          name={[...basePath, 'quocGiaCu']}
          showSearch
          labelInValue
          options={danhMucQuocGia.map((item) => ({ label: item.name, value: item.code }))}
          initialValue={DEFAULT_QUOC_GIA}
        />
      </Col>
    </Row>
  );
};

export default CompDiaChi;
