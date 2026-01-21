import { ReactNode, useMemo, useState } from 'react';
import { Col, Descriptions, Flex, Form, FormRule, Modal, ModalProps, Row, TableColumnProps } from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import {
  BaseTableProps,
  Button,
  Collapse,
  DatePicker,
  FormItemWrapper,
  Input,
  InputNumber,
  Select,
  Table,
  TableAction,
  Textarea
} from '@/components/Atoms';
import { formatDateTime } from '@/utilities/date';

export interface DataTable {
  [x: string]: any;
}

export type FormFieldType = 'datepicker' | 'inputnumber' | 'textarea' | 'input' | 'select' | 'custom';

export interface CrudColumns<T> extends TableColumnProps<T> {
  viewOnTable: boolean;
  isFormField: boolean;
  type?: FormFieldType;
  customFormField?: ReactNode;
  span?: number;
  rules?: FormRule[];
  required?: boolean;
}

export interface TableCollapseLocalProps {
  columns: CrudColumns<DataTable>[];
  value: DataTable[];
  onChange: (values: DataTable[]) => void;
  tblProps?: BaseTableProps;
  popupProps?: ModalProps;
  title: string;
  defaultExpand?: boolean;
  tableActions?: TableActionType[];
  closeOnCreateSuccess?: boolean;
}

export interface FormSchema<T>
  extends Pick<CrudColumns<T>, 'type' | 'span' | 'required' | 'rules' | 'dataIndex' | 'title' | 'customFormField'> {}

const FormItemRenderer = ({ type, ...props }: any) => {
  const getFormItemByType = useMemo(() => {
    switch (type) {
      case 'datepicker':
        return <DatePicker {...props} />;
      case 'inputnumber':
        return <InputNumber {...props} />;
      case 'textarea':
        return <Textarea {...props} rows={1} />;
      case 'input':
        return <Input {...props} />;
      case 'select':
        return <Select {...props} />;
      case 'custom':
        return <FormItemWrapper {...props}>{props.customFormField}</FormItemWrapper>;
      default:
        return undefined;
    }
  }, [type]);

  return getFormItemByType;
};

const FormGenerator = ({ schema }: { schema: FormSchema<DataTable>[] }) => {
  return (
    <Row gutter={[16, 16]}>
      {schema.map((item, index) => (
        <Col span={item.span} key={index}>
          <FormItemRenderer
            type={item.type}
            label={item.title}
            name={item.dataIndex}
            className='w-full'
            required={item.required}
            rules={item.rules}
            customFormField={item.customFormField}
          />
        </Col>
      ))}
    </Row>
  );
};

const detailGenerator = (schema: FormSchema<DataTable>[], detailData: DataTable) => {
  return schema.map((item) => ({
    key: item.dataIndex,
    label: item.title,
    children:
      item.type === 'datepicker' ? formatDateTime(detailData[`${item.dataIndex}`]) : detailData[`${item.dataIndex}`]
  }));
};

const DEFAULT_KEY = 1;

export type TableActionType = 'CREATE' | 'READ' | 'UPDATE' | 'REMOVE';

