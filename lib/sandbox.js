const Frame = require('./view/Frame');

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

module.exports = () => {
  const sandbox = {
    'toolsites': {
      help: 'fast forward to shortcuts of some web sites',
      fn: (env, index) => {
        return {
          actionView: Frame,
          actionData: {
            url: toolsites[index].url
          }
        };
      }
    },

    'js': {
      help: 'run js code on this page',
      fn: (env, ...args) => {
        env.printLog(eval(args.join(' ')) + '');
      }
    }
  };

  return sandbox;
};
