import { TooltipProps, Typography } from 'antd';
import { EllipsisConfig } from 'antd/es/typography/Base';
import { ParagraphProps } from 'antd/es/typography/Paragraph';
import Label from '../Label';
import { TextTooltip, TextTooltipProps } from '../TextTooltip';
import './styles.less';

interface CommonTextFieldProps {
  label: string;
  children?: React.ReactNode;
}
interface TextFieldInputProps extends CommonTextFieldProps, TextTooltipProps {}
interface TextFieldParagraphProps extends CommonTextFieldProps, ParagraphProps {
  ellipsis?: EllipsisParagragh;
}
interface EllipsisParagragh extends Omit<EllipsisConfig, 'tooltip'> {
  tooltip?: TooltipProps;
}

const TextFieldText: React.FC<TextFieldInputProps> = ({ label, children, ...rest }) => {
  return (
    <Label className='gt-text-field-wrapper' label={label} active>
      <TextTooltip className='gt-text-field' {...rest}>
        {children || '...'}
      </TextTooltip>
    </Label>
  );
};

const TextFieldParagraph: React.FC<TextFieldParagraphProps> = (props) => {
  const { label, children, ellipsis, ...rest } = props;
  const ellipsisConfig: EllipsisParagragh = {
    rows: 2,
    tooltip: { title: children, ...ellipsis?.tooltip },
    ...ellipsis
  };

  return (
    <Label className='gt-text-field-wrapper' label={label} active>
      <Typography.Paragraph className='gt-text-field' ellipsis={ellipsisConfig} {...rest}>
        {children || '...'}
      </Typography.Paragraph>
    </Label>
  );
};

export const TextField = {
  Text: TextFieldText,
  Paragraph: TextFieldParagraph
};
