/**
 * test.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/9/5.
 */

class Comp {
  constructor(props) {
    this.state = {};
    this.props = props;
  }

  setState(stateChange) {
    Object.assign(this.state, stateChange);
  }

  render() {

  }
}

let inst;
let inst2;
let props = {
  a: 1
};

let component = function Welcome(props) {
  return JSON.stringify(props) + ' !!';
};
// 类组件
inst = new Comp(props);
//
inst2 = new component(props);
inst2.constructor = component;
inst2.render = function() {
  return this.constructor(props);
};
// inst2.render = function() {
//   return component(props);
// };

console.log(inst);
console.log(inst.render());
console.log(inst instanceof Comp);
console.log(inst instanceof component);
console.log(inst2);
console.log(inst2.render());
console.log(inst2 instanceof Comp);
console.log(inst2 instanceof component);

let x = { a: 1 };
let xx = x;
x.a = 2;
console.log(xx);