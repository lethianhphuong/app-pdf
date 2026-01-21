import React from 'react';
import { AutoComplete } from 'antd';
import { AutoCompleteProps } from 'antd/lib/auto-complete';

interface Props extends AutoCompleteProps {}

const Autocomplete: React.FC<Props> = ({ children, ...props }) => {
  return <AutoComplete {...props}>{children}</AutoComplete>;
};

export default Autocomplete;
