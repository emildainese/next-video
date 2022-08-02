'use_strict';

export function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export const serialize = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const url =
  'http://res.cloudinary.com/dofvxis4s/video/upload/h_1080,q_60,w_1920/v1640537694/next_video/animal-1.mp4';

export const parseDefaultCDTransformation = (url) =>
  url
    .match(/\b(h|q|w)[_\d]+\b/gi)
    .map((match) => match.split('_'))
    .reduce((acc, [key, val]) => {
      acc.push({ [key]: val });
      return acc;
    }, []);

// console.log(parseDefaultCDTransformation(url));
