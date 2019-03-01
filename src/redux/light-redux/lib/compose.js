/**
 * compose.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2019/2/28.
 */

// compose(fn1,fn2,fn3)  ==> fn1(fn2(fn3))

function add2(x) {
  return x + 2;
}

function minus2(x) {
  return x - 2;
}

function multi2(x) {
  return x * 2;
}

function compose2() {
  // todo
}

let operator = compose(add2, multi2, minus2);
let v = operator(3); // (3 - 2 + 2) * 2 = 6
// console.log(v);

function compose(...funcs) {
  return funcs.reduce((pre, f) => value => pre(f(value)));
}

function compose1(...args) {
  let len = args.length;
  let count = len - 1;
  let result;
  return function f1(value) {
    result = args[count](value);
    if (count <= 0) {
      return result;
    } else {
      count--;
      return f1(result);
    }
  };
}