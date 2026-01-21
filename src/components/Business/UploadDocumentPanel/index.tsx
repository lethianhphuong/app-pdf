import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Flex, Progress, Space, Typography } from 'antd';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import { useAppSelector } from '@/hooks/common/useAppSelector';
import { documentUploadStore } from '@/store/slices/documentUpload';

const UploadDocumentPanel: React.FC = () => {
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(true);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [isExpand, setIsExpand] = useState(true);

  const { documents } = useAppSelector(documentUploadStore);

  const handleCollapse = () => {
    setIsExpand(!isExpand);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  useEffect(() => {
    if ((documents as any[])?.length > 0) {
      setDialogVisible(true);
      setIsExpand(true);
    }
  }, [documents]);

  useEffect(() => {
    setTimeout(() => {
      if (!documents || !(documents as any[]).length) {
        setDialogVisible(false);
        setIsExpand(false);
      }
    }, 1000);
  }, [documents]);

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y)
    });
  };

  return (
    <Draggable
      disabled={disabled}
      bounds={bounds}
      nodeRef={draggleRef}
      onStart={(event, uiData) => onStart(event, uiData)}
    >
      <div
        ref={draggleRef}
        className='z-[1999] drop-shadow-md bg-slate-100 w-1/4 '
        style={{
          maxHeight: '200px',
          width: '300px',
          display: dialogVisible ? 'block' : 'none',
          position: 'fixed',
          right: 0,
          bottom: 0
        }}
      >
        <div
          style={{
            cursor: 'move'
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
        >
          <Flex justify='space-between' align='center' className='bg-#273E7C py-2 pr-4 pl-3'>
            <Typography.Text>Cập nhật tài liệu</Typography.Text>
            <Flex justify='space-evenly' align='center'>
              <Button type='text' onClick={handleCollapse}>
                {isExpand ? <ArrowDownOutlined className='text-16px' /> : <ArrowUpOutlined className='text-16px' />}
              </Button>
              <Button type='text' onClick={closeDialog}>
                <CloseOutlined />
              </Button>
            </Flex>
          </Flex>
          <div className='overflow-y-auto flex-col' style={{ display: isExpand ? 'flex' : 'none', height: '80px' }}>
            {(documents as any[])
              ?.map((item: any, index: number) => (
                <Space direction='vertical' className='pr-4 pl-3 cursor-pointer hover:bg-gray-200' key={index}>
                  <Flex justify='space-between'>
                    <Typography.Text ellipsis={true}>{item.name}</Typography.Text>
                  </Flex>
                  <Progress
                    percent={item.progress}
                    showInfo={true}
                    status={item.status}
                    {...(item.status === 'exception' && {
                      success: {
                        percent: 100,
                        strokeColor: '#a9081c'
                      }
                    })}
                  />
                </Space>
              ))
              ?.reverse()}
            {!documents || !(documents as any[])?.length ? (
              <div className='flex flex-col items-center justify-center h-full w-full'>
                <CheckOutlined style={{ color: 'var(--gt-primary-color)', fontSize: 30 }} />
                <div style={{ color: 'var(--gt-primary-color)' }}>Hoàn thành</div>
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default UploadDocumentPanel;
