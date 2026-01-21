import { createElement } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { ColumnModel, DataResult, Grid } from '@syncfusion/ej2-react-grids';
import { ColumnType } from 'antd/lib/table';
import { isNil } from 'lodash';
import { FreezeDirection, ProFilterOption, ProTableAlignType, ProTableColumn } from './types';
import { omitNil } from '@/utilities/object';

export function transformToColumnsDirective(columns: ProTableColumn<any>[]): ColumnModel[] {
  return columns
    ?.filter((item) => !item.hidden)
    ?.map((item) => {
      const allowFiltered = item.filtered || isNil(item.filtered);
      const allowSorting = !!item.sorter || isNil(item.sorter);

      return omitNil({
        allowSorting: allowSorting,
        field: allowFiltered ? (item as ColumnType<any>).dataIndex : undefined,
        type: 'string',
        headerText: (item.title || '') as string,
        textAlign: convertToRowTextAlign(item.align),
        freeze: convertToRowfreeze(item.fixed),
        filter: item.customFilterOption && (_customOptionFilter(item) as Record<string, any>),
        template: item.render && _customRowRender(item),
        ...(item.width ? { width: item.width } : { autoFit: true }),
        ...(item.maxWidth && { maxWidth: item.maxWidth })
      });
    });
}

function _customOptionFilter(column: ProTableColumn<any>) {
  let filterWidget: AutoComplete;
  let query: Query = new Query();
  let filterSource: DataManager;
  const inputElement = createElement('input', { className: 'flm-input' });

  return {
    ui: {
      create: (args: any) => {
        const dataSource = args?.column?.parent?.dataSource as DataResult['result'];

        const filterSourceOrigin = _computeDataSourceToFilterSource(dataSource, column);

        filterSource = new DataManager(Array.from(new Map(filterSourceOrigin).values()));

        args.target.appendChild(inputElement);

        filterWidget = new AutoComplete({
          dataSource: filterSource,
          fields: { value: 'value', text: 'text' },
          placeholder: 'Nhập giá trị',
          filtering: (e) => {
            e.preventDefaultAction = true;
            query = e.text !== '' ? query.where('text', 'startswith', e.text, true, true, true) : query;
            e.updateData(filterSource, query);
          }
        });

        filterWidget.appendTo(inputElement);
      },
      read: (args: any) => {
        const filterManager = args.fltrObj as Grid;
        const currentFilterField = args.column.field;
        if (!filterWidget.value) filterManager.clearFiltering();
        filterSource
          .executeQuery(new Query().where('text', args.operator, filterWidget.value as string, true, true, true))
          .then((e: any) => {
            const filterValue = e.result.map((item: ProFilterOption[1]) => item.value);
            filterManager.filterByColumn(currentFilterField, 'equal', filterValue);
          });
      },
      write: (args: any) => {
        filterWidget.value = args.filteredValue;
      }
    }
  };
}

function _computeDataSourceToFilterSource(dataSource: DataResult['result'], column: ProTableColumn<any>) {
  return dataSource.map((data: Record<string, any>) => {
    const rowValue = data[(column as ColumnType<any>).dataIndex];
    return [
      rowValue,
      {
        value: rowValue,
        text: column.customFilterOption!(rowValue, data)
      }
    ];
  }) as ProFilterOption[];
}

function _customRowRender(column: ProTableColumn<any>) {
  return (data: Record<string, any> & { column: ColumnModel; index: string }) => {
    if (!column.render) return;
    return column.render(data[(column as ColumnType<any>).dataIndex], data, Number(data.index));
  };
}

export function convertToRowTextAlign(align: ColumnType<any>['align']): ProTableAlignType {
  switch (align) {
    case 'left':
      return 'Left';
    case 'right':
      return 'Right';
    case 'center':
      return 'Center';
    case 'justify':
      return 'Justify';
    default:
      return 'Left';
  }
}

export function convertToRowfreeze(fixed: ColumnType<any>['fixed']): FreezeDirection {
  switch (fixed) {
    case 'left':
      return 'Left';
    case 'right':
      return 'Right';
    default:
      return 'None';
  }
}
