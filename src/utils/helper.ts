import { camelValidator } from '../validators/regex';

export const genRandomId = () => {
  const possible = '0123456789';
  let randomId = '';
  for (let index = 0; index < 16; index++) {
    randomId += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return randomId;
};

export const isEmpty = (obj: {}) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const deleteEmptyOrUndefined = (obj: any) => {
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || key === '' || value === '') {
      delete obj[key];
    }
  }

  return obj;
};

/**
 * @description Convierte un string de snake_case a camelCase
 * @returns El argumento 's' convertido a camelCase
 * @param s String para convertir a camelCase
 */
export const toCamel = (s: string) => {
  return s.replace(camelValidator, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};