export default function TableCollapseLocal({
  title,
  columns,
  value: dataTables,
  onChange,
  tblProps,
  popupProps,
  defaultExpand,
  closeOnCreateSuccess = true,
  tableActions = ['CREATE', 'READ', 'UPDATE', 'REMOVE']
}: TableCollapseLocalProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const formFields = columns.filter((item) => item.isFormField);
  const [selectedId, setSelectedId] = useState();
  const [detailItems, setDetailItems] = useState<DataTable>();
  const canDelete = tableActions?.includes('REMOVE');
  const canEdit = tableActions?.includes('UPDATE');
  const canCreate = tableActions?.includes('CREATE');
  const canView = tableActions?.includes('READ');

  const tableAction: TableColumnProps<DataTable>[] = [
    {
      title: 'Thao tác',
      sorter: false,
      dataIndex: 'action',
      width: '100px',
      render(_val, record) {
        return (
          <TableAction
            {...(canDelete && { onDelete: () => onChange(dataTables.filter((item) => item.id !== record.id)) })}
            {...(canEdit && {
              onEdit: () => {
                setOpenEdit(true);
                const selectedData = dataTables.find((item) => item.id === record.id);
                setSelectedId(record.id);
                if (!selectedData) return;
                formFields.forEach((item) => {
                  if (item.type === 'datepicker') {
                    editForm.setFieldValue(item.dataIndex, dayjs(selectedData[`${item.dataIndex}`]));
                  } else {
                    editForm.setFieldValue(item.dataIndex, selectedData[`${item.dataIndex}`]);
                  }
                });
              }
            })}
            {...(canView && {
              onViewDetail: () => {
                setOpenDetail(true);
                const selectedData = dataTables.find((item) => item.id === record.id);
                if (!selectedData) return;
                setDetailItems(selectedData);
              }
            })}
          />
        );
      }
    },
    {
      title: 'STT',
      dataIndex: 'STT',
      width: '50px',
      align: 'center',
      render(_value, _, index) {
        return currentPage < 2 ? index : index + 5;
      }
    }
  ];

  const tableColumns = [...tableAction, ...columns.filter((item) => item.viewOnTable)];

  const [form] = Form.useForm<DataTable>();
  const [editForm] = Form.useForm<DataTable>();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <>
      <Collapse
        defaultActiveKey={defaultExpand ? DEFAULT_KEY : undefined}
        items={[
          {
            key: DEFAULT_KEY,
            label: title,
            children: (
              <>
                <Flex justify='end' className='mb-1'>
                  {canCreate && (
                    <Button type='primary' onClick={() => setOpen(true)}>
                      Thêm mới
                    </Button>
                  )}
                </Flex>

                <Table
                  rowKey='id'
                  pagination={{
                    pageSize: 5,
                    onChange(page) {
                      setCurrentPage(page);
                    }
                  }}
                  {...tblProps}
                  columns={tableColumns}
                  dataSource={dataTables}
                />
              </>
            )
          }
        ]}
      ></Collapse>
      <Modal width={800} title='Thêm mới' {...popupProps} open={open} onCancel={() => setOpen(false)} footer={null}>
        <Form form={form}>
          <FormGenerator schema={formFields} />
          <Flex gap={4} justify='end' className='mt-2'>
            <Button
              type='primary'
              onClick={() => {
                form.validateFields().then(() => {
                  const updatedList = [...dataTables, { id: nanoid(6), ...form.getFieldsValue() }];
                  onChange(updatedList);
                  form.resetFields();
                  closeOnCreateSuccess && setOpen(false);
                });
              }}
            >
              Lưu
            </Button>
            <Button type='default' onClick={() => setOpen(false)}>
              Đóng
            </Button>
          </Flex>
        </Form>
      </Modal>
      {/* edit */}
      <Modal
        title='Chỉnh sửa'
        width={800}
        {...popupProps}
        footer={null}
        open={openEdit}
        onCancel={() => {
          setOpenEdit(false);
          setSelectedId(undefined);
        }}
      >
        <Form form={editForm}>
          <FormGenerator schema={formFields} />
          <Flex gap={4} justify='end' className='mt-2'>
            <Button
              type='primary'
              onClick={() => {
                editForm.validateFields().then(() => {
                  const selectedDataIndex = dataTables.findIndex((item) => item.id === selectedId);
                  if (selectedDataIndex === -1) return;
                  dataTables[selectedDataIndex] = { id: selectedId, ...editForm.getFieldsValue() };

                  const updatedList = [...dataTables];
                  onChange(updatedList);
                  editForm.resetFields();
                  setSelectedId(undefined);
                  setOpenEdit(false);
                });
              }}
            >
              Cập nhật
            </Button>
            <Button
              type='default'
              onClick={() => {
                setOpenEdit(false);
                setSelectedId(undefined);
              }}
            >
              Đóng
            </Button>
          </Flex>
        </Form>
      </Modal>
      {/* detail */}
      <Modal
        title='Chi tiết'
        width={800}
        {...popupProps}
        footer={null}
        open={openDetail}
        onCancel={() => {
          setOpenDetail(false);
          setDetailItems(undefined);
        }}
      >
        <Descriptions
          layout='vertical'
          items={(detailItems && detailGenerator(formFields, detailItems)) as DescriptionsItemType[]}
        />
        <Flex gap={4} justify='end' className='mt-2'>
          <Button
            type='default'
            onClick={() => {
              setOpenDetail(false);
              setDetailItems(undefined);
            }}
          >
            Đóng
          </Button>
        </Flex>
      </Modal>
    </>
  );
}
