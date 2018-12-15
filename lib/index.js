const {
  glareView
} = require('kabanery-glare');
const TextField = require('kabanery-glare/src/view/TextField');
const Frame = require('./Frame');
const {
  ToolBar
} = require('kabanery-glare/src/view/ToolBar');
const Text = require('kabanery-glare/src/view/Text');
const {
  mount
} = require('kabanery');
const {
  parseConsoleText
} = require('./consoleParser');

const Page = glareView(({
  props,
  n,
  bn
}, ctx) => {
  return n('div', {
    style: {
      margin: 0,
      padding: '64 0 0 0',
      width: '100%',
      height: '100%'
    }
  }, [
    n('div', {
      style: {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        zIndex: '100000'
      }
    }, [
      bn(ToolBar, {
        propsPath: 'appTitle'
      }, [])
    ]),
    n('div', {
      style: {
        padding: 8,
        height: '100%'
      }
    }, [
      // console
      props.showConsole ? [
        n('form', {
          style: {
            display: 'inline-flex',
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgb(255,255,255,0.9)'
          },
          onsubmit: (e) => {
            e.preventDefault();
            // handle logic
            parseConsoleText(props.consoleText.value, props, bn, ctx);
          }
        }, [
          n('div', [
            n(Text, '>'),
            bn(TextField, {
              propsPath: 'consoleText'
            })
          ])
        ])
      ] : n('span'),

      // render action
      props.action ? bn(props.action.actionView, {
        propsPath: 'action.actionData'
      }) : null
    ])
  ]);
}, {
  defaultProps: {}
});

const pageInst = Page({
  props: {
    appTitle: {
      title: 'My Start Page',
      color: 'primary'
    },

    showConsole: true,

    consoleText: {
      value: '',
      placeholder: 'start by typing help',
      style: {
        box: {
          width: 600
        }
      }
    },

    action: null,

    sandbox: {
      'toolsites': {
        fn: (env, index) => {
          return {
            actionView: Frame,
            actionData: {
              url: toolsites[index].url
            }
          };
        }
      }
    }
  }
});

const toolsites = [

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
];

const actionApis = {
  toggleConsole: () => {
    pageInst.ctx.update('props.showConsole', !pageInst.ctx.getData().props.showConsole);
  }
};

/**
 * keyboard events
 */
document.addEventListener('keypress', (e) => {
  if (e.key === 'a' && e.ctrlKey) {
    actionApis.toggleConsole();
  }
}, true);

mount(pageInst, document.body);
