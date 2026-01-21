import { CustomToolbarItemModel, ToolbarItem } from '@syncfusion/ej2-react-documenteditor';

const printButton: CustomToolbarItemModel = {
  prefixIcon: 'e-icons e-print',
  tooltipText: 'In (Ctrl + P)',
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
const saveButton: CustomToolbarItemModel = {
  prefixIcon: 'e-icons e-save',
  tooltipText: 'Lưu (Ctrl + S)',
  text: 'Lưu',
  id: 'save'
};

const _serializeButton: CustomToolbarItemModel = {
  prefixIcon: 'e-icons e-save',
  tooltipText: 'Serialize',
  text: 'Serialize',
  id: 'Serialize'
};

const toolbarItems = [
  // _serializeButton,
  // 'Open',
  saveButton,
  'Undo',
  'Redo',
  // 'TrackChanges',
  'Separator',
  'Image',
  'Table',
  'Separator',
  'Header',
  'Footer',
  'PageSetup',
  'PageNumber',
  'Break',
  'Separator',
  'Find',
  'Separator',
  printButton,
  exportWordButton,
  exportPdfButton,
  'Separator'
  // 'RestrictEditing',
  // 'FormFields',
  // 'Separator',
] as (ToolbarItem | CustomToolbarItemModel)[];

export default toolbarItems;
