/**
 * Hàm giúp tách nhỏ id trong manualChunks theo pattern
 * @param id
 * @param pattern
 * @returns
 */
export const manualChunksSplitId = (id: string, pattern: string): string => {
  if (id.includes(pattern)) {
    const arrId = id.split('/');
    for (let index = 0; index < arrId.length; index++) {
      const element = arrId[index];
      if (element == pattern && arrId.length > index) {
        return pattern + '/' + arrId[index + 1];
      }
    }
  }

  return '';
};
