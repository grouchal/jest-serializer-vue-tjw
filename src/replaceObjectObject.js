/**
 * Swaps single and double quotes
 *
 * @param  {string} str Input
 * @return {string}     Swapped output
 */
function swapQuotes (str) {
  return str.replace(/[\'\"]/g, function (match) {
    return match === '"' ? '\'' : '"';
  });
}

/**
 * Same as JSON.stringify, but without quotes around object properties.
 *
 * @param  {object} obj data to stringify
 * @return {string}               stringified string
 */
function stringify (obj) {
  if (typeof(obj) !== 'object' || Array.isArray(obj)) {
    return JSON.stringify(obj);
  }

  let props = Object
    .keys(obj)
    .map((key) => {
      return key + ':' + stringify(obj[key]);
    })
    .join(',');

  return '{' + props + '}';
}

/**
 * Recursively loops over vnode properties in Vue wrapper
 * to stringify attrs.
 *
 * @param  {object} vnode  A Vue wrapper
 */
function convertVNodeDataAttributesToString (vnode) {
  if (vnode) {
    if (vnode.data && vnode.data.attrs) {
      for (const property in vnode.data.attrs) {
        let value = vnode.data.attrs[property];
        if (typeof(value) === 'string') {
          vnode.data.attrs[property] = value;
        } else {
          vnode.data.attrs[property] = swapQuotes(stringify(value));
        }
      }
    }
    if (vnode.children) {
      vnode.children.forEach(function (childVNode) {
        convertVNodeDataAttributesToString(childVNode);
      });
    }
  }
}

/**
 * Checks settings and if Vue wrapper is valid, then converts
 * vnode attributes to a string with clean quotes.
 *
 * Example: title="[object Object]" becomes title="{a:'asdf'}"
 *
 * @param  {object} wrapper  A Vue wrapper
 * @param  {object} options  Options object for this serializer
 */
function replaceObjectObject (wrapper, options) {
  if (options && options.stringifyObjects) {
    convertVNodeDataAttributesToString(wrapper.vnode);
  }
}

module.exports = replaceObjectObject;
