import React, { ReactNode } from 'react';
import { Spin } from 'antd';
import classNames from 'classnames';
import './index.less';

interface Props {
  children: ReactNode;
  type?: 'container' | 'full';
  style?: React.CSSProperties;
  className?: string;
  loading?: boolean;
}

export const Container: React.FC<Props> = ({
  children,
  className,
  style,
  type = 'container',
  loading = false
}): ReactNode => {
  const isContainerType = type === 'container';

  return (
    <Spin spinning={loading} size='large' wrapperClassName='gt-container-wrapper'>
      {isContainerType ? (
        <div className={classNames('gt-container', className)} style={style}>
          <div className='gt-container-content'>{children}</div>
        </div>
      ) : (
        <div className={classNames('gt-container-full', className)} style={style}>
          {children}
        </div>
      )}
    </Spin>
  );
};

export default Container;
