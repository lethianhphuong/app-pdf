import { useMemo } from 'react';
import { TooltipProps, Typography } from 'antd';
import { EllipsisConfig } from 'antd/es/typography/Base';
import { TextProps } from 'antd/es/typography/Text';
import { maxLengthConfig } from '@/constants/common/map';

interface Ellipsis extends Omit<EllipsisConfig, 'expandable' | 'rows' | 'onExpand'> {
  tooltip: TooltipProps;
}

export interface TextTooltipProps extends TextProps {
  ellipsis?: Ellipsis;
  noTitle?: boolean;
}

export const TextTooltip: React.FC<TextTooltipProps> = ({ children, ellipsis, title, noTitle = false, ...rest }) => {
  const content = useMemo(() => {
    const moreCharacters = (children?.toString()?.length || 0) > maxLengthConfig.md ? '...' : '';
    return `${children?.toString().slice(0, maxLengthConfig.md)}${moreCharacters}`;
  }, [children]);

  return (
    <Typography.Text
      ellipsis={{
        tooltip: {
          title: content,
          ...ellipsis?.tooltip
        },
        ...ellipsis
      }}
      title={noTitle ? '' : title}
      {...rest}
    >
      {children}
    </Typography.Text>
  );
};
