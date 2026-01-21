import { Descriptions as AntDescriptions, DescriptionsProps, Typography } from 'antd';

export interface BaseDescriptionsProps extends DescriptionsProps {}

export const Descriptions: React.FC<BaseDescriptionsProps> = ({ items, ...props }) => {
  return (
    <AntDescriptions
      className='gt-description'
      size='small'
      bordered
      items={items?.map(({ children, ...rest }) => {
        return {
          children: (
            <Typography.Paragraph style={{ marginBottom: 0 }} ellipsis={{ rows: 2, tooltip: { title: children } }}>
              {children}
            </Typography.Paragraph>
          ),
          ...rest
        };
      })}
      {...props}
    />
  );
};
