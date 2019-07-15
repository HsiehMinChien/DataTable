export const omdbApiKey = '1bb745f8';
export const omdbUrl = 'http://www.omdbapi.com/';
export enum OmdbApiType {
  movie = 'movie',
  series = 'series',
  episode = 'episode',
}

export type OmdbApiTypeList = keyof typeof OmdbApiType;