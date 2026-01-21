import { useEffect, useState } from 'react';
import { useElementSize } from './useResizeObserver';

export const useCaculateTableheight = (targetElementId: string) => {
  const { ref, height } = useElementSize();
  const { ref: otherElementRef, height: otherElementHeight } = useElementSize();
  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    if (!height) return;

    const gapValue = getComputedStyle(ref.current)?.columnGap;

    const gap = gapValue !== 'normal' ? parseInt(getComputedStyle(ref.current)?.columnGap ?? 0, 10) : 0;

    const otherElementMarginTop = parseInt(getComputedStyle(otherElementRef.current).marginTop, 10);
    const otherElementMarginBottom = parseInt(getComputedStyle(otherElementRef.current).marginBottom, 10);

    const tbl = document.querySelector(`#${targetElementId}`) as HTMLElement;
    const tblHead = tbl?.querySelector(`.ant-table-thead`) as HTMLElement;
    const tblPage = tbl?.querySelector(`.ant-pagination`) as HTMLElement;

    const tblHeadHeight = tblHead?.offsetHeight;
    const tblPageHeight =
      tblPage?.offsetHeight +
      parseInt(getComputedStyle(tblPage)?.marginTop, 10) +
      parseInt(getComputedStyle(tblPage)?.marginBottom, 10);

    setTableHeight(
      height -
        gap -
        otherElementRef.current.offsetHeight -
        otherElementMarginTop -
        otherElementMarginBottom -
        tblHeadHeight -
        tblPageHeight
    );
  }, [height, otherElementHeight]);

  return { parentRef: ref, otherElementRef, height: tableHeight };
};
