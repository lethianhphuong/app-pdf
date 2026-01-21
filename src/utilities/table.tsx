import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SortOrder, SorterResult } from 'antd/es/table/interface';
import { ColumnType } from 'antd/lib/table';
import { isOnlyOneItemInArr } from './object';
import { isArray } from './typeof';
import { DEFAULT_PAGE_PARAMS, SortOrderEnums } from '@/constants';
import { PageParams } from '@/service/API/types';

export function getColumnIndex(
  settingPage: PageParams,
  width?: number,
  fixed?: ColumnType<any>['fixed']
): ColumnType<any> {
  return {
    title: 'STT',
    align: 'center',
    width: `${width || 60}px`,
    sorter: false,
    filtered: false,
    render(_value: any, _record: any, index: number) {
      return getTableIndex(settingPage, index);
    },
    fixed: fixed
  };
}

export function getTableIndex(settingPage: PageParams, index: number) {
  return Math.max(0, settingPage.page - 1) * settingPage.size + index + 1;
}

export const getTableSort = (sorts: SorterResult<any> | SorterResult<any>[]): string[] | undefined => {
  const pickedSort = isArray(sorts) ? sorts[0] : sorts;
  switch (pickedSort.order) {
    case SortOrderEnums.LongAscend:
      return [`${pickedSort.field},${SortOrderEnums.ShortAscend}`];
    case SortOrderEnums.LongDescend:
      return [`${pickedSort.field},${SortOrderEnums.ShortDescend}`];
    default:
      return undefined;
  }
};

export const getTablePageAfterRemoveItem = (dataSource: any[], params: any): number => {
  return isOnlyOneItemInArr(dataSource) ? Math.max(params.page - 1, DEFAULT_PAGE_PARAMS.page) : params.page;
};

export const getTableSortIcon = ({ sortOrder }: { sortOrder: SortOrder }) => {
  switch (sortOrder) {
    case SortOrderEnums.LongAscend:
      return <FontAwesomeIcon icon={['fas', 'arrow-up']} />;
    case SortOrderEnums.LongDescend:
      return <FontAwesomeIcon icon={['fas', 'arrow-down']} />;
    default:
      return <FontAwesomeIcon icon={['fas', 'arrow-right-arrow-left']} style={{ transform: 'rotate(90deg)' }} />;
  }
};
