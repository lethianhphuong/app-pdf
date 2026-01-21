import { useState } from 'react';
import { AntSearchInput } from '@/components/Atoms';
import { UserApi } from '@/service/API';
import { PAGE_SIZE } from '@/utilities/pagination';
import { isArray } from '@/utilities/typeof';

const searchCanboByTen = ({
  page = 0,
  size = PAGE_SIZE,
  keySearch
}: {
  keySearch: string;
  page: number;
  size: number;
}) => {
  return UserApi.searchCanBoDonViDangNhapByKeySearch({ keySearch, page, size });
};

export default function SearchFieldsDemo() {
  const [value, setValue] = useState<string>('bocv989172');
  return (
    <>
      <div>search</div>
      <AntSearchInput
        className='w-full'
        searchFn={searchCanboByTen as any}
        value={value}
        config={{ source: 'content', labelField: 'name', valueField: 'account' }}
        onChange={(value) => {
          setValue(value);
        }}
      />

      <p>search value: {isArray(value) ? value.toString() : value}</p>
    </>
  );
}
