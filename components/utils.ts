import _ from 'lodash';
import { omdbUrl, omdbApiKey, OmdbApiTypeList } from './constant';

export const convertToOmdbApiURL = (searchTitle: string, year?: string, type?: OmdbApiTypeList) => {
  const params = `apikey=${omdbApiKey}&s=${searchTitle}${year ? `&y=${year}` : ''}${type ? `&type=${type}` : ''}`;
  return `${omdbUrl}?${params}`;
}

export const getValue = (data: any, path?: string, defaultValue?: any) => {
  if (!path) return _.defaultTo(data, defaultValue);
  return _.defaultTo(_.get(data, path), defaultValue);
}