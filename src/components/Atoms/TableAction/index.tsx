// import {
//   CopyOutlined,
//   DeleteOutlined,
//   DownloadOutlined,
//   EditOutlined,
//   EyeOutlined,
//   SendOutlined
// } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Popconfirm, Tooltip } from 'antd';
import './styles.less';

export interface TableActionProps {
  onViewDetail?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onDownload?: () => void;
  onClone?: () => void;
  onCreate?: () => void;
  disabled?: {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
    download?: boolean;
    clone?: boolean;
    create?: boolean;
  };
  anotherEvent?: JSX.Element;
  titleCreate?: string;
  titleDelete?: string;
}
export const TableAction = ({
  onViewDetail,
  onDelete,
  onEdit,
  onDownload,
  onClone,
  anotherEvent,
  disabled,
  onCreate,
  titleCreate,
  titleDelete = 'Xóa'
}: TableActionProps) => {
  return (
    <div className='gt-table-action'>
      {onViewDetail && (
        <Tooltip title='Chi tiết'>
          <Button
            disabled={disabled?.view}
            size='small'
            type='text'
            onClick={onViewDetail}
            // icon={<EyeOutlined style={{ fontSize: '18px', opacity: disabled?.view ? '0.5' : '1' }} />}
            icon={
              <FontAwesomeIcon
                icon={['fas', 'eye']}
                size='lg'
                color='var(--gt-base-color)'
                opacity={disabled?.view ? 0.25 : 1}
              />
            }
          />
        </Tooltip>
      )}
      {onClone && (
        <Tooltip title='Nhân bản'>
          <Button
            disabled={disabled?.clone}
            size='small'
            type='text'
            onClick={onClone}
            // icon={<CopyOutlined size={17} style={{ color: '#ceab93', opacity: disabled?.clone ? '0.5' : '1' }} />}
            icon={
              <FontAwesomeIcon
                icon={['fas', 'copy']}
                size='lg'
                color='var(--gt-clone-action-color)'
                opacity={disabled?.clone ? 0.25 : 1}
              />
            }
          />
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title={titleDelete}>
          <span className='pop-up-delete'>
            <Popconfirm title='Xác nhận xóa' description='Bạn có chắc muốn xoá?' onConfirm={onDelete}>
              <Button
                disabled={disabled?.delete}
                size='small'
                type='text'
                // icon={<DeleteOutlined style={{ color: 'red' }} />}
                icon={
                  <FontAwesomeIcon
                    icon={['fas', 'trash']}
                    size='lg'
                    color='var(--gt-delete-action-color)'
                    opacity={disabled?.delete ? 0.25 : 1}
                  />
                }
              />
            </Popconfirm>
          </span>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title='Chỉnh sửa'>
          <Button
            disabled={disabled?.edit}
            size='small'
            type='text'
            onClick={onEdit}
            // icon={<EditOutlined style={{ opacity: disabled?.edit ? '0.5' : '1' }} />}
            icon={
              <FontAwesomeIcon
                icon={['fas', 'pen']}
                size='lg'
                color='var(--gt-edit-action-color)'
                opacity={disabled?.edit ? 0.25 : 1}
              />
            }
          />
        </Tooltip>
      )}
      {onDownload && (
        <Tooltip title='Tải về'>
          <Button
            disabled={disabled?.download}
            size='small'
            type='text'
            onClick={onDownload}
            // icon={<DownloadOutlined style={{ opacity: disabled?.download ? 0.5 : 1 }} />}
            icon={
              <FontAwesomeIcon
                icon={['fas', 'download']}
                size='lg'
                color='var(--gt-download-action-color)'
                opacity={disabled?.download ? 0.25 : 1}
              />
            }
          />
        </Tooltip>
      )}
      {onCreate && (
        <Tooltip title={titleCreate}>
          <Button
            disabled={disabled?.create}
            size='small'
            type='text'
            onClick={onCreate}
            // icon={
            //   <SendOutlined
            //     rotate={-50}
            //     style={{
            //       fontSize: '17px',
            //       opacity: disabled?.create ? 0.5 : 1,
            //       color: 'var(--gt-info-color)'
            //     }}
            //   />
            // }
            icon={
              <FontAwesomeIcon
                icon={['fas', 'paper-plane']}
                size='lg'
                color='var(--gt-create-action-color)'
                opacity={disabled?.create ? 0.25 : 1}
              />
            }
          />
        </Tooltip>
      )}
      {anotherEvent}
    </div>
  );
};
