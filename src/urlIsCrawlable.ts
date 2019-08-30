import { Url } from './types';

const urlIsStaticFile = (url: Url): boolean => {
  const staticFileExtensions = [
    'pdf',
    'gif',
    'jpg',
    'png',
    'gif',
    'tif',
    'tiff',
    'ico',
    'mov',
    'mp4',
    'heic',
    'webm',
    'bmp'
  ];

  const urlComponents = url.split('.');

  return staticFileExtensions.includes(urlComponents[urlComponents.length - 1]);
};

export default (url: Url): boolean => {
  // TO-DO: Make this more comprehensive

  return !urlIsStaticFile(url);
};
