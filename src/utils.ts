const paramExists = (params: any, paramName: string): boolean => {
  if(params && params.hasOwnProperty(paramName)) {
    if(params.hasOwnProperty(paramName)) {
      return true;
    }
  }

  return false;
}