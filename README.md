# study-react

- docs 文档
- ppt 分享示例
- src
   - [docs](/src/docs) react 官网 文档示例
   - [lifecycle](/src/lifecycle) react 生命周期
   - [light-react](/src/light-react) react 简单实现
   - [react](src/react) react 示例
   - [redux](src/redux)
     - [examples](src/redux/examples)  redux 官方示例
     - [light-redux](src/redux/light-redux)  redux / react-redux 简单实现


## blog
     
[React.Component](https://reactjs.org/docs/react-component.html#constructor)  

[[译] You Probably Dont Need Derived State](https://segmentfault.com/a/1190000015795086)  
[You Probably Don't Need Derived State](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)

[[译] React v16.4.0: 指针事件](https://www.zcfy.cc/article/react-v16-4-0-pointer-events-react-blog)  
[React v16.4.0: Pointer Events](https://reactjs.org/blog/2018/05/23/react-v-16-4.html)  

[[译] React v16.3.0: New lifecycles and context API](https://segmentfault.com/a/1190000014083970)    
[React v16.3.0: New lifecycles and context API](https://reactjs.org/blog/2018/03/29/react-v-16-3.html)  

[React 异步渲染的最新进展](https://robin-front.github.io/2018/04/04/update-on-async-rendering.html)  
[Update on Async Rendering](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)  

[[译] Legacy Context](https://react.docschina.org/docs/legacy-context.html)  
[Legacy Context](https://reactjs.org/docs/legacy-context.html)  

更多文档参见 [https://react.docschina.org/blog/all.html](https://react.docschina.org/blog/all.html)


[You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)  
[你或许不需要使用Redux](https://www.zcfy.cc/article/you-might-not-need-redux)


## Q&A

1. 为什么Redux需要reducers是纯函数？

因为比较两个Javascript对象所有的属性是否相同的的唯一方法是对它们进行深比较。
但是深比较在真实的应用当中代价昂贵，因为通常js的对象都很大，同时需要比较的次数很多。
因此一个有效的解决方法是作出一个规定：无论何时发生变化时，开发者都要创建一个新的对象，然后将新对象传递出去。同时，当没有任何变化发生时，开发者发送回旧的对象。也就是说，新的对象代表新的state。
必须注意到你只能使用slice（译者注：此处slice类似数组的slice方法，具体可以使用本文例子中解构赋值等方法进行slice）或者类似的机制去复制旧的值到新的对象里。
现在使用了新的策略之后，你能够比较两个对象通过使用!==比较两个对象的存储位置而不是比较两个对象的所有属性。同时当两个对象不同的时候，你就能知道新的对象已经改变了旧的state（也就是说，JavaScript对象当中的某些属性的值发生了变化）。这正是Redux所采取的策略。
这就是为什么Redux需要reducers是纯函数的原因！