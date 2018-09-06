/**
 * test.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/9/5.
 */

class Comp {
  constructor(props) {
    this.props = props;

  }
}

let inst;
let props = {
  a: 1
};
let component = function Welcome() {
  return 123;
};
inst = new Comp(props);
inst.constructor = component;
inst.render = function() {
  return this.constructor(props);
};

console.log(inst instanceof component);