import {
  CharacterFormatProperties,
  ParagraphFormatProperties,
  SectionFormatProperties
} from '@syncfusion/ej2-react-documenteditor';

export const defaultCharacterFormat: CharacterFormatProperties = {
  bold: false,
  italic: false,
  baselineAlignment: 'Normal',
  underline: 'None',
  fontColor: '#000000',
  fontFamily: 'Times New Roman',
  fontSize: 14
};
export const defaultParagraphFormat: ParagraphFormatProperties = {
  beforeSpacing: 0,
  afterSpacing: 0,
  lineSpacing: 1.15,
  textAlignment: 'Justify'
};

export const defaultSectionFormat: SectionFormatProperties = {
  pageWidth: 595.3,
  pageHeight: 841.9,
  headerDistance: 0,
  footerDistance: 0,
  leftMargin: 85,
  rightMargin: 56.7,
  topMargin: 56.7,
  bottomMargin: 56.7
};
