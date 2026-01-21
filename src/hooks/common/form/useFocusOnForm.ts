import { FormInstance } from 'antd';

export const useFocusOnForm = (form: FormInstance) => {
  return (error: any) => {
    const errorFields = error?.errorFields;
    if (errorFields && errorFields.length > 0) {
      const firstField = errorFields[0].name[0];
      const inputNode = form.getFieldInstance(firstField);
      if (inputNode && typeof inputNode.focus === 'function') {
        inputNode.focus();
      } else {
        form.scrollToField(firstField, { behavior: 'smooth', block: 'center' });

        requestAnimationFrame(() => {
          const el: HTMLElement | null = document.querySelector(`[id="${firstField}"]`);
          if (el) {
            el.focus();
          }
        });
      }
    }
  };
};
