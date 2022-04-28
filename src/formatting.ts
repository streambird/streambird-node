export type SimpleObject = { [key: string]: unknown };

const snakeCase = (camelCaseString: string): string =>
  camelCaseString.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`);

const camelCase = (snakeCaseString: string): string =>
  snakeCaseString
    .replace(/_[0-9]/g, underscoreDigit => underscoreDigit[1])
    .replace(/_[a-z]/g, underscoreChar => underscoreChar[1].toUpperCase());

const deepMapObjectKeys = (value: unknown, f: (key: string) => string): any => {
  if (!(value instanceof Object)) {
    return value;
  } else if (Array.isArray(value)) {
    return value.map(item => deepMapObjectKeys(item, f));
  } else {
    return Object.keys(value).reduce<SimpleObject>((acc, key) => {
      acc[f(key)] = deepMapObjectKeys((value as SimpleObject)[key], f);
      return acc;
    }, {});
  }
};

export const convertObjectToSnakeCase = (requestBody: unknown): unknown => {
  // Converting to JSON and back first handles things like dates, circular references etc.
  requestBody = JSON.parse(JSON.stringify(requestBody));

  return deepMapObjectKeys(requestBody, snakeCase);
};

export const convertObjectToCamelCase = (
  responseBody: SimpleObject
): SimpleObject => deepMapObjectKeys(responseBody, camelCase);