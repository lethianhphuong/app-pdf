export const PAGE_SIZE_OPTIONS = [25, 50, 100];
export const PAGE_SIZE = 25;

export function paginate<T = any>(array: T[], currentPage: number, pageSize: number = PAGE_SIZE) {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return array.slice(startIndex, endIndex);
}

export function getTotalPages(total: number) {
  return Math.ceil(total / PAGE_SIZE);
}
