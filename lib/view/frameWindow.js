'use strict';

const {
  n,
  lumineView
} = require('kabanery-lumine');

module.exports = lumineView(({
  props
}) => {
  return n('iframe', {
    src: props.src,
    allow: props.allow,
    style: props.style
  });
}, {
  defaultProps: {
    allow: 'encrypted-media;camera;microphone',
    style: {
      margin: 0,
      padding: 0,
      border: '1px solid #999999',
      width: '100%',
      height: 400
    }
  }
});
