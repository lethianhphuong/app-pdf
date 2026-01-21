import React, { useRef, useState } from 'react';
import { Modal as AntModal, ModalProps, Skeleton, Spin } from 'antd';
import classNames from 'classnames';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import './style.less';

export interface BaseModalProps extends ModalProps {
  loading?: boolean;
  renderChildrenAfterOpen?: boolean;
}

export const Modal: React.FC<BaseModalProps> = (props) => {
  const {
    children,
    loading = false,
    okButtonProps,
    cancelButtonProps,
    className,
    afterOpenChange,
    renderChildrenAfterOpen = false,
    destroyOnClose = true,
    ...rest
  } = props;

  const [isReadyToRenderChildren, setIsReadyToRenderChildren] = useState<boolean>(false);

  const renderChildren = () => {
    if (renderChildrenAfterOpen && !isReadyToRenderChildren) {
      return <Skeleton paragraph={{ rows: 3 }} active round />;
    }

    return (
      <Spin spinning={loading} wrapperClassName='h-full' style={{ maxHeight: '100%' }}>
        {children}
      </Spin>
    );
  };

  return (
    <AntModal
      className={classNames('gt-modal', className)}
      centered
      width='40%'
      destroyOnClose={destroyOnClose}
      cancelText='Đóng'
      okText='Lưu'
      maskClosable={false}
      okButtonProps={{ disabled: loading, ...okButtonProps }}
      cancelButtonProps={{ type: 'primary', danger: true, ...cancelButtonProps }}
      {...rest}
      afterOpenChange={(open) => {
        renderChildrenAfterOpen && setIsReadyToRenderChildren(open);
        afterOpenChange && afterOpenChange(open);
      }}
    >
      {renderChildren()}
    </AntModal>
  );
};

export const DraggableModal: React.FC<BaseModalProps> = (props) => {
  const {
    children,
    loading = false,
    okButtonProps,
    cancelButtonProps,
    className,
    afterOpenChange,
    renderChildrenAfterOpen = false,
    destroyOnClose = true,
    title,
    ...rest
  } = props;

  const [isReadyToRenderChildren, setIsReadyToRenderChildren] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);

  const renderChildren = () => {
    if (renderChildrenAfterOpen && !isReadyToRenderChildren) {
      return <Skeleton paragraph={{ rows: 3 }} active round />;
    }

    return (
      <Spin spinning={loading} wrapperClassName='h-full' style={{ maxHeight: '100%' }}>
        {children}
      </Spin>
    );
  };

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
    <AntModal
      className={classNames('gt-modal', className)}
      centered
      width='40%'
      destroyOnClose={destroyOnClose}
      cancelText='Đóng'
      okText='Lưu'
      okButtonProps={{ disabled: loading, ...okButtonProps }}
      cancelButtonProps={{ type: 'primary', danger: true, ...cancelButtonProps }}
      {...rest}
      title={
        <div
          style={{
            width: '100%',
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
          {title}
        </div>
      }
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          nodeRef={draggleRef}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
      afterOpenChange={(open) => {
        renderChildrenAfterOpen && setIsReadyToRenderChildren(open);
        afterOpenChange && afterOpenChange(open);
      }}
    >
      {renderChildren()}
    </AntModal>
  );
};
