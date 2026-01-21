import { useState } from 'react';
import { ProSkeleton } from '@ant-design/pro-components';
import { Drawer as AntDrawer, DrawerProps, Spin } from 'antd';
import classNames from 'classnames';
import { DrawerProvider, useDrawerProvider } from './hooks/DrawerProvider';
import './style.less';

export interface BaseDrawerProps extends DrawerProps {
  loading?: boolean;
  afterClose?: () => void;
  initRenderChildren?: React.ReactElement;
}

export { useDrawerProvider };

const DrawerWithoutProvider: React.FC<BaseDrawerProps> = (props) => {
  const {
    children,
    classNames: itemsClassName,
    afterOpenChange,
    loading = false,
    className,
    afterClose,
    maskClosable = false,
    initRenderChildren = <ProSkeleton type='list' />,
    ...rest
  } = props;

  const [isReadyToRenderChildren, setIsReadyToRenderChildren] = useState<boolean>(false);
  const { loading: providerLoading, clearDrawerStorage } = useDrawerProvider();

  const renderChildren = () => {
    if (isReadyToRenderChildren) {
      return (
        <Spin
          spinning={loading || providerLoading}
          size='large'
          wrapperClassName='h-full'
          style={{ maxHeight: '100%' }}
        >
          {children}
        </Spin>
      );
    }

    return initRenderChildren;
  };

  return (
    <AntDrawer
      className={classNames('gt-drawer', className)}
      width='var(--gt-drawer-width)'
      destroyOnClose
      classNames={{ footer: 'flex justify-center items-center gap-2', ...itemsClassName }}
      push={{ distance: 0 }}
      {...rest}
      maskClosable={maskClosable}
      height={'100vh'}
      afterOpenChange={(open) => {
        setIsReadyToRenderChildren(open);
        if (!open) {
          clearDrawerStorage();
          afterClose && afterClose();
        }
        afterOpenChange && afterOpenChange(open);
      }}
    >
      {renderChildren()}
    </AntDrawer>
  );
};

export const Drawer: React.FC<BaseDrawerProps> = (props) => {
  return (
    <DrawerProvider>
      <DrawerWithoutProvider {...props} />
    </DrawerProvider>
  );
};
