export const pipe =
  (...fns) =>
  (...args) =>
    fns.reduce((val, fn) => fn(val), ...args);

export const compose =
  (...fns) =>
  (arg) =>
    fns.reduceRight((val, fn) => fn(val), arg);

//--------------------------------------------------------------
// const getName = (obj) => obj.name;
// const uppercase = (str) => str.toUpperCase();
// const split = (str) => str.split('');
// const reverse = (str) => str.reverse();
// const join = (str) => str.join('');
// const grater10 = (num) => (num > 10 ? num : 'isLess');

// Se accetta piu di un argomento usare la forma curryed
// const concat = (val) => (str1) => (str2) => val.toString() + str1 + str2;

// console.log(pipe(getName, uppercase, split, reverse, join)({ name: 'emil' }));
// console.log(pipe(grater10, concat('test')('hello'))(15));
