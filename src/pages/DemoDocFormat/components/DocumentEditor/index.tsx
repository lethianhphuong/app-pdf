import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import '@syncfusion/ej2-popups/styles/material.css';
import {
  DocumentEditor as DocEditor,
  DocumentEditorContainerComponent,
  SpellChecker,
  TextFormFieldInfo,
  Toolbar
} from '@syncfusion/ej2-react-documenteditor';
import { Typography } from 'antd';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import useStateRef from 'react-usestateref';
// import { checkValidate } from '../../utils';
import LoadingInitField from './components/LoadingInitField';
import PopupDateTime from './components/PopupDateTime';
// import PopupDiaDiemSinhHoat from './components/PopupDiaDiemSinhHoat';
// import PopupDiaDiemSinhHoat from './components/PopupDiaDiemSinhHoat';
import PopupDropdown from './components/PopupDropdown';
import PopupSearchInput from './components/PopupSearchInput';
import PopupSelectDiaDiemSinhHoat from './components/PopupSelectDiaDiemSinhHoat';
// import PopupEditable from './components/PopupTable';
import toolbarItems from './customToolbarButtons';
import {
  blockKeyBoardActions,
  caculateDropdownPosition,
  changeEmptyFieldsTextColor,
  clearFormat,
  configCommentPermissions,
  configDocumentEditor,
  configFormFieldSettings,
  deleteAllCommentsOfUser,
  exportBlobAsFile,
  getDateStringByType,
  getFieldValue,
  getFieldValues,
  getListToaDo,
  initBlankPage,
  insertText,
  moveCursorToNextCellStart,
  moveCursorToPreviousCellEnd,
  selectBackwardNeighborBookmark,
  selectForwardNeighborBookmark,
  updateEditorSize
} from './helper';
import './index.less';
import readonlyToolbarItems from './readonlyToolbarButtons';
import {
  DatetimeConfig,
  DiaDiemSinhHoatConfig,
  DocumentEditorProps,
  DropdownConfig,
  DropdownOption,
  FormFieldConfig,
  SearchInputConfig,
  SetDocumentParam,
  TableConfig
} from './types';
// import { editorUrl, token } from '@/bieu-mau';
import { useDrawerProvider } from '@/components/Atoms';
// import { diaDiemSinhHoatOptions } from '@/constants/common';
// import { DiaDiemSinhHoatEnums } from '@/constants/enums';
// import { BieuMauApi } from '@/service/API';
import { downloadByData } from '@/service/http/helper';
import { warningOnPoorConnection } from '@/utilities/internet';
import { LOCAL_STORAGE } from '@/constants';

DocumentEditorContainerComponent.Inject(Toolbar);
DocumentEditorContainerComponent.Inject(SpellChecker);

