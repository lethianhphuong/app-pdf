import groupClassNames from 'classnames';
import './index.less';

export type BaseFieldSetProps = Omit<JSX.IntrinsicElements['fieldset'], 'title'> & {
  title?: React.ReactNode;
  style?: React.CSSProperties;
  classNames?: {
    title?: string;
    container?: string;
  };
  styles?: {
    title?: React.CSSProperties;
    container?: React.CSSProperties;
  };
};

export const FieldSet: React.FC<BaseFieldSetProps> = ({ className, style, classNames, styles, title, children }) => {
  return (
    <fieldset style={style} className={groupClassNames('gt-fieldset-wrapper', className)}>
      {title && (
        <legend style={styles?.title} className={groupClassNames('gt-fieldset-title', classNames?.title)}>
          {title}
        </legend>
      )}
      <div style={styles?.container} className={groupClassNames('gt-fieldset-container', classNames?.container)}>
        {children}
      </div>
    </fieldset>
  );
};
