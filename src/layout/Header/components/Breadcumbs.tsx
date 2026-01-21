import { useEffect, useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Helmet } from 'react-helmet';
import { env } from '@/config/env';
import { defaultBreadcumbs } from '@/constants/common/map';
import { useLocation } from '@/hooks';
import useAccountLogin from '@/hooks/business/useAccountLogin';
import { MenuItem } from '@/layout/SiderBar/types';

const Breadcumbs = () => {
  const defaultLabels = [`${env.APP_TITLE}`];
  const { pathname } = useLocation();
  const { currentMenu } = useAccountLogin();
  const [labels, setLabels] = useState<string[]>(defaultLabels);
  /// const lastestLabel = labels[labels.length - 1];
  const menu: MenuItem[] = [...currentMenu, ...defaultBreadcumbs];

  function getActiveBreadCumbs(menuP: MenuItem[], initialValue: string[] = []) {
    menuP.forEach((item) => {
      pathname.includes(item.key) && initialValue.push(item.label);
      item.children && getActiveBreadCumbs(item.children, initialValue);
    });
    return initialValue;
  }

  useEffect(() => {
    const activeLabelArr = getActiveBreadCumbs(menu);
    setLabels(activeLabelArr.length > 0 ? activeLabelArr : defaultLabels);
  }, [pathname]);

  return (
    <>
      <Helmet>
        {/* <title>{lastestLabel}</title> */}
        {/* <meta name='description' content={lastestLabel} /> */}
      </Helmet>
      <Breadcrumb
        className='header-breadcumbs'
        separator={<CaretRightOutlined style={{ fontSize: '14px' }} />}
        items={labels.map((item) => ({ title: item, key: item }))}
      />
    </>
  );
};

export default Breadcumbs;
