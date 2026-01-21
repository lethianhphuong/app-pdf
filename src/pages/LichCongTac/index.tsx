import { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { L10n, loadCldr, setCulture } from '@syncfusion/ej2-base';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import viGregorian from '@syncfusion/ej2-cldr-data/main/vi/ca-gregorian.json';
import viNumberData from '@syncfusion/ej2-cldr-data/main/vi/numbers.json';
import vitimeZoneData from '@syncfusion/ej2-cldr-data/main/vi/timeZoneNames.json';
import viNumberingSystem from '@syncfusion/ej2-cldr-data/supplemental/numberingSystems.json';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import {
  ActionEventArgs,
  Agenda,
  Day,
  DragAndDrop,
  EventSettingsModel,
  Inject,
  Month,
  Resize,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Week,
  WorkWeek
} from '@syncfusion/ej2-react-schedule';
import '@syncfusion/ej2-react-schedule/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
// import { nanoid } from 'nanoid';
import ModalEventAdd from './components/ModalEventAdd';
import ModalEventEdit from './components/ModalEventEdit';
import ScheduleFilter from './components/ScheduleFilter';
import { convertScheduleEventToSuKien, convertSuKienToScheduleEvent } from './helper';
import { ScheduleEvent } from './types';
import { Button, Container } from '@/components/Atoms';
import { useDrawer } from '@/hooks/common/useDrawer';
import { vi } from '@/locale/vi';
import { SuKienApi } from '@/service/API';

L10n.load({ vi });

setCulture('vi');

loadCldr(viNumberData, vitimeZoneData, viGregorian, viNumberingSystem);

const getCurrentDates = (dates: string[]) => {
  let startDt = null;
  let endDt = null;

  if (dates.length === 1) {
    startDt = dayjs(dates[0]).startOf('day');
    endDt = dayjs(dates[0]).endOf('day');
  } else {
    startDt = dayjs(dates[0]);
    endDt = dayjs(dates[dates.length - 1]);
  }

  return [startDt, endDt];
};

const LichCongTac = () => {
  const [eventSettings, setEventSettings] = useState<EventSettingsModel>({ dataSource: [] });
  const scheduleRef = useRef(null);
  // const [key, setKey] = useState(nanoid(12));

  const [searchParams, setSearchParams] = useState<SuKienApi.ParamsSuKien>({
    ngayBatDau: dayjs().startOf('month').toISOString(),
    ngayKetThuc: dayjs().startOf('month').add(35, 'day').endOf('day').toISOString(),
    idDanhMucs: []
  });

  const { ref$: refAdd$, open: openAdd } = useDrawer<any>();
  const { ref$: refDetail$, open: openDetail } = useDrawer<any>();

  useEffect(() => {
    getDanhSachSuKien();
  }, [searchParams]);

  const getDanhSachSuKien = async () => {
    try {
      if (!searchParams.ngayBatDau || !searchParams.ngayKetThuc) return;

      const res = await SuKienApi.getDanhSachSuKien(searchParams);

      const danhSachSuKienCurrent = res.data.map((item) => convertSuKienToScheduleEvent(item));
      setEventSettings({ dataSource: danhSachSuKienCurrent });
    } catch (_) {
      //
    } finally {
      //
    }
  };

  const handleSuKienAction = async ({ changedRecords, name, requestType }: ActionEventArgs) => {
    if (name !== 'actionComplete') return;

    if (requestType === 'dateNavigate') {
      const [startDt, endDt] = getCurrentDates((scheduleRef.current as any)?.activeView?.renderDates);
      if (!startDt.diff(searchParams.ngayBatDau) || !endDt.diff(searchParams.ngayKetThuc)) return;
      setSearchParams((prev) => ({
        ...prev,
        ngayBatDau: startDt.startOf('day').toISOString(),
        ngayKetThuc: endDt.endOf('day').toISOString()
      }));
      return;
    }

    if (requestType === 'eventCreated') {
      // logic here
      return;
    }

    if (requestType === 'eventRemoved') {
      // logic here
      return;
    }

    if (requestType === 'eventChanged') {
      if (!changedRecords) return;

      const changedSuKien = convertScheduleEventToSuKien(changedRecords[0] as ScheduleEvent);
      await SuKienApi.chinhSuaSuKien(changedSuKien.idSuKien, changedSuKien);
      await getDanhSachSuKien();
      return;
    }
  };

  const handleModalOpen = (values: any) => {
    if (!values.data || values.name !== 'select') return;

    if (values.requestType === 'cellSelect') {
      openAdd({ startTime: values.data.StartTime, endTime: values.data.EndTime, isAllDay: values.data.IsAllDay });
      return;
    }

    if (values.requestType === 'eventSelect') {
      openDetail({ data: values.data });
      return;
    }
  };

  return (
    <Container>
      <div className='flex flex-col gap-2 h-full'>
        <Row className='flex-1' style={{ maxHeight: '100%' }}>
          <Col className='h-full overflow-auto' span={4}>
            <div className='h-full flex flex-col'>
              <div className='flex-1 mx-2'>
                <ScheduleFilter
                  onChange={(values: string[]) => {
                    setSearchParams((prev) => ({ ...prev, idDanhMucs: values }));
                  }}
                />
              </div>
              <div className='text-center my-2'>
                <Button
                  type='primary'
                  icon={<PlusOutlined style={{ fontSize: '14px' }} />}
                  onClick={() => {
                    openAdd();
                  }}
                >
                  Thêm sự kiện
                </Button>
              </div>
            </div>
          </Col>
          <Col className='h-full overflow-auto' span={20}>
            <ScheduleComponent
              delayUpdate
              width='100%'
              height='100%'
              enableAllDayScroll
              enableRecurrenceValidation={false}
              enablePersistence={false}
              ref={scheduleRef}
              actionComplete={(record) => {
                handleSuKienAction(record);
              }}
              immediateRender={true}
              eventSettings={eventSettings}
              showQuickInfo={false}
              select={(props) => {
                handleModalOpen(props);
              }}
              currentView={'Month'}
            >
              <ViewsDirective>
                <ViewDirective option='Day' />
                <ViewDirective option='Week' />
                <ViewDirective option='WorkWeek' />
                <ViewDirective option='Month' />
                <ViewDirective option='Agenda' />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]} />
            </ScheduleComponent>
          </Col>
        </Row>
      </div>
      <ModalEventAdd
        ref$={refAdd$}
        onSuccess={async () => {
          await getDanhSachSuKien();
        }}
      />
      <ModalEventEdit
        ref$={refDetail$}
        onSuccess={async () => {
          await getDanhSachSuKien();
        }}
      />
    </Container>
  );
};
export default LichCongTac;
