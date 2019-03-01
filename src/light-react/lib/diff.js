/**
 * diff.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/9/5.
 */

// https://github.com/hujiulong/blog/issues

import { setAttribute, setComponentProps, createComponent } from './react';

/**
 *
 * @param dom 真实DOM
 * @param vnode 虚拟DOM
 * @return 更新后的DOM
 */
export function diff(dom, vnode) {
  let newDom;

  // 对比文本节点
  if (typeof vnode === 'string') {
    // 存在文本节点则更新
    if (dom && dom.nodeType === 3) {
      if (dom.textContent !== vnode) {
        dom.textContent = vnode;
      }
      // 否则创建新文本节点
    } else {
      newDom = document.createTextNode(vnode);
      if (dom && dom.parentNode) {
        dom.parentNode.replaceChild(newDom, dom);
      }
    }
    return newDom;
  }

  // diff component
  if (typeof vnode.tag === 'function') {
    return diffComponent(dom, vnode);
  }

  // 非文本节点，如果 DOM 不存在或新旧 DOM 类型不同，就新建一个节点
  if (!dom || dom.nodeName.toLowerCase() !== vnode.tag.toLowerCase()) {
    newDom = document.createElement(vnode.tag);
    if (dom) {
      [...dom.childNodes].map(newDom.appendChild);
      if (dom.parentNode) {
        dom.parentNode.replaceChild(newDom, dom);
      }
    }
  }

  // 对比子节点
  if (vnode.children && vnode.children.length > 0 || (newDom.childNodes && newDom.childNodes.length > 0)) {
    diffChildren(newDom, vnode.children);
  }

  diffAttributes(newDom, vnode);

  return newDom;
}

function diffAttributes(dom, vnode) {
  const old = {};
  const attrs = vnode.attrs;

  for (let i = 0; i < dom.attributes.length; i++) {
    const attr = dom.attributes[i];
    old[attr.name] = attr.value;
  }

  // 移除不存在属性
  for (let name in old) {
    if (!(name in attrs)) {
      setAttribute(dom, name, undefined);
    }
  }

  // 更新属性值
  for (let name in attrs) {
    if (old[name] !== attrs[name]) {
      setAttribute(dom, name, attrs[name]);
    }
  }
}

// 对比子节点
function diffChildren(dom, vchildren) {
  const domChildren = dom.childNodes;
  const children = [];

  const keyed = {};

  if (domChildren.length > 0) {
    for (let i = 0; i < domChildren.length; i++) {
      const child = domChildren[i];
      const key = child.key;
      if (key) {
        keyed[key] = child;
      } else {
        children.push(child);
      }
    }
  }

  if (vchildren && vchildren.length > 0) {
    let min = 0;
    let childrenLen = children.length;
    for (let i = 0; i < vchildren.length; i++) {
      const vchild = vchildren[i];
      const key = vchild.key;
      let child;

      if (key) {
        if (keyed[key]) {
          child = keyed[key];
          keyed[key] = undefined;
        }
      } else if (min < childrenLen) {
        for (let j = min; j < childrenLen; j++) {
          let c = children[j];
          if (c && isSameNodeType(c, vchild)) {
            child = c;
            children[j] = undefined;

            if (j === childrenLen - 1) childrenLen--;
            if (j === min) min++;
            break;
          }
        }
      }
    }
  }
}

function diffComponent(dom, vnode) {
  let c = dom && dom._component;
  let oldDom = dom;

  if (c && c.constructor === vnode.tag) {
    setComponentProps(c, vnode.attrs);
    dom = c.element;
  } else {
    if (c) {
      unmountComponent(c);
      oldDom = null;
    }
    c = createComponent(vnode.tag, vnode.attrs);

    setComponentProps(c, vnode.attrs);
    dom = c.element;
    if (oldDom && dom !== oldDom) {
      oldDom._component = null;
      removeNode(oldDom);
    }
  }
  return dom;
}

function unmountComponent(component) {
  if (component.componentWillUnmount()) component.componentWillUnmount();
  removeNode(component.element);
}

function isSameNodeType(dom, vnode) {
  return true;
}

function removeNode(dom) {
  if (dom && dom.parentNode) {
    dom.parentNode.removeChild(dom);
  }
}