const DocumentEditor = forwardRef(function DocumentEditor(
  {
    id,
    documentData,
    initDataExport,
    title = 'Untitled',
    currentUser,
    fieldConfig,
    shouldFirstSaveTaiLieuKhacSoanThao,
    listToaDo,
    readOnly,
    // commentOnly,
    onSave,
    onContentChange,
    collapse,
    enableTrackChanges,
    onResetBieuMau
  }: DocumentEditorProps,
  ref: React.ForwardedRef<{ onSave: () => Promise<void> }>
) {

  const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  const editorUrl = import.meta.env.VITE_EDITOR_API_URL + '/';

  let container: DocumentEditorContainerComponent;

  useImperativeHandle(ref, () => ({
    onSave: handleSave
  }));

  const { setLoadingDocumentKey } = useDrawerProvider();

  const [, setCloneContainer, cloneContainerRef] = useStateRef<DocumentEditorContainerComponent>(
    new DocumentEditorContainerComponent('')
  );
  const relativeContainer = useRef<HTMLDivElement | null>(null);

  const [, setDataExport, dataExportRef] = useStateRef<Record<string, any>>({});

  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [inField, setInField] = useState(false);
  const [dropdownDisplay, setDropdownDisplay] = useState(false);
  const [selectFieldData, setSelectFieldData] = useState<FormFieldConfig | null>();
  const [, setFullBookmarkList, fullBookmarkListRef] = useStateRef<string[]>([]);
  // Khi tồn tại documentData và mở xong mới set thành true
  const [isDocumentOpened, setIsDocumentOpened] = useState(false);

  const currentFieldName = useMemo(() => selectFieldData?.field, [selectFieldData]);
  const currentValue = useMemo(
    () => dataExportRef.current[currentFieldName as string],
    [dataExportRef, currentFieldName]
  );

  const dropdownStyle: React.CSSProperties = useMemo(
    () => ({
      visibility: dropdownDisplay ? 'visible' : 'hidden',
      opacity: dropdownDisplay ? 1 : 0,
      transition: 'visibility 0s, opacity 0.5s linear',
      position: 'absolute',
      backgroundColor: 'white',
      left: `${dropdownLeft - 20}px`,
      top: `${dropdownTop + 110}px`,
      display: 'flex',
      borderRadius: '4px',
      boxShadow: 'rgba(0,0,0,0.2) 0px 3px 3px -2px, rgba(0,0,0,0.14) 0px 3px 4px 0px, rgba(0,0,0,0.12) 0px 1px 8px 0px',
      zIndex: 1050
    }),
    [dropdownDisplay, dropdownLeft, dropdownTop]
  );

  const isShowBasicDropdown = useMemo(
    () => selectFieldData && selectFieldData.type === 'dropdown' && dropdownDisplay,
    [selectFieldData, dropdownDisplay]
  );
  const isShowDateTimeDropdown = useMemo(
    () => selectFieldData && selectFieldData.type === 'datetime' && dropdownDisplay,
    [selectFieldData, dropdownDisplay]
  );
  const isShowsearchInputDropdown = useMemo(
    () => selectFieldData && selectFieldData.type === 'searchInput' && dropdownDisplay,
    [selectFieldData, dropdownDisplay]
  );
  const isShowDiaDiaDiemSinhHoatDropDown = useMemo(
    () => selectFieldData && selectFieldData.type === 'diaDiemSinhHoat' && dropdownDisplay,
    [selectFieldData, dropdownDisplay]
  );
  // const isShowTable = selectFieldData && selectFieldData.type === 'table';

  // Cài đặt ban đầu, không phụ thuộc có documentData hay không
  useEffect(() => {
    if (!container) return;
    setCloneContainer(container);
    configDocumentEditor(cloneContainerRef.current);
    // Set thông tin user
    cloneContainerRef.current.documentEditor.currentUser = currentUser;
    // Ngăn user xóa comment của người khác
    configCommentPermissions(cloneContainerRef.current, currentUser);
  }, []);

  // Đặt sự kiện nhấn phím readonly, không phụ thuộc có documentData hay không
  useEffect(() => {
    if (readOnly) {
      blockKeyBoardActions(cloneContainerRef.current.documentEditor);
    } else {
      addHotkeyAndUnlockKeyboard();
    }
  }, [readOnly]);

  // Mở tài liệu
  useEffect(() => {
    handleOpenDocument();
  }, [documentData]);

  // Đặt chế độ track changes khi mở xong tài liệu
  useEffect(() => {
    if (!isDocumentOpened) return;
    if (cloneContainerRef.current.documentEditor.revisions.changes?.length) {
      cloneContainerRef.current.documentEditor.commentReviewPane.showHidePane(true, 'Changes');
    }
    cloneContainerRef.current.documentEditor.enableTrackChanges = enableTrackChanges;
    cloneContainerRef.current.enableTrackChanges = enableTrackChanges;
  }, [enableTrackChanges, isDocumentOpened]);

  // Đặt dataExport sau khi mở tài liệu
  useEffect(() => {
    if (!isDocumentOpened) return;
    setDataExport(initDataExport);
  }, [initDataExport, isDocumentOpened]);

  // Initial value sau khi mở xong tài liệu
  useEffect(() => {
    if (!(fieldConfig && fieldConfig?.length && isDocumentOpened)) return;
    initDocumentValues(cloneContainerRef.current, fieldConfig);
    if (!shouldFirstSaveTaiLieuKhacSoanThao) return;
    handleSave();
  }, [fieldConfig, isDocumentOpened]);

  // Xử lý resize
  useEffect(() => {
    // 500 là animation time
    const timeoutId = setTimeout(() => updateEditorSize(cloneContainerRef.current), 500);
    return () => clearTimeout(timeoutId);
  }, [collapse]);

  // Set ẩn hiện dropdown
  useEffect(() => {
    setDropdownDisplay(false);
    if (dropdownTop < 0 || dropdownTop + 110 > Number(relativeContainer.current?.offsetHeight) || !inField) return;
    if (dropdownLeft < 0 || dropdownLeft - 20 > Number(relativeContainer.current?.offsetWidth) || !inField) return;

    const timeout = setTimeout(() => {
      setDropdownDisplay(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, [dropdownLeft, dropdownTop, inField]);

  const handleOpenDocument = () => {
    setIsDocumentOpened(false);

    const timeoutId = setTimeout(() => {
      // Nếu không có documentData thì mở tài liệu trắng và không cài đặt thêm gì cả
      if (!documentData) {
        initBlankPage(cloneContainerRef.current);
        return;
      }
      // Xóa hết định dạng tài liệu trắng
      clearFormat(cloneContainerRef.current);

      // Mở biểu mẫu
      cloneContainerRef.current.documentEditor.open(documentData as string);

      handleSetupAfterOpenDocument();
      setIsDocumentOpened(true);
      clearTimeout(timeoutId);
    }, 100);
  };

  const handleSetupAfterOpenDocument = () => {
    //TODO: bật tạm để debug
    // cloneContainerRef.current.documentEditor.documentEditorSettings.showBookmarks = true;

    // Set vị trí dropdown khi lăn chuột
    cloneContainerRef.current.documentEditor.viewChange = (e) => {
      const [newDropdownLeft, newDropdownTop] = caculateDropdownPosition(e.source.selection, e.source.element);
      setDropdownLeft(newDropdownLeft);
      setDropdownTop(newDropdownTop);
    };

    // Config dropdown
    configFormFieldSettings(cloneContainerRef.current, { shadingColor: 'yellow' });

    // Lấy list bookmark mặc định
    // Bọc setTimeout vì documentEditor isRenderBookmarkEnd chưa done đã gọi deleteBookmark
    setTimeout(() => {
      cloneContainerRef.current.documentEditor.editor.deleteBookmark('_GoBack');
      setFullBookmarkList(cloneContainerRef.current.documentEditor.getBookmarks());
    }, 0);

    // Đặt chế độ comment
    cloneContainerRef.current.documentEditor.commentBegin = () => {
      cloneContainerRef.current.documentEditor.commentReviewPane.showHidePane(true, 'Comments');
    };
  };

  const initDocumentValues = (container: DocumentEditorContainerComponent, fieldConfig: FormFieldConfig[]) => {
    fieldConfig.forEach((field) => {
      try {
        if (field.initialValue) {
          // setText(field.name);
          // await new Promise((resolve) => setTimeout(resolve, 100));
          switch (field.type) {
            case 'text':
              container.documentEditor.selection.selectBookmark(field.field, true);
              if (container.documentEditor.selection.getBookmarks().includes(field.field)) {
                insertText(container, field.initialValue);
              }
              break;
            case 'dropdown':
              handleSelectDropdown((field as DropdownConfig).initialValue!, field as DropdownConfig);
              break;
            case 'searchInput':
              handleSelectSearchInput((field as SearchInputConfig).initialValue!, field as SearchInputConfig);
              break;
            case 'datetime':
              handleSelectDateTime(
                dayjs((field as DatetimeConfig).initialValue?.value, 'DD/MM/YYYY'),
                field.initialValue?.type,
                field as DatetimeConfig
              );
              break;
            case 'diaDiemSinhHoat':
              // handleSelectDiaDiemSinhHoat(
              //   (field as DiaDiemSinhHoatConfig).initialValue!.type,
              //   (field as DiaDiemSinhHoatConfig).initialValue!.value
              //   // field as DiaDiemSinhHoatConfig
              // );
              break;
            case 'table':
              // Cách dùng table: tạo sẵn bảng trong word với 2 hàng: header và 1 hàng trống; đánh bookmark tại ô đầu tiên hàng thứ 2
              if (field?.initialValue?.length) {
                setDocumentParam({
                  fieldName: field.field,
                  value: field.initialValue,
                  afterSet: () => {
                    // Di chuyển con trỏ chuột đến ô đầu tiên của hàng thứ 2
                    container.documentEditor.selection.selectBookmark(field.field);
                    if (!container.documentEditor.selection.getBookmarks().includes(field.field)) return;

                    // Di chuyển con trỏ chuột đến ô đầu tiên của hàng thứ 3 (nếu có)
                    // Nếu không có hàng thứ 3 thì con trỏ chuột ở ô cuối cùng của hàng thứ 2
                    for (let i = 0; i <= Object.keys((field as TableConfig<any>).initialValue![0]).length - 1; i++) {
                      moveCursorToNextCellStart(container.documentEditor.selection);
                    }
                    // Nếu có hàng thứ 3 thì xóa sạch hết bảng từ hàng thứ 3 trở đi, sau khi xóa thì con trỏ chuột đang ở ngoài bảng
                    if (moveCursorToNextCellStart(container.documentEditor.selection)) {
                      while (container.documentEditor.selection.contextType.includes('Table')) {
                        container.documentEditor.editor.deleteRow();
                      }
                    }

                    // Di chuyển con trỏ chuột đến ô đầu tiên của hàng thứ 2
                    container.documentEditor.selection.selectBookmark(field.field);

                    // Điền giá trị vào từng ô trong bảng
                    (field as TableConfig<any>).initialValue!.forEach((row, rowIndex) => {
                      moveCursorToPreviousCellEnd(container.documentEditor.selection);
                      Object.entries(row).forEach(([_, value], cellIndex) => {
                        moveCursorToNextCellStart(container.documentEditor.selection);
                        // Chọn cả ô và insert giá trị vào
                        container.documentEditor.selection.selectCell();
                        container.documentEditor.editor.insertText(value?.toString());
                        // Bước trên bị mất bookmark nên chèn bookmark vào ô đầu tiên hàng thứ 2 để dùng cho lần sau
                        if (!rowIndex && !cellIndex) {
                          container.documentEditor.editor.insertBookmark(field.field);
                        }
                      });
                      if (rowIndex === (field as TableConfig<any>).initialValue!.length - 1) return;
                      container.documentEditor.editor.insertRow(false, 1);
                    });
                  }
                });
              }
              break;
            default:
              break;
          }
        }
      } catch (err) {
        console.error('Lỗi ở trường: ', field);
        console.error(err);
      }
    });

    container.documentEditor.selection.moveToDocumentStart();
  };

  const handleSelectSearchInput = (value: DropdownOption | DropdownOption[], fieldOption?: SearchInputConfig) => {
    handleSelectDropdown(value, fieldOption as any);
  };

  const handleSelectDropdown = (value: DropdownOption[] | DropdownOption, fieldOption?: DropdownConfig) => {
    const fieldName = fieldOption?.field ?? currentFieldName;

    if (!fieldName) {
      // eslint-disable-next-line no-console
      console.error('can not update value because fieldName is undefined');
      return;
    }

    let textValue = '';
    if (fieldOption?.multiSelect) {
      textValue = getFieldValues(value as DropdownOption[], fieldOption);
    } else {
      textValue = getFieldValue(value as DropdownOption);
    }

    setDocumentParam({
      fieldName,
      value,
      afterSet: () => {
        if (fieldOption?.updateOtherField) {
          const fieldArr = fieldOption?.updateOtherField(value);
          setDataExport((prev) => ({
            ...prev,
            ...fieldArr
          }));

          Object.entries(fieldArr).forEach(([key, value]) => {
            updateDocumentContent(key, value?.text ?? textValue);
          });
        }
      }
    });

    updateDocumentContent(fieldName, textValue);
  };

  // const handleSelectDiaDiemSinhHoat = (type: DiaDiemSinhHoatEnums, value: { label: string; value: string }) => {
  //   const fieldName = selectFieldData?.field ?? currentFieldName;
  //   if (!fieldName) {
  //     // eslint-disable-next-line no-console
  //     console.error('can not update value because fieldName is undefined');
  //     return;
  //   }
  //   const label =
  //     type === DiaDiemSinhHoatEnums.Khac ? value?.label : ` ${value?.label}`;

  //   setDocumentParam({ fieldName, value: { value, type }, afterSet: () => {} });
  //   updateDocumentContent(fieldName, label);
  // };

  const handleSelectDateTime = (value: dayjs.Dayjs, type: PickerProps['picker'], fieldOption?: DatetimeConfig) => {
    const fieldName = fieldOption?.field ?? currentFieldName;
    if (!fieldName) {
      // eslint-disable-next-line no-console
      console.error('can not update value because fieldName is undefined');
      return;
    }
    setDocumentParam({
      fieldName,
      value: { value, type },
      afterSet: () => {
        if (fieldOption?.updateOtherField) {
          const fieldArr = fieldOption?.updateOtherField({ value, type });
          setDataExport((prev) => ({
            ...prev,
            ...fieldArr
          }));

          Object.entries(fieldArr).forEach(([key, value]) => {
            const config = fieldConfig?.find((config) => config.field === key) as DatetimeConfig;
            const textValue = value?.value
              ? config?.format
                ? dayjs(value.value).format(config?.format)
                : getDateStringByType(value?.value, value?.type)
              : '...⏷';
            updateDocumentContent(key, textValue);
          });
        }
      }
    });

    const textValue = value
      ? fieldOption?.format
        ? dayjs(value).format(fieldOption?.format)
        : getDateStringByType(value, type)
      : '...⏷';
    updateDocumentContent(fieldName, textValue);
  };

  // const handleTableUpdate = (dataSource: any, fieldOption: TableConfig<any>) => {
  //   const fieldName = fieldOption?.field ?? currentFieldName;
  //   setDocumentParam({
  //     fieldName: fieldName,
  //     value: dataSource,
  //     afterSet: () => {}
  //   });
  // };

  const setDocumentParam = ({ fieldName, value, afterSet }: SetDocumentParam) => {
    setDataExport!((prev: Record<string, string>) => ({
      ...prev,
      [fieldName]: value
    }));
    afterSet && afterSet();
  };

  const updateDocumentContent = (fieldName: string, value: string) => {
    const currentField = fieldConfig?.find((field) => field.field === fieldName);

    if (currentField?.type === 'text') {
      cloneContainerRef.current.documentEditor.selection.selectBookmark(fieldName);
      if (!cloneContainerRef.current.documentEditor.selection.getBookmarks().includes(fieldName)) return;
      insertText(cloneContainerRef.current, value);
      return;
    }
    const fieldInfo = cloneContainerRef.current.documentEditor.getFormFieldInfo(fieldName) as TextFormFieldInfo;

    cloneContainerRef.current.documentEditor.setFormFieldInfo(fieldName, {
      ...fieldInfo,
      defaultValue: value
    });
  };

  const handleToolBarClick = async (e: any) => {
    const currentDocumentFormat = cloneContainerRef.current.documentEditor.serialize();
    switch (e.item.id) {
      case 'Print':
        handlePrint();
        break;
      case 'ExportWord':
        // Đổi hết text thành màu đen
        cloneContainerRef.current.documentEditor.selection.selectAll();
        cloneContainerRef.current.documentEditor.selection.characterFormat.fontColor = '#000000';

        cloneContainerRef.current.documentEditor.save(title, 'Docx');

        cloneContainerRef.current.documentEditor.open(currentDocumentFormat);
        break;
      case 'ExportPdf':
        cloneContainerRef.current.documentEditor.documentEditorSettings.formFieldSettings!.applyShading = false;

        // Đổi hết text thành màu đen
        cloneContainerRef.current.documentEditor.selection.selectAll();
        cloneContainerRef.current.documentEditor.selection.characterFormat.fontColor = '#000000';

        changeEmptyFieldsTextColor(cloneContainerRef.current, fieldConfig, dataExportRef.current, '#ffffff');

        // eslint-disable-next-line no-case-declarations
        const file = await exportBlobAsFile(cloneContainerRef.current, title);

        cloneContainerRef.current.documentEditor.documentEditorSettings.formFieldSettings!.applyShading = true;
        cloneContainerRef.current.documentEditor.open(currentDocumentFormat);

        // eslint-disable-next-line no-case-declarations
        // const res = await BieuMauApi.exportBieuMauToPdf(file);
        // downloadByData(res, `${title}.pdf`);

        break;

      case 'save':
        warningOnPoorConnection(handleSave);
        break;
      case 'Serialize':
        // eslint-disable-next-line no-console
        console.log(cloneContainerRef.current.documentEditor.serialize());
        break;
      default:
        break;
    }
  };

  const addHotkeyAndUnlockKeyboard = () => {
    cloneContainerRef.current.documentEditor.keyDown = (args: any) => {
      const keyCode = args.event.which || args.event.keyCode;
      const isCtrlKey = args.event.ctrlKey || args.event.metaKey ? true : keyCode === 17 ? true : false;
      const isAltKey = args.event.altKey ? args.event.altKey : keyCode === 18 ? true : false;
      const isBackspaceKey = keyCode === 8;
      const isDeleteKey = keyCode === 46;

      // Cấm xóa quá nhanh
      if ((isBackspaceKey || isDeleteKey) && args.event.repeat) {
        args.isHandled = true;
        args.event.preventDefault();
      }

      // ctrl + P
      if (isCtrlKey && keyCode === 80) {
        args.isHandled = true;
        handlePrint();
        args.event.preventDefault();
      }
      // ctrl + S
      if (isCtrlKey && keyCode === 83) {
        args.isHandled = true;
        document.getElementById('save')?.click();
        args.event.preventDefault();
      }

      // Reset biểu mẫu, chức năng ẩn
      // ctrl + alt + R
      if (isCtrlKey && isAltKey && keyCode === 82) {
        onResetBieuMau && onResetBieuMau();
      }
    };
  };

  const handleSave = async () => {
    if (!cloneContainerRef.current) {
      document.getElementById('save')?.click();
      return;
    }
    const currentStartPosition = cloneContainerRef.current.documentEditor.selection.startOffset;
    const currentEndPosition = cloneContainerRef.current.documentEditor.selection.endOffset;

    try {
      setLoadingDocumentKey(id);
      await onSavingValidate(async (_error, _errorMessages, values) => {
        setDataExport(cloneDeep(values));

        const jsonDocument = cloneContainerRef.current.documentEditor.serialize();

        const toaDoArr = getListToaDo(cloneContainerRef.current, listToaDo);

        cloneContainerRef.current.documentEditor.selection.select(currentStartPosition, currentEndPosition);

        await onSave({
          jsonDocument: JSON.parse(jsonDocument),
          typeDoc: 'doc',
          dataExport: dataExportRef.current,
          toaDoArr
        });
      });
    } catch (_) {
      setLoadingDocumentKey('');
    }
  };

  const handlePrint = () => {
    if (!cloneContainerRef.current) {
      document.getElementById('Print')?.click();
      return;
    }
    cloneContainerRef.current.documentEditor.documentEditorSettings.printDevicePixelRatio = 2;
    cloneContainerRef.current.documentEditor.documentEditorSettings.formFieldSettings!.applyShading = false;

    const currentDocumentFormat = cloneContainerRef.current.documentEditor.serialize();

    // Đổi hết text thành màu đen
    cloneContainerRef.current.documentEditor.selection.selectAll();
    cloneContainerRef.current.documentEditor.selection.characterFormat.fontColor = '#000000';

    // Đổi hết text trong empty field thành màu trắng
    changeEmptyFieldsTextColor(cloneContainerRef.current, fieldConfig, dataExportRef.current, '#ffffff');

    cloneContainerRef.current.documentEditor.print();

    // Chuyển màu text lại thành trạng thái trước khi in
    cloneContainerRef.current.documentEditor.open(currentDocumentFormat);
    cloneContainerRef.current.documentEditor.documentEditorSettings.formFieldSettings!.applyShading = true;
    // changeEmptyFieldsTextColor(cloneContainerRef.current, fieldConfig, dataExportRef.current, '#000000');
  };

  const onSavingValidate = (
    cb: (error: boolean, errorMessages: string[], values: Record<string, any>) => void | Promise<void>
  ) => {
    let isError = false;
    const errMessages: string[] = [];
    let textFieldData = {};

    cloneContainerRef.current.documentEditor.currentUser = 'HỆ THỐNG';
    configCommentPermissions(cloneContainerRef.current, 'HỆ THỐNG');

    //Xóa hết comment của hệ thống
    deleteAllCommentsOfUser(cloneContainerRef.current, 'HỆ THỐNG');

    // Lấy giá trị và validate
    fieldConfig?.forEach((field) => {
      const key = field.field;
      const name = field.name;
      if (field.type === 'text') {
        // nếu trường này là text thì chỉ lấy dữ liệu khi nhấn lưu
        cloneContainerRef.current.documentEditor.selection.selectBookmark(key, true);
        if (!cloneContainerRef.current.documentEditor.selection.getBookmarks().includes(key)) return;
        const value = cloneContainerRef.current.documentEditor.selection.text.trim();
        if (field.validation) {
          const validateMessageResult = checkValidate(name, value, field.validation!);
          isError = validateMessageResult && validateMessageResult.length > 0;
          validateMessageResult.forEach((message) =>
            cloneContainerRef.current.documentEditor.editor.insertComment(message)
          );
          errMessages.push(...validateMessageResult);
        }
        textFieldData = {
          ...textFieldData,
          [key]: value
        };
      } else {
        // các trường còn lại thì lưu dữ liệu vào dataExport ngay khi onChange
        if (field.validation) {
          cloneContainerRef.current.documentEditor.selection.selectBookmark(key, true);
          if (!cloneContainerRef.current.documentEditor.selection.getBookmarks().includes(key)) return;
          cloneContainerRef.current.documentEditor.selection.moveToNextCharacter();
          const validateMessageResult = checkValidate(name, dataExportRef.current[key], field.validation!);
          isError = validateMessageResult && validateMessageResult.length > 0;
          validateMessageResult.forEach((message) =>
            cloneContainerRef.current.documentEditor.editor.insertComment(message)
          );
          errMessages.push(...validateMessageResult);
        }
      }
    });

    cloneContainerRef.current.documentEditor.currentUser = currentUser;
    configCommentPermissions(cloneContainerRef.current, currentUser);

    const documentValues = { ...dataExportRef.current, ...textFieldData };
    return cb(isError, errMessages, documentValues);
  };

  //#region helper
  const allRules: Record<string, (params?: any) => (fieldName: string, value: any) => string | null> = {
    required: () => {
      return (fieldName: string, value: any) => (value ? null : `Trường "${fieldName}" là bắt buộc`);
    },
    minLength: (param: string) => {
      return (fieldName: string, value: string) =>
        value.length >= Number(param) ? null : `Trường "${fieldName}" phải chứa ít nhất ${param} ký tự`;
    }
  };

  function checkValidate(fieldName: string, value: any, rules: string[]) {
    const errorCollection: string[] = [];

    rules.forEach((rule) => {
      const ruleName = rule.split('~~~')[0];
      const ruleParam = rule.split('~~~')[1];
      if (!(ruleName in allRules)) return;
      const message = allRules[ruleName](ruleParam ?? undefined)(fieldName, value);
      if (!message) return;
      errorCollection.push(message as string);
    });
    return errorCollection;
  }
  //#endregion

  const handleSelectionChange = (e: any) => {
    // Fix con trỏ chuột
    if (e.source.documentEditor.selection.checkContentControlLocked()) {
      e.source.documentEditor.selection.caret.style.borderLeft = '3px solid red';
      if (e.source.documentEditor.selection.caret.style.height === '0px') {
        e.source.documentEditor.selection.caret.style.height = '20px';
      }
    } else {
      e.source.documentEditor.selection.caret.style.borderLeft = '1px solid rgba(0, 0, 0, 0.87)';
      if (e.source.documentEditor.selection.caret.style.height === '0px') {
        e.source.documentEditor.selection.moveToLineStart();
        e.source.documentEditor.selection.caret.style.height = '20px';
        e.source.documentEditor.selection.caret.style.top = `${Number(e.source.documentEditor.selection.caret.style.top.slice(0, -2)) - 17}px`;
      }
    }

    // Kiểm tra con trỏ chuột có đang trong field hay không
    if (e.source.documentEditor.selection.isInField) {
      if (!inField) {
        // Nếu trong field thì block keyboard
        setInField(true);
        blockKeyBoardActions(e.source.documentEditor);
      }

      // Nếu trong field tính toán lại tọa độ dropdown
      const [newDropdownLeft, newDropdownTop] = caculateDropdownPosition(
        e.source.documentEditor.selection,
        e.source.element
      );
      setDropdownLeft(newDropdownLeft);
      setDropdownTop(newDropdownTop);

      // Set giá trị đã chọn cho field
      if (fieldConfig) {
        initPopupData(e.source.documentEditor, fieldConfig);
      }
    } else {
      if (inField) {
        // Nếu không trong field thì bỏ block keyboard
        setInField(false);

        addHotkeyAndUnlockKeyboard();
      }
      if (fullBookmarkListRef.current.length) {
        // Đặt con trỏ chuột vào trong bookmark
        if (
          e.source.documentEditor.selection.getPreviousContextType() === 'Bookmark' &&
          !e.source.documentEditor.selection.getBookmarks()[0]
        ) {
          selectBackwardNeighborBookmark(e.source);
        }
        if (
          e.source.documentEditor.selection.getNextContextType() === 'Bookmark' &&
          !e.source.documentEditor.selection.getBookmarks()[0]
        ) {
          selectForwardNeighborBookmark(e.source);
        }

        // Kiểm tra nếu xóa bookmark thì insert lại
        if (e.source.documentEditor.getBookmarks().length !== fullBookmarkListRef.current.length) {
          const missingBookmark = fullBookmarkListRef.current.find(
            (bookmark) => !e.source.documentEditor.getBookmarks().includes(bookmark)
          );
          if (!missingBookmark) return;
          e.source.documentEditor.editor.insertBookmark(missingBookmark);
          cloneContainerRef.current.documentEditor.selection.selectBookmark(missingBookmark, true);
        }
      }
    }

    // TODO xử lý nhập trực tiếp table trong biểu mẫu
    // Set giá trị khởi tạo cho table
    // if ((e.source.documentEditor as DocEditor).selection.contextType.includes('Table')) {
    //   if (fieldConfig) {
    //     initPopupData(e.source.documentEditor, fieldConfig);
    //   }
    // }
    // if (
    //   e.source.documentEditor.selection.contextType.includes('Table') &&
    //   fieldConfig?.find((x) => x.type === 'table' && x.field === e.source.documentEditor.selection.getBookmarks()[0])
    // ) {
    //   blockKeyBoardActions(e.source.documentEditor);
    // } else {
    //   addHotkeyAndUnlockKeyboard(e.source.documentEditor);
    // }
  };

  const initPopupData = (documentEditor: DocEditor, fieldConfig: FormFieldConfig[]) => {
    const currentConfig = fieldConfig.find(
      (x) => x.type !== 'text' && x!.field === documentEditor.selection.getBookmarks()[0]
    );
    setSelectFieldData(currentConfig);
  };

  return (
    <div className='relative h-full overflow-hidden' ref={relativeContainer}>
      {/* <LoadingInitField text={!isDocumentOpened} /> */}
      <DocumentEditorContainerComponent
        id='document-editor-container'
        // enableSpellCheck={true}
        height={'98vh'}
        style={{ minHeight: 'initial !important' }}
        ref={(scope) => {
          container = scope as DocumentEditorContainerComponent;
        }}
        enableToolbar={true}
        toolbarItems={readOnly ? readonlyToolbarItems : toolbarItems}
        contentChange={() => {
          if (!isDocumentOpened) return;
          onContentChange && onContentChange();
        }}
        toolbarClick={handleToolBarClick}
        // created={handleOnCreate}
        serviceUrl={editorUrl as string}
        selectionChange={readOnly ? () => {} : handleSelectionChange}
        headers={[{ Authorization: token }]}
        showPropertiesPane={!readOnly}
      // enableTrackChanges={enableTrackChanges}
      />

      <div className='document-editor-dropdown-container' style={dropdownStyle}>
        {isShowBasicDropdown && (
          <PopupDropdown
            config={selectFieldData as DropdownConfig}
            handleChange={handleSelectDropdown}
            currentValue={currentValue}
          />
        )}
        {isShowDateTimeDropdown && (
          <PopupDateTime
            config={selectFieldData as DatetimeConfig}
            currentValue={{ value: currentValue?.value, type: currentValue?.type }}
            handleChange={handleSelectDateTime}
          />
        )}
        {isShowsearchInputDropdown && (
          <PopupSearchInput
            config={selectFieldData as SearchInputConfig}
            currentValue={currentValue}
            handleChange={handleSelectSearchInput}
            optionRender={(option) => {
              const displayName = option.label;
              const additionalLabelField = (selectFieldData as SearchInputConfig)?.fieldConfig?.additionalLabelField;
              const additionalText = additionalLabelField
                ?.map((addtionalLabel: string) => option.data?.fullData?.[addtionalLabel])
                ?.filter(Boolean)
                ?.join(' - ');

              return (
                <>
                  <div>
                    <Typography.Paragraph
                      className='text-wrap'
                      style={{ marginBottom: 0 }}
                      ellipsis={{
                        rows: 2,
                        tooltip: { title: `${displayName} (${additionalText})`, placement: 'right' }
                      }}
                    >
                      <b>{displayName}</b>
                    </Typography.Paragraph>
                  </div>

                  <div>
                    <i>{additionalText}</i>
                  </div>
                </>
              );
            }}
          />
        )}

        {/* {isShowTable && (
          <PopupEditable
            config={selectFieldData as TableConfig<any>}
            currentValues={currentValue}
            onOk={handleTableUpdate}
            genarateColumns={selectFieldData.columns}
          />
        )} */}
      </div>
    </div>
  );
});

export default DocumentEditor;

//     cloneContainerRef.current.documentEditor.importFormData([
//       {
//         fieldName: fieldFE,
//         value: (selectFieldData as DropdownConfig).displayFE
//           ? (selectFieldData as DropdownConfig)!.displayFE!(dataExportRef.current)
//           : option[fieldFE]
//       }
//     ]);

// cloneContainerRef.current.documentEditor.spellChecker.languageID = 2106;
// cloneContainerRef.current.documentEditor.spellChecker.removeUnderline = false;
// cloneContainerRef.current.documentEditor.spellChecker.allowSpellCheckAndSuggestion = true;
// cloneContainerRef.current.documentEditor.spellChecker.enableOptimizedSpellCheck = true;
