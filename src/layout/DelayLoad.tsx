import { L10n, setCulture } from '@syncfusion/ej2-base';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-documenteditor/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-image-editor/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-notifications/styles/material.css';
import '@syncfusion/ej2-pdfviewer/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-react-documenteditor/styles/material.css';
import '@syncfusion/ej2-react-grids/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@/assets/style/material.css';
import { vi } from '@/locale/vi';

L10n.load({ vi });

setCulture('vi');

export default function DelayLoad() {
  return <></>;
}
