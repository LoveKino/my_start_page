const {
  glareView
} = require('kabanery-glare');

module.exports = glareView(({
  props,
  n
}) => {
  return n('iframe', {
    src: props.url,
    allow: props.allow,
    style: props.style
  });
}, {
  defaultProps: {
    url: '',
    allow: 'encrypted-media;camera;microphone;fullscreen;',
    style: {
      margin: 0,
      padding: 0,
      border: '1px solid #999999',
      width: '100%',
      height: '100%'
    }
  }
});
