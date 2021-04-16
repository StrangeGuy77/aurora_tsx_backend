import { toCamel } from '../utils/helper';

/**
 * @description Formatea la respuesta de la base de datos cuando esta viene con el alias como prefijo.
 * @returns Respuesta de la base de datos formateada sin el alias de prefijo.
 * @param response Respuesta cruda de la base de datos.
 * @param replaceString QueryBuilder alias.
 */
export const formatedFilteredResponse = <T>(response: T[], replaceString: string): T[] => {
  return response.map((test) => {
    const formattedResponse: any = {};
    for (const [key, value] of Object.entries(test)) {
      // Remueve el prefijo del índice.
      const removePrefix = key.replace(`${replaceString}`, '');
      // Actualiza la key a camelCase de ser necesario.
      const newlyKey = toCamel(removePrefix);
      // Asignar la key formateada y después asignar el valor que viene con ella.
      formattedResponse[newlyKey] = value;
    }
    return formattedResponse;
  });
};
