import { useEffect, useState } from 'react';
import { TableColumnsType } from 'antd';
import { omit } from 'lodash';
import FormAdvancedSearch from './components/FormAdvancedSearch';
import { columns as columnConfig } from './config';
import { NotificationParams } from './types';
import { Container, FlexTable } from '@/components/Atoms';
import SearchBox, { FormSearchBox } from '@/components/Business/SearchBox';
import { NotificationApi } from '@/service/API';
import { getStartAndEndDateIsoFromDateRange } from '@/utilities/date';
import { PAGE_SIZE } from '@/utilities/pagination';
import { getColumnIndex } from '@/utilities/table';

const Notification = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [params, setParams] = useState<NotificationApi.SearchNotificationParams>({ page: 1, size: PAGE_SIZE });
  const [dsNotification, setDsNotification] = useState<NotificationApi.Notification[]>();
  const [total, setTotal] = useState<number>(0);

  const columns: TableColumnsType<NotificationApi.Notification> = [getColumnIndex(params), ...columnConfig];

  async function fetchDsNotification(newParams: NotificationApi.SearchNotificationParams) {
    try {
      setLoading(true);
      setParams(newParams);
      const res = await NotificationApi.getNotifications({ ...newParams, page: Math.max(newParams.page - 1, 0) });
      setDsNotification(res.data.list);
      setTotal(res.data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDsNotification(params);
  }, []);

  function handleSearch(data: FormSearchBox<NotificationParams>) {
    const { size } = params;
    const [startDate, endDate] = data?.date ? getStartAndEndDateIsoFromDateRange(data.date) : [];
    const newValue = { ...omit(data, ['date']), startDate, endDate, size };
    fetchDsNotification(newValue);
  }

  return (
    <Container loading={loading}>
      <div className='flex flex-col gap-2 h-full'>
        <SearchBox<NotificationParams> onSearch={handleSearch}>
          <FormAdvancedSearch />
        </SearchBox>
        {/* <div>
          <Tabs
            defaultActiveKey='1'
            type='card'
            tabBarStyle={{ marginBottom: 0 }}
            items={[
              {
                label: `Thông báo`,
                key: 'thong-bao'
              },
              {
                label: `Cảnh báo`,
                key: 'canh-bao'
              }
            ]}
          />
        </div> */}
        <div className='flex-1 overflow-auto'>
          <FlexTable
            dataSource={dsNotification}
            columns={columns}
            pagination={{
              current: params.page,
              pageSize: params.size,
              total: total,
              onChange(page, size) {
                fetchDsNotification({ ...params, page, size });
              }
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Notification;
