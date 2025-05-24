function extractPathnameSegments(path) {
  const splitUrl = path.split('/');

  return {
    resource: splitUrl[1] || null,
    id: splitUrl[2] || null,
  };
}

function constructRouteFromSegments(pathSegments) {
  let pathname = '';

  if (pathSegments.resource) {
    pathname = pathname.concat(`/${pathSegments.resource}`);
  }

  if (pathSegments.id) {
    pathname = pathname.concat('/:id');
  }

  return pathname || '/';
}
export function getQueryParams() {
  const queryString = location.hash.split('?')[1];
  return new URLSearchParams(queryString || '');
}
export function getActivePathname() {
  const hash = location.hash.replace('#', '') || '/';
  const [pathOnly] = hash.split('?'); // Pisahkan sebelum tanda tanya
  return pathOnly;
}

export function getActiveRoute() {
  return getActivePathname();
}

export function parseActivePathname() {
  const pathname = getActivePathname();
  return extractPathnameSegments(pathname);
}

export function getRoute(pathname) {
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

export function parsePathname(pathname) {
  return extractPathnameSegments(pathname);
}
