import { useState } from 'react';
import { Table, Typography } from 'antd';
import TableCollapseLocal, { CrudColumns, DataTable } from '@/components/Business/TableCollapseLocal';
import { useCaculateTableheight } from '@/hooks/common/useCaculateTableheight';

export default function CollapseDemo() {
  const [value, setValue] = useState<DataTable[]>([
    {
      id: 1,
      ngayMoTap: '2024-04-02T17:00:00.000Z',
      tapSo: 1,
      tuTo: 1,
      denTo: 2,
      trichYeuTap: '1',
      canCuMoThemTap: '1'
    },
    {
      id: 2,
      ngayMoTap: '2024-04-05T17:00:00.000Z',
      tapSo: 1,
      tuTo: 1,
      denTo: 1,
      trichYeuTap: '1',
      canCuMoThemTap: '1'
    },
    {
      id: 3,
      ngayMoTap: '2024-04-03T17:00:00.000Z',
      tapSo: 1,
      tuTo: 1,
      denTo: 1,
      trichYeuTap: '1',
      canCuMoThemTap: '1'
    },
    {
      id: 4,
      ngayMoTap: '2024-04-02T17:00:00.000Z',
      tapSo: 1,
      tuTo: 1,
      denTo: 1,
      trichYeuTap: '1',
      canCuMoThemTap: '1'
    },
    {
      id: 5,
      ngayMoTap: '2024-04-17T17:00:00.000Z',
      tapSo: 1,
      tuTo: 1,
      denTo: 1,
      trichYeuTap: '1',
      canCuMoThemTap: '1'
    },
    { id: 6, ngayMoTap: '2024-04-04T17:00:00.000Z', tapSo: 1, tuTo: 1, denTo: 1, trichYeuTap: '1', canCuMoThemTap: '1' }
  ]);

  const { parentRef, otherElementRef: boxSearchRef, height: tableHeight } = useCaculateTableheight('demo-cl-tbl-props');
  const columns: CrudColumns<DataTable>[] = [
    {
      span: 8,
      type: 'datepicker',
      dataIndex: 'ngayMoTap',
      title: 'Ngày mở tập',
      viewOnTable: false,
      isFormField: true,
      required: true,
      rules: [{ required: true }]
    },
    {
      span: 8,
      type: 'inputnumber',
      dataIndex: 'tapSo',
      title: 'Tập số',
      viewOnTable: true,
      isFormField: true,
      required: true,
      rules: [{ required: true }]
    },
    {
      span: 4,
      type: 'inputnumber',
      dataIndex: 'tuTo',
      title: 'Từ tờ',
      viewOnTable: false,
      isFormField: true
    },
    {
      span: 4,
      type: 'inputnumber',
      dataIndex: 'denTo',
      title: 'Đến tờ',
      viewOnTable: false,
      isFormField: true
    },
    {
      span: 24,
      type: 'textarea',
      dataIndex: 'trichYeuTap',
      title: 'Trích yếu tập',
      viewOnTable: true,
      isFormField: true,
      required: true,
      rules: [{ required: true }]
    },
    {
      span: 24,
      type: 'textarea',
      dataIndex: 'canCuMoThemTap',
      title: 'Căn cứ mở thêm tập',
      viewOnTable: false,
      isFormField: true
    }
  ];

  return (
    <div style={{ height: 'calc(100vh - var(--gt-header-height) - 8px - 3px - 8px - 8px' }} ref={parentRef}>
      <div ref={boxSearchRef} className='mb-2'>
        <TableCollapseLocal
          defaultExpand
          title='Danh sách tập'
          columns={columns}
          onChange={setValue}
          value={value}
          closeOnCreateSuccess={false}
        />
        {/* data: {JSON.stringify(value)} */}
        <Typography.Text strong>API</Typography.Text>
      </div>

      <div id='demo-cl-tbl-props'>
        <Table
          scroll={{ y: tableHeight }}
          columns={[
            { title: 'props (extend TableColumnProps<T>) and more below', dataIndex: 'props' },
            { title: 'type', dataIndex: 'type' },
            { title: 'desc', dataIndex: 'desc' }
          ]}
          dataSource={[
            {
              props: '[columns]viewOnTable',
              type: 'boolean',
              desc: 'show on table as column'
            },
            {
              props: '[columns]isFomField',
              type: 'boolean',
              desc: 'using this field for create and update record'
            },
            {
              props: '[columns]tblColumnOrder',
              type: 'number',
              desc: 'ordering column by this order'
            },
            {
              props: '[columns]type',
              type: 'datepicker | inputnumber | textarea | input | select | custom',
              desc: 'type of form field, if custom you must using customFormField'
            },
            {
              props: '[columns]span',
              type: 'number',
              desc: 'layout form, it is span of form item'
            },
            {
              props: '[columns]rules',
              type: 'array',
              desc: 'rules of form'
            },
            {
              props: '[columns]require',
              type: 'boolean',
              desc: 'show require sign on label'
            },
            {
              props: 'defaultExpand',
              type: 'boolean',
              desc: 'auto expand when first render'
            },
            {
              props: 'closeOnCreateSuccess',
              type: 'boolean',
              desc: 'close or reset and keep showing modal when create record success'
            },
            {
              props: 'tableActions',
              type: 'CREATE | READ | UPDATE | REMOVE',
              desc: 'define crud actions'
            }
          ]}
        />
      </div>
    </div>
  );
}
