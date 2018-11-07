const {
  glareView
} = require('kabanery-glare');
const TextField = require('kabanery-glare/src/view/TextField');
const {
  ToolBar
} = require('kabanery-glare/src/view/ToolBar');
const Text = require('kabanery-glare/src/view/Text');
const {
  mount
} = require('kabanery');

const Frame = glareView(({
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

const Page = glareView(({
  props,
  n,
  bn
}, ctx) => {
  return n('div', {
    style: {
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%'
    }
  }, [
    bn(ToolBar, {
      propsPath: 'appTitle'
    }, []),
    n('div', {
      style: {
        padding: 8,
        height: '100%'
      }
    }, [
      // console
      n('form', {
        style: {},
        onsubmit: (e) => {
          e.preventDefault();
          // handle logic
          runAction(parseConsoleText(props.consoleText.value, props), ctx);
        }
      }, [
        n(Text, '>'),
        bn(TextField, {
          propsPath: 'consoleText'
        })
      ]),

      // active frame
      props.action.type === 'activeFrame' ? bn(Frame, {
        propsPath: 'action.data'
      }) : null
    ])
  ]);
}, {
  defaultProps: {}
});

const parseConsoleText = (text, props) => {
  text = text.trim();
  if (text.startsWith(':')) {
    return {
      type: 'activeFrame',
      data: props.toolsites[text.substring(1)]
    };
  }
};

const runAction = (action, {
  update
}) => {
  if (!action) return;
  if (action.type === 'activeFrame') {
    update('props.activeFrame', action.data);
  }
};

mount(
  Page({
    props: {
      appTitle: {
        title: 'My Start Page'
      },

      consoleText: {
        value: '',
        placeholder: 'console',
        style: {
          box: {
            width: 600
          }
        }
      },

      action: {
        type: 'activeFrame',
        data: {
          name: 'youtube',
          url: 'https://www.youtube.com/'
        },
      },

      toolsites: [

        {
          name: 'youtube',
          url: 'https://www.youtube.com/'
        },
        {
          name: 'netflix',
          url: 'https://www.netflix.com/browse'
        }, {
          name: 'facebook messager',
          url: 'https://www.messenger.com/t/kinolee97'
        }, {
          name: 'translator',
          url: 'https://translate.google.com/'
        },
        {
          name: 'scala api',
          url: 'https://www.scala-lang.org/files/archive/api/current/'
        },
        {
          name: 'nodejs doc',
          url: 'https://nodejs.org/dist/latest-v10.x/docs/api/'
        },

        {
          name: 'MDN',
          url: 'https://developer.mozilla.org/en-US/'
        },

        // TODO some code compiler
        {
          name: 'js console',
          url: 'https://jsconsole.com/'
        },

        {
          name: 'skype',
          url: 'https://web.skype.com/en/'
        },
        {
          name: 'leetcode',
          url: 'https://leetcode.com/problemset/all/'
        }
      ]
    }
  }), document.body);
