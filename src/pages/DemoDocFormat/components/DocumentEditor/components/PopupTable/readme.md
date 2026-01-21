# Example PopupEditable column input

```ts
const genarateColumns = (
  saveFieldDisplayText: (field: { [x: string]: any }) => void,
  deleteRecord: (record: { [x: string]: any }) => void
): ProColumns<any>[] => {
  return [
    {
      title: 'STT',
      dataIndex: 'stt',
      editable: false,
      width: '90px',
      render(_dom, _entity, index) {
        return index;
      }
    },
    {
      title: 'Bí danh LLBM/CTVBM',
      dataIndex: 'biDanh',
      renderFormItem: () => {
        return (
          <Input
            onChange={(event) => {
              saveFieldDisplayText({ biDanh: event.target.value });
            }}
          />
        );
      }
    },
    {
      title: 'Loại lực lượng',
      dataIndex: 'loaiLucLuong',
      valueType: 'select',
      renderFormItem: (_, { record }) => {
        return (
          <Select
            options={[
              {
                name: '123',
                value: '456'
              },
              {
                name: '789',
                value: '000'
              }
            ]}
            onChange={(_value, option) => {
              saveFieldDisplayText({ loaiLucLuong: option });
            }}
          />
        );
      }
    },
    {
      title: 'Cán bộ sử dụng',
      dataIndex: 'canBoSuDung',
      valueType: 'select',
      renderFormItem: (_, { record }) => {
        return (
          <AntSearchInput
            className='w-full'
            searchFn={searchCanboByTen}
            placeholder='Tìm kiếm cán bộ'
            config={{ source: 'content', labelField: 'name', valueField: 'account' }}
            onChange={(_value, option) => {
              saveFieldDisplayText({ canBoSuDung: option });
            }}
          />
        );
      }
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghiChu',
      renderFormItem: () => {
        return (
          <Input
            onChange={(event) => {
              saveFieldDisplayText({ ghiChu: event.target.value });
            }}
          />
        );
      }
    },
    {
      title: '',
      dataIndex: 'action',
      editable: false,
      width: '90px',
      render: (_text, record, _index) => {
        return (
          <Popconfirm title='Xác nhận xóa!' onConfirm={() => deleteRecord(record)}>
            <a key='delete'>Xóa</a>
          </Popconfirm>
        );
      }
    }
  ];
};
```
