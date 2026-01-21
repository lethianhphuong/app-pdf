import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { TextTooltip } from '../TextTooltip';
import './style.less';

interface Props {
  children: ReactNode;
  label: string;
  name?: string;
  active?: boolean;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

const Label: React.FC<Props> = ({
  children,
  label,
  active = false,
  required = false,
  name,
  className = '',
  placeholder
}) => {
  const [focus, setFocus] = useState(false);
  const tooltipRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const labelClass: string = focus || active ? 'gt-label gt-label-float' : 'gt-label';

  useEffect(() => {
    const inputElement = (tooltipRef?.current as Nullable<HTMLElement>)?.nextElementSibling;
    if (inputElement && inputElement?.classList?.contains('ant-input-disabled')) {
      setShowTooltip(true);
    }
  }, []);

  if (showTooltip)
    return (
      <TextTooltip title={placeholder} className='w-full pt-[1px]'>
        <div className={`gt-label-wrapper ${className}`} onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
          {label && (
            <label className={labelClass} title={label} htmlFor={name}>
              {label} {required && <span className='text-red-600'>*</span>}
            </label>
          )}
          {children}
        </div>
      </TextTooltip>
    );

  return (
    <div className={`gt-label-wrapper ${className}`} onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      {label && (
        <label className={labelClass} title={label} htmlFor={name} ref={tooltipRef}>
          {label} {required && <span className='text-red-600'>*</span>}
        </label>
      )}
      {children}
    </div>
  );
};

export default Label;
