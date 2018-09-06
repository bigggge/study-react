/**
 * diff.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/9/5.
 */

function diff(dom, vnode) {
  let out;

  if (typeof vnode === 'string') {
    if (dom && dom.nodeType === 3) {
      if (dom.textContent !== vnode) {
        dom.textContent = vnode;
      }
    } else {
      out = document.createTextNode(vnode);
      if (dom && dom.parentNode) {
        dom.parentNode.replaceChild(out, dom);
      }
    }
    return out;
  }
}