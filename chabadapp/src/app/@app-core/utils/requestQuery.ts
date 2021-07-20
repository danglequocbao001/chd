import * as _ from 'lodash';

export const requestQuery = (queries: object): string => {
  if (!queries) { return ''; }
  let result: object = JSON.parse(JSON.stringify(queries));
  result = _.keys(result).map((key) => {
    return result[key] !== null || result[key] !== undefined ? `${key}=${result[key]}` : '';
  }).filter(x => x);
  return _.values(result).join('&');
};
