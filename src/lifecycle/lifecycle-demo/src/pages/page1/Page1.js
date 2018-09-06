import React, { Component } from 'react';
import './style.css';

class Page1 extends Component {

  // @link https://reactjs.org/docs/react-component.html#constructor

  // @link https://robin-front.github.io/2018/04/04/update-on-async-rendering.html
  // @link https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html

  // @link https://segmentfault.com/a/1190000015795086
  // @link https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

  // @link https://reactjs.org/blog/2018/03/29/react-v-16-3.html
  // @link https://segmentfault.com/a/1190000014083970

  // 无论有没有 constructor，在 render 中 this.props 都是可以使用的，这是 React 自动设置的
  constructor(props) {
    // 在 es6 中实现继承，直接调用super(props)，super 是代替的是父类的构造函数，
    // super(props) 相当于 Component.prototype.constructor.call(this, props).
    super(props);
    // super(props)的目的：在 constructor 中可以使用 this.props
    // 不传 props constructor 内 props 为 undefined
    console.log(this);
    console.log(Component.prototype.constructor);
    // 在 constructor 中初始化数据和绑定事件
    this.state = {
      counter: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // 在装配发生前被立刻调用
  // UNSAFE_componentWillMount() {
  //   console.log('page1 UNSAFE_componentWillMount');
  // }

  // 在组件被装配后立即调用, 该方法里设置状态将会触发重渲。
  // 这里普遍的误解是，在 componentWillMount 里获取数据可以避免渲染空的状态。
  // 在实际中，这从来都是不对的，因为 react 总是在 componentWillMount 之后立即执行 render。
  // 如果数据在 componentWillMount 调用的时候还不可用，那么第一次 render 也仍然显示加载状态，而不管你在哪里获取数据。
  // 这就是为什么在绝大多数情况下，将数据获取移到 componentDidMount 是感受不到差别的。
  componentDidMount() {
    console.log('page1 componentDidMount');
  }

  // 你可能想知道为什么我们不简单地将先前的 props 作为参数传递给 getDerivedStateFromProps。
  // 我们在设计API时考虑过这个问题，但因为两点原因推翻这个想法：
  // 1. prevProps 参数在第一次调用 getDerivedStateFromProps (实例化后)时会是 null。
  // 需要在每次访问 prevProps 时判断 if-not-null。
  // 2. 在未来版本的 react 中，不传递先前的 props 到这个函数是释放内存的一步。
  // （如果 react 不需要传递 prevProps 到生命周期，内存中就不需要保持 prevProps 的引用。）

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('page1 getDerivedStateFromProps', nextProps, prevState);
    return null;
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   console.log('page1 UNSAFE_componentWillReceiveProps', nextProps);
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('page1 shouldComponentUpdate', nextProps, nextState);
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('page1 getSnapshotBeforeUpdate', prevProps, prevState);
    return null;
  }

  // 当接收到新属性或状态时，componentWillUpdate()为在渲染前被立即调用
  // UNSAFE_componentWillUpdate() {
  //   console.log('page1 UNSAFE_componentWillUpdate');
  // }

  // 更新发生后立即被调用
  componentDidUpdate() {
    console.log('page1 componentDidUpdate');
  }

  // 组件被卸载和销毁之前立刻调用
  componentWillUnmount() {
    console.log('page1 componentWillUnmount');
  }

  handleClick() {
    this.setState({
      counter: Math.random()
    });
  }

  render() {
    console.log('page1 render');

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Page1</h1>
        </header>
        <p>{this.state.counter}</p>
        <button onClick={() => this.handleClick()}>click</button>
      </div>
    );
  }
}

export default Page1;
