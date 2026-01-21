import { NavigateOptions, Path, createSearchParams, useNavigate as useRouterNavigate } from 'react-router-dom';

interface NavigatePath extends Partial<Path> {
  query?: { [key: string]: string };
}

export function useNavigate() {
  const navigate = useRouterNavigate();

  return (path: NavigatePath, options?: NavigateOptions) => {
    const searchParams = createSearchParams(path?.query || {}).toString();
    navigate({ ...path, search: searchParams }, options);
  };
}
