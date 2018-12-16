const {
  glareView
} = require('kabanery-glare');

module.exports = glareView(({
  props,
  n
}) => {
  return n('ul', {
    style: props.style.box
  }, props.logs.slice(0).reverse().map((log) => {
    if (typeof log === 'string') {
      return n('pre', {
        style: props.style.item
      }, [log]);
    } else if (log && log.type === 'error') {
      return n('pre', {
        style: props.style.errorItem
      }, [log.text]);
    }
  }));
}, {
  defaultProps: {
    logs: [],
    style: {
      box: {
        margin: 0,
        padding: 8,
        'list-style-type': 'none'
      },
      item: {
        margin: 0,
        padding: 0
      },
      errorItem: {
        margin: 0,
        padding: 0,
        color: 'red'
      }
    }
  }
});
