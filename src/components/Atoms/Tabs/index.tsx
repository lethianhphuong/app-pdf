import React from 'react';
import { Tabs as AntTabs, TabsProps } from 'antd';
import { TabProvider } from './hooks/TabProvider';
import './style.less';

interface Props extends TabsProps {}

const Tabs: React.FC<Props> = ({ ...props }) => {
  return (
    <TabProvider>
      <AntTabs className='gt-tabs' {...props} />
    </TabProvider>
  );
};

export default Tabs;
