import { omdbUrl, omdbApiKey, OmdbApiTypeList } from './constant';

export const convertToOmdbApiURL = (searchTitle: string, year?: string, type?: OmdbApiTypeList) => {
  const params = `apikey=${omdbApiKey}&s=${searchTitle}${year ? `&y=${year}` : ''}${type ? `&type=${type}` : ''}`;
  return `${omdbUrl}?${params}`;
}