/**
 * Recursively remove vnodes marked as comments.
 *
 * @param  {object} vnode Vue vnode
 */
function removeComments (vnode) {
  if (vnode && vnode.hasOwnProperty('isComment')) {
    vnode.isComment = false;
  }
  if (vnode && vnode.children) {
    vnode.children.forEach(function (child) {
      removeComments(child);
    });
  }
}

/**
 * Checks options and mutates passed in VTU wrapper vnode
 *
 * @param  {object} wrapper VTU wrapper containing a vndoe
 * @param  {object} options The user's settings
 */
function removeFalseVIf (wrapper, options) {
  if (options && options.removeVIf) {
    removeComments(wrapper.vnode);
  }
}

module.exports = removeFalseVIf;
