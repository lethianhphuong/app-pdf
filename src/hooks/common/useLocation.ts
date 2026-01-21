import { Location as RouterLocation, useLocation as useRouterLocation } from 'react-router-dom';

interface Location extends RouterLocation {
  query?: { [key: string]: string };
}

export function useLocation() {
  const location: Location = useRouterLocation();
  const queryParams = new URLSearchParams(location.search);
  queryParams.forEach((value, key) => {
    location.query = { ...location.query, [key]: value };
  });

  return location;
}
