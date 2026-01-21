import { Col, Row } from 'antd';
import { DatePicker, Input, InputNumber, Select } from '@/components/Atoms';

type NamPath = string | string[];
type ComponentName = 'Input';

interface FieldItem {
  component: ComponentName;
  label: string;
  name: NamPath;
  col?: { span?: number };
  rules?: any[];
  props?: Record<string, any>;
  // childrens?:
}

interface FieldMapperProps {
  basePath?: string[];
  items: FieldItem[];
  gutter?: [number, number];
}

const component = { Input, Select, DatePicker, InputNumber } as const;

export const FieldMapper: React.FC<FieldMapperProps> = ({ basePath, items, gutter = [8, 8] }) => {
  return (
    <Row gutter={gutter}>
      {items.map((item, index) => {
        const Comp = component[item.component];
        const name = Array.isArray(item.name)
          ? basePath
            ? [...basePath, ...item.name]
            : item.name
          : basePath
            ? [...basePath, item.name]
            : item.name;

        return (
          <Col key={index} {...(item.col || { span: 6 })}>
            <Comp label={item.label} name={name as any} rules={item.rules} {...(item.props || {})} />
          </Col>
        );
      })}
    </Row>
  );
};
