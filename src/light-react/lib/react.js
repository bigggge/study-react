/**
 * react.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/9/3.
 */

function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  };
}

function render(vnode, container) {
  return container.appendChild(_render(vnode));
}

function _render(vnode) {
  console.log(' [React] _render vnode', vnode);

  if (vnode === null || vnode === undefined) {
    vnode = '';
  }

  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }

  // 渲染字符串
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
    // 渲染组件（函数）
  }

  // 渲染组件
  if (typeof vnode.tag === 'function') {
    const component = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(component, vnode.attrs);
    renderComponent(component);
    return component.element;
  }

  const dom = document.createElement(vnode.tag);

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      setAttribute(dom, key, value);
    });
  }

  if (vnode.children) {
    vnode.children.forEach(child => render(child, dom));
  }
  return dom;
}

// 设置属性
function setAttribute(dom, name, value) {
  console.log(' [React] setAttribute dom,name,value', dom, name, value);

  if (name === 'className') name = 'class';

  if (/on\w+/.test(name)) {
    name = name.toLowerCase();
    dom[name] = value || '';

  } else if (name === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || '';

    } else if (value && typeof value === 'object') {
      for (let name in value) {
        dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name];
      }
    }

  } else {
    if (name in dom) {
      dom[name] = value || '';
    }
    if (value) {
      dom.setAttribute(name, value);
    } else {
      dom.removeAttribute(name, value);
    }
  }

}

class Component {
  constructor(props = {}) {
    this.state = {};
    this.props = props;
  }

  setState(stateChange) {
    console.log(' [React] setState stateChange', stateChange);

    Object.assign(this.state, stateChange);
    // 渲染组件
    renderComponent(this);
  }
}

// 创建组件
function createComponent(component, props) {
  console.log(' [React] createComponent component,props', component, props);

  let inst;
  // 如果是类组件，直接返回实例
  if (component.prototype && component.prototype.render) {
    inst = new component(props);
    // 如果是函数定义组件
  } else {
    inst = new Component(props);
    inst.constructor = component;
    inst.render = function() {
      return this.constructor(props);
    };
  }
  return inst;
}

function setComponentProps(component, props) {
  console.log(' [React] setComponentProps component,props', component, props);
  if (!component.element) {
    if (component.componentWillMount) {
      component.componentWillMount();
    } else if (component.componentWillReceiveProps) {
      component.componentWillReceiveProps(props);
    }
  }
  component.props = props;
}

export function renderComponent(component) {
  console.log(' [React] renderComponent component', component);

  let element;

  const vnode = component.render();
  if (component.element && component.componentDidUpdate) {
    component.componentWillUpdate();
  }
  element = _render(vnode);

  if (component.element) {
    if (component.componentDidMount) {
      component.componentDidMount();
    } else if (component.componentDidUpdate) {
      component.componentDidUpdate();
    }
  }

  if (component.element) {
    component.element.parentNode.replaceChild(element, component.element);
  }

  component.element = element;
}

const React = {
  createElement,
  render: (vnode, container) => {
    container.innerHTML = '';
    return render(vnode, container);
  },
  Component,
};

export default React;
