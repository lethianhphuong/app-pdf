import { CustomToolbarItemModel, ToolbarItem } from '@syncfusion/ej2-react-documenteditor';

const printButton: CustomToolbarItemModel = {
  prefixIcon: 'e-icons e-print',
  tooltipText: 'In',
  text: 'In',
  id: 'Print'
};
const exportWordButton: CustomToolbarItemModel = {
  prefixIcon: 'e-icons e-export-word',
  tooltipText: 'Xuất ra tệp docx',
  text: 'Xuất ra tệp docx',
  id: 'ExportWord'
};
const exportPdfButton: CustomToolbarItemModel = {
  prefixIcon: 'e-icons e-export-pdf',
  tooltipText: 'Xuất ra tệp pdf',
  text: 'Xuất ra tệp pdf',
  id: 'ExportPdf'
};

const readonlyToolbarItems = [printButton, exportWordButton, exportPdfButton] as (
  | ToolbarItem
  | CustomToolbarItemModel
)[];

export default readonlyToolbarItems;
