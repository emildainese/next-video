let re1 = /^C:.+(?=\\upload\\users\\[\w-]+\.(jpe?g|png))/gi;
let re2 = /^C:.+users\\/g;
//const img = session.user.image.replace(re2, '').replace(/\\/g, '/');

const obj = {
  name: 'Giovanni',
  age: 62,
  email: 'giovannidainese2@gmail.com',
};
const obj2 = {
  name: 'Emil',
  age: 38,
  email: 'emildainese2@gmail.com',
};
const obj3 = {
  name: 'Elisa',
  age: 44,
  email: 'elisadainese2@gmail.com',
};

const objArr = [obj, obj2, obj3];

const str = 'str';

const num = 4;

const isObject = (val) =>
  typeof val === 'object' && val instanceof Object && val !== null;

const isString = (val) => typeof val === 'string' || val === '';

const isNumber = (val) => typeof val === 'number';

const isArray = (val) =>
  val instanceof Array &&
  Object.prototype.toString.call([]) === '[object Array]';

const pipe =
  (...fns) =>
  (...args) =>
    fns.reduce((val, fn) => fn(val), ...args);

const ucfirst = (str) => {
  if (isString(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else if (isArray(str)) {
    return str.map((s) => s.charAt(0).toUpperCase() + s.slice(1));
  }
};

const splitUpper = (str) => {
  if (isString(str)) {
    return str.split(/(?=[A-Z])/g).join(' ');
  } else if (isArray(str)) {
    return str.map((s) => s.split(/(?=[A-Z])/g).join(' '));
  }
};

const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value);

const skipKeyByValue = (obj, value, keys) => {
  const key = getKeyByValue(obj, value);
  return keys.some((k) => k === key);
};

// for (let value of Object.values(obj)) {
//   console.log(skipKeyByValue(obj, value, ['name', 'age', 'email']));
// }

const skipKey = (keys) => (obj) => {
  if (isArray(obj)) {
    return Object.keys(obj[0]).filter((key) => !keys.some((k) => k === key));
  } else if (isObject(obj)) {
    return Object.keys(obj).filter((key) => !keys.some((k) => k === key));
  }
};

// console.log(skipKey(objArr, ['name', 'age']));
const videos = [
  {
    title: 'Bella Foca',
    description:
      'Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato.',
    originalFileName: 'animal-1.mp4',
    privacy: 'private',
    duration: 10.218542,
    format: 'mp4',
    fileSize: 6.8,
    batchId: 'c51e24bb1eb992cd9fd995834d97df198fa3e9c560f44b987eae886e22fbd0ba',
    assetId: '865b9b2dfe1641450f7d69c239fcb5e6',
    publicId: 'next_video/animal-1',
    url: 'http://res.cloudinary.com/dofvxis4s/video/upload/v1641737675/next_video/animal-1.mp4',
    createdAt: '2022-01-09T14:14:36.000Z',
  },
];

const mapArray = (arr) => arr.map((val) => val);

const videoHeaders = pipe(
  skipKey(['assetId', 'publicId', 'url']),
  splitUpper,
  ucfirst
)(videos);

// console.log(splitUpper(videoHeaders));

console.log(videoHeaders);
// console.log(obj instanceof Object);
// console.log(typeof obj === 'object');
// console.log(isObject(Object.create({})));

// console.log(isString('Emil'));
// console.log(isNumber(3));
// console.log(isObject(obj));
// console.log(3 instanceof Number);
// console.log(isArray(['']));

// console.log(Object.prototype.toString.call(obj));
// console.log(Object.prototype.toString.call(num));
// console.log(Object.prototype.toString.call(str));
// console.log(Object.prototype.toString.call(null));
// console.log(Object.prototype.toString.call([]));

// [object Object]
// [object Number]
// [object String]
// [object Null]
