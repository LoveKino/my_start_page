const {
  glareView
} = require('kabanery-glare');
const TextField = require('kabanery-glare/src/view/TextField');
const {
  ToolBar
} = require('kabanery-glare/src/view/ToolBar');
const Text = require('kabanery-glare/src/view/Text');
const Log = require('./view/Log');
const {
  mount
} = require('kabanery');
const {
  parseConsoleText
} = require('./consoleParser');

const sandbox = require('./sandbox')();

const Page = glareView(({
  props,
  n,
  bn
}, ctx) => {
  const printLog = (text) => {
    props.logs.logs.push(text);
    ctx.update();
  };

  const printErr = (text) => {
    props.logs.logs.push({
      type: 'error',
      text
    });
    ctx.update();
  };

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
            parseConsoleText(props.consoleText.value, sandbox, {
              printLog,
              printErr,
              props,
              bn,
              ctx
            });
          }
        }, [
          n('div', [
            n(Text, '>'),
            bn(TextField, {
              propsPath: 'consoleText'
            }),
            bn(Log, {
              propsPath: 'logs'
            })
          ])
        ])
      ] : n('span'),

      // render action
      props.action && props.action.actionView ? bn(props.action.actionView, {
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

    logs: {
      logs: [
        'hello, welcome!',
        'You can try to type help to see all commands.'
      ]
    }
  }
});

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
