/* eslint-disable */
import {
  PdfBitmap,
  PdfDocument,
  PdfPageOrientation,
  PdfPageSettings,
  PdfSection,
  SizeF
} from '@syncfusion/ej2-pdf-export';
import '@syncfusion/ej2-popups/styles/material.css';
import {
  DocumentEditor,
  DocumentEditorContainerComponent,
  FormFieldSettingsModel,
  ImageFormat,
  Selection
} from '@syncfusion/ej2-react-documenteditor';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import dayjs from 'dayjs';
import { blankDocument } from './constants';
import { defaultCharacterFormat, defaultParagraphFormat, defaultSectionFormat } from './defaultFormat';
import { DropdownConfig, DropdownOption, FormFieldConfig } from './types';
import { message, notification } from '@/staticAlert';
import { formatDate, formatDateTime, formatMonth, formatYear } from '@/utilities/date';
import { fileToBase64 } from '@/utilities/file';

export const getDateStringByType = (date: dayjs.Dayjs, type: PickerProps['picker']) => {
  if (type === 'month') return formatMonth(date);
  if (type === 'year') return formatYear(date);
  return formatDate(date);
};

export const exportAsBase64PdfImage = async (container: DocumentEditorContainerComponent) => {
  let pdfDocument: PdfDocument = new PdfDocument();
  let count: number = container.documentEditor.pageCount;
  container.documentEditor.documentEditorSettings.printDevicePixelRatio = 2;
  let loadedPage = 0;
  for (let i = 1; i <= count; i++) {
    let format: ImageFormat = 'image/jpeg' as ImageFormat;

    let image = container.documentEditor.exportAsImage(i, format);
    image.onload = () => {
      let imageHeight = Number(image.style.height.toString().replace('px', ''));
      let imageWidth = Number(image.style.width.toString().replace('px', ''));
      let section: PdfSection = pdfDocument.sections.add() as PdfSection;
      let settings: PdfPageSettings = new PdfPageSettings(0);
      if (imageWidth > imageHeight) {
        settings.orientation = PdfPageOrientation.Landscape;
      }
      settings.size = new SizeF(imageWidth, imageHeight);
      (section as PdfSection).setPageSettings(settings);
      let page = section.pages.add();
      let graphics = page.graphics;
      let imageStr = image.src.replace('data:image/jpeg;base64,', '');
      let pdfImage = new PdfBitmap(imageStr);
      graphics.drawImage(pdfImage, 0, 0, imageWidth, imageHeight);
      loadedPage++;
    };

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const blob = await pdfDocument.save();
  const base64 = await fileToBase64(blob?.blobData);

  return base64;
};

export const exportBlobAsFile = async (
  container: DocumentEditorContainerComponent,
  title: string = `file-${formatDateTime(dayjs())}`
) => {
  const data = await container.documentEditor.saveAsBlob('Docx');

  const file = new File([data], `${title}`, {
    type: data.type
  });

  return file;
};

export const configCommentPermissions = (container: DocumentEditorContainerComponent, username: string) => {
  container.documentEditor.beforeCommentAction = (args) => {
    if (username !== args.author && args.type !== 'Reply') {
      args.cancel = true;
      if (username !== 'HỆ THỐNG') message.error('Không có quyền thực hiện thao tác này');
    }
  };
};

export const deleteAllCommentsOfUser = (container: DocumentEditorContainerComponent, username: string) => {
  const jsonObject = JSON.parse(container.documentEditor.serialize());
  const listComment = jsonObject?.cm.filter((cm: any) => cm.a !== username);
  container.documentEditor.open({ ...jsonObject, cm: listComment });
};

export const configDocumentEditor = (container: DocumentEditorContainerComponent) => {
  // Disable các chức năng không cần thiết
  container.documentEditor.enableFormField = false;
  container.documentEditor.enableHyperlinkDialog = false;

  // Hiển thị ruler
  container.documentEditor.documentEditorSettings.showRuler = true;
};

export const configFormFieldSettings = (
  container: DocumentEditorContainerComponent,
  settings: FormFieldSettingsModel
) => {
  container.documentEditor.documentEditorSettings.formFieldSettings = {
    ...container.documentEditor.documentEditorSettings.formFieldSettings,
    ...settings
  };
};

export const caculateDropdownPosition = (selection: Selection, iframeSelection: HTMLElement) => {
  const dropdownLeft =
    Number(selection.caret.style.left.slice(0, -2)) -
    Number(
      (
        iframeSelection.querySelector('div#document-editor-container_editor_vRulerBottom') as HTMLElement
      ).style.left.slice(0, -2)
    );
  const dropdownTop =
    Number(selection.caret.style.top.slice(0, -2)) -
    Number(
      (
        iframeSelection.querySelector('div#document-editor-container_editor_hRulerBottom') as HTMLElement
      ).style.top.slice(0, -2)
    );

  return [dropdownLeft, dropdownTop];
};

export const initBlankPage = (container: DocumentEditorContainerComponent) => {
  // Định dạng chuẩn cho tài liệu trắng
  container.documentEditor.setDefaultCharacterFormat(defaultCharacterFormat);
  container.documentEditor.setDefaultParagraphFormat(defaultParagraphFormat);
  container.documentEditor.setDefaultSectionFormat(defaultSectionFormat);
  // Mở tài liệu trắng
  container.documentEditor.open(blankDocument as string);
};

export const clearFormat = (container: DocumentEditorContainerComponent) => {
  container.documentEditor.setDefaultCharacterFormat({});
  container.documentEditor.setDefaultParagraphFormat({});
  container.documentEditor.setDefaultSectionFormat({});
};

export const blockKeyBoardActions = (documentEditor: DocumentEditor) => {
  documentEditor.keyDown = (args: any) => {
    args.isHandled = true;
    args.event.preventDefault();
  };
  documentEditor.documentEditorSettings.allowDragAndDrop = false;
};

export const moveCursorToNextCellStart = (selection: Selection) => {
  if (selection.contextType.includes('Table')) {
    selection.selectCell();
    selection.select(selection.endOffset, selection.endOffset);
    selection.moveToNextCharacter();
    if (!selection.contextType.includes('Table')) {
      selection.moveToPreviousCharacter();
      return false;
    }
    return true;
  }
  return false;
};

export const moveCursorToPreviousCellEnd = (selection: Selection) => {
  if (selection.contextType.includes('Table')) {
    selection.selectCell();
    selection.select(selection.startOffset, selection.startOffset);
    selection.moveToPreviousCharacter();
    if (!selection.contextType.includes('Table')) {
      selection.moveToNextCharacter();
      return false;
    }
    return true;
  }
  return false;
};

export const getFieldValues = <T extends Partial<Omit<DropdownConfig, 'type'>>>(
  value: DropdownOption[],
  fieldOption?: T
) => {
  if (!value.length) return '...⏷';

  if (fieldOption?.multiSelectText) {
    //customize text showing
    return fieldOption?.multiSelectText(value as DropdownOption[]);
  }

  return value.map((option) => option.text).join(', ');
};

export const getFieldValue = (value: DropdownOption) => {
  return value?.text ?? '...⏷';
};

export const changeEmptyFieldsTextColor = (
  container: DocumentEditorContainerComponent,
  fieldConfig: FormFieldConfig[] | undefined,
  dataExport: Record<string, any>,
  color: string
) => {
  const emptyFields = fieldConfig
    ?.filter((field) => field.type === 'dropdown' || field.type === 'searchInput' || field.type === 'datetime')
    .filter(
      (field) =>
        !(field.field in dataExport) ||
        !dataExport[field.field] ||
        (typeof dataExport[field.field] === 'object' &&
          !(field as DropdownConfig)?.multiSelect &&
          !dataExport[field.field]?.value) ||
        ((field as DropdownConfig)?.multiSelect &&
          (!dataExport[field.field]?.length || !dataExport[field.field][0]?.value))
    );

  emptyFields?.forEach((field) => {
    container.documentEditor.selection.selectBookmark(field.field, true);
    if (container.documentEditor.selection.getBookmarks().includes(field.field)) {
      container.documentEditor.selection.characterFormat.fontColor = color;
    }
  });
};

export const selectBackwardNeighborBookmark = (container: DocumentEditorContainerComponent) => {
  const currentStartPosition = container.documentEditor.selection.startOffset;
  const currentStartPositionArr = currentStartPosition.split(';');
  const newLastPosition = (Number(currentStartPositionArr[currentStartPositionArr.length - 1]) - 2).toString();
  currentStartPositionArr.pop();
  currentStartPositionArr.push(newLastPosition);

  const newPosition = currentStartPositionArr.join(';');

  container.documentEditor.selection.select(newPosition, newPosition);
};

export const selectForwardNeighborBookmark = (container: DocumentEditorContainerComponent) => {
  const currentEndPosition = container.documentEditor.selection.endOffset;
  const currentEndPositionArr = currentEndPosition.split(';');
  const newLastPosition = (Number(currentEndPositionArr[currentEndPositionArr.length - 1]) + 1).toString();
  currentEndPositionArr.pop();
  currentEndPositionArr.push(newLastPosition);

  const newPosition = currentEndPositionArr.join(';');

  container.documentEditor.selection.select(newPosition, newPosition);
};

export const updateEditorSize = (container: DocumentEditorContainerComponent) => {
  const bieuMauContainer = document.getElementById('bieu-mau-container');
  if (!bieuMauContainer) return;
  const containerWidth = bieuMauContainer.offsetWidth;
  const containerHeight = bieuMauContainer.offsetHeight;
  container.resize(containerWidth, containerHeight);
};

export const getListToaDo = (container: DocumentEditorContainerComponent, listToaDo: string[] | undefined) => {
  const toaDoArr = listToaDo?.map((toaDo) => {
    container.documentEditor.selection.selectBookmark(toaDo, true);
    return {
      name: toaDo,
      page: container.documentEditor.selection.startPage,
      x: container.documentEditor.selection.start.location.x,
      y: container.documentEditor.selection.start.location.y,
      isFilled: false,
      isDefault:
        toaDo.startsWith('toaDoNgayKy') || toaDo.startsWith('toaDoThangKy') || toaDo.startsWith('toaDoNamKy')
          ? false
          : true
    };
  });

  return toaDoArr;
};

export const insertText = (container: DocumentEditorContainerComponent, text: string) => {
  container.documentEditor.editor.pasteFormattedContent({
    data: {
      sections: [
        {
          blocks: [
            {
              inlines: [
                {
                  text: text ?? ' ',
                  characterFormat: container.documentEditor.selection.characterFormat
                }
              ]
            }
          ]
        }
      ]
    }
  });
};
