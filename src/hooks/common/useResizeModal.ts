import { useEffect, useState } from 'react';
import { Grid } from 'antd';

export interface ISizeModal {
  sizeXs?: number | undefined;
  sizeSm?: number | undefined;
  sizeMd?: number | undefined;
  sizeLg?: number | undefined;
}
const { useBreakpoint } = Grid;

const defaultSizeModal: ISizeModal = {
  sizeXs: 310,
  sizeSm: 500,
  sizeMd: 600,
  sizeLg: 1000
};
export function useResizeModal(sizeModal?: ISizeModal) {
  const { xs, sm, lg, md } = useBreakpoint();
  const [currentSize, setCurrentSize] = useState(defaultSizeModal.sizeLg);

  useEffect(() => {
    let newSize = currentSize;

    switch (true) {
      case lg:
        newSize = sizeModal?.sizeLg ?? defaultSizeModal.sizeLg;
        break;
      case md:
        newSize = sizeModal?.sizeMd ?? defaultSizeModal.sizeMd;
        break;
      case sm:
        newSize = sizeModal?.sizeSm ?? defaultSizeModal.sizeSm;
        break;
      case xs:
        newSize = sizeModal?.sizeXs ?? defaultSizeModal.sizeXs;
        break;
      default:
        newSize = defaultSizeModal.sizeLg;
        break;
    }

    setCurrentSize(newSize);
  }, [xs, sm, lg, md, sizeModal]);

  return currentSize;
}
