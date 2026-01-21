import { Reducer, useEffect, useReducer, useRef, useState } from 'react';
import CaretDownOutlined from '@ant-design/icons/lib/icons/CaretDownOutlined';
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined';
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';
import { RefSelectProps, Select, Spin } from 'antd';
import { debounce, get } from 'lodash';
import { BaseInfiniteSelectProps, InfiniteSelectAction, InfiniteSelectState } from './types';
import { omitNil } from '@/utilities/object';
import { PAGE_SIZE, getTotalPages } from '@/utilities/pagination';

const initialState: InfiniteSelectState = {
  page: 0,
  searchValue: undefined,
  options: [],
  totalPages: 0
};

const initConfig = {
  source: 'data.list',
  valueField: 'id',
  labelField: 'name',
  totalField: 'data.total',
  labelDetailField: 'data.name',
  valueDetailField: 'data.id'
};
function reducer(state: InfiniteSelectState, action: InfiniteSelectAction): InfiniteSelectState {
  const { payload, type } = action;
  switch (type) {
    case 'INIT': {
      return {
        ...state,
        ...(payload.options && { options: payload.options })
      };
    }
    case 'FETCH': {
      return {
        ...state,
        ...(payload.totalPages && { totalPages: payload.totalPages })
      };
    }
    case 'FETCH_MORE': {
      return {
        ...state,
        page: state.page + 1,
        ...(payload.options && { options: payload.options })
      };
    }
    case 'SEARCH_VALUE': {
      return {
        ...state,
        page: 0,
        searchValue: payload.searchValue,
        ...(payload.options && { options: payload.options })
      };
    }
    case 'GET_DETAIL': {
      return {
        ...state,
        page: 0,
        totalPages: 0,
        ...(payload.options && { options: payload.options })
      };
    }
    case 'RESET': {
      return {
        ...state,
        page: 0,
        searchValue: undefined,
        ...(payload.options && { options: payload.options })
      };
    }
    default: {
      return {
        ...initialState
      };
    }
  }
}

const mapDataToOptions = (dataSource: any[], labelField: string, valueField: string) => {
  return dataSource.map((item: any) => ({
    label: item[labelField],
    value: item[valueField],
    fullData: item
  }));
};

export const AntInfiniteSelect: React.FC<BaseInfiniteSelectProps> = ({
  config = { ...initConfig },
  defaultValue,
  listFn,
  detailFn,
  clearIconSize = 18,
  ...rest
}) => {
  const [state, dispatch] = useReducer<Reducer<InfiniteSelectState, InfiniteSelectAction>>(reducer, {
    ...initialState,
    value: defaultValue
  });

  const {
    labelField: currentLabelField,
    source: currentSource,
    totalField: currentTotalField,
    valueField: currentValueField,
    labelDetailField: currentLabelDetailField,
    valueDetailField: currentValueDetailField
  } = config;

  const labelField = currentLabelField ?? initConfig.labelField;
  const source = currentSource ?? initConfig.source;
  const totalField = currentTotalField ?? initConfig.totalField;
  const valueField = currentValueField ?? initConfig.valueField;
  const labelDetailField = currentLabelDetailField ?? initConfig.labelDetailField;
  const valueDetailField = currentValueDetailField ?? initConfig.valueDetailField;

  const { value, options, page, totalPages, searchValue } = state;
  const [loading, setLoading] = useState(false);
  const selectRef = useRef<RefSelectProps>(null);
  useEffect(() => {
    if (value) {
      getDetail(value);
      return;
    }
    if (options.length) return;
    const initData = async () => {
      const res = await fetchData({ pg: 0 });
      if (!res) return;
      dispatch({
        type: 'INIT',
        payload: {
          options: mapDataToOptions(get(res, source), labelField, valueField)
        }
      });
    };
    initData();
  }, []);

  const fetchMore = async (target: HTMLElement) => {
    if (target.scrollTop + target.offsetHeight < target.scrollHeight) return;

    if (totalPages === page + 1) return;

    setLoading(true);

    const res = await fetchData({ pg: page + 1, keySearch: searchValue });
    if (!res) return;
    dispatch({
      type: 'FETCH_MORE',
      payload: {
        options: [...state.options, ...mapDataToOptions(get(res, source), labelField, valueField)]
      }
    });
    setLoading(false);
  };

  const handleSearch = debounce(async (query: string) => {
    const res = await fetchData({ pg: 0, keySearch: query });

    if (!res) return;

    const opts = mapDataToOptions(get(res, source), labelField, valueField);
    dispatch({
      type: 'SEARCH_VALUE',
      payload: {
        searchValue: query,
        options: opts
      }
    });

    opts?.[0]?.value && selectRef.current?.scrollTo({ key: opts?.[0]?.value, align: 'top', offset: 0 });
  }, 1000);

  const getDetail = async (id: string) => {
    if (!detailFn) return;
    setLoading(true);
    const res = await detailFn(id);
    if (!res) return;
    dispatch({
      type: 'GET_DETAIL',
      payload: {
        options: [{ label: get(res, labelDetailField), value: get(res, valueDetailField) }]
      }
    });
    setLoading(false);
    return res;
  };

  const fetchData = async ({ pg, keySearch }: { pg: number; keySearch?: string }) => {
    try {
      setLoading(true);
      const res = await listFn(
        omitNil({
          page: pg,
          size: PAGE_SIZE,
          keySearch: keySearch
        })
      );

      if (getTotalPages(get(res, totalField)) === state.totalPages) return res;

      dispatch({
        type: 'FETCH',
        payload: {
          totalPages: getTotalPages(get(res, totalField))
        }
      });
      return res;
    } catch (_) {
      //
    } finally {
      setLoading(false);
    }
    return undefined;
  };

  const reset = async () => {
    const res = await fetchData({ pg: 0 });
    if (!res) return;
    dispatch({
      type: 'RESET',
      payload: {
        options: mapDataToOptions(get(res, source), labelField, valueField)
      }
    });
  };

  const suffixIcon = loading ? (
    <LoadingOutlined style={{ fontSize: clearIconSize }} />
  ) : (
    <CaretDownOutlined
      aria-label='down'
      className='anticon-down ant-select-suffix'
      style={{ fontSize: clearIconSize }}
    />
  );

  return (
    <Select
      ref={selectRef}
      listHeight={200}
      style={{ width: '100%' }}
      notFoundContent={loading ? <Spin size='small' /> : 'Không có dữ liệu'}
      suffixIcon={suffixIcon}
      allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: clearIconSize }} /> }}
      {...rest}
      defaultValue={value}
      showSearch
      filterOption={false} // i need
      loading={loading}
      onPopupScroll={(e) => {
        if (loading) return;
        fetchMore(e.currentTarget);
      }}
      onClear={() => {
        reset();
        rest.onClear && rest.onClear();
      }}
      onSearch={handleSearch}
    >
      {loading && options.length > 0 && (
        <Select.Option>
          <Spin size='small' />
        </Select.Option>
      )}
      {options.map((item) => (
        <Select.Option key={item.value} value={item.value} fullData={item.fullData}>
          {item.label}
        </Select.Option>
      ))}
      {loading && (
        <Select.Option>
          <Spin size='small' />
        </Select.Option>
      )}
    </Select>
  );
};
