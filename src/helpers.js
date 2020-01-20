const Vue = require ('vue');

// This does not seem to make an actual copy. It is still modifying the reference.
/**
 * Makes a copy of the vnode, so we are not mutating the original reference passed in by the test.
 *
 * @param  {object} vnode Vue's vnode from the wrapper
 * @return {object}       A copy of the vnode
 *
function copyVnode (vnode) {
  const vm = new Vue({
    render: function () {
      return vnode;
    }
  });
  const copy = vm.$mount()._vnode;
  vm.$destroy();
  return copy;
}
 */

/**
 * Creates a Vue instance to render the vnode as an HTML string.
 *
 * @param  {object} vnode  Vue's vnode object
 * @return {string}        The rendered HTML
 */
function vnodeToString (vnode) {
  const vm = new Vue({
    render: function () {
      return vnode;
    }
  });
  const html = vm.$mount().$el.outerHTML;
  vm.$destroy();
  return html;
}

module.exports = {
  vnodeToString: vnodeToString
};
