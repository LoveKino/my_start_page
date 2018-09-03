'use strict';

const SimplePager = require('kabanery-lumine/lib/page/simplePager');
const {
  lumineView,
  n
} = require('kabanery-lumine');
const FrameLink = require('../view/frameLink');

/**
 * const {} = require('../signals');
 */

// common views
// const Hn = require('kabanery-lumine/lib/view/layout/hn');
// const Vn = require('kabanery-lumine/lib/view/layout/vn');
// const Button = require('kabanery-lumine/lib/view/button/button');
// const Input = require('kabanery-lumine/lib/view/input/input');

/**
 *  SimplePager encapsulate notice and loading view.
 *
 *      .notice.text
 *      .notice.show
 *      .loading.show
 */

/**
 * syncBindWithKeyMap:
 *     sync child props with parent props
 *     ctx.bn({[parent props]: 'value'})(Input, {})
 */

/**
 * pass signal
 *     demo: n(Button, {onsignal: ctx.pass('click', SIGNAL_TYPE)}, 'save')
 */
module.exports = SimplePager(lumineView(({
  props
}, ctx) => {
  return n('div', {
    style: {
      padding: 8
    }
  }, [
    n('h3', 'plan'),

    n('ul', [
      n('li', 'Learn English (1 hour, suggested time: 13:30-14:30)'),
      n('li', 'Algorithm (1 hour, suggested time: 17:00-18:00)'),
      n('li', 'CASACN (1 hour, suggested time: 21:00-22:00)'),
      n('li', 'Health exercise (1 hour: 18:30-19:30)')
    ]),

    // TODO
    n(FrameLink, {
      name: 'plan service. (TODO design a plan service)',
      url: ''
    }),

    n('h3', 'toolsites'),
    n('ul', [
      props.toolsites.map((tool) => {
        // TODO fix fold problem
        return n('li', [
          n(FrameLink, {
            name: tool.name,
            url: tool.url,
            onUrlChange: (url) => {
              tool.url = url;
              ctx.update();
            }
          })
        ]);
      })
    ])
  ]);
}, {
  defaultProps: {
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
        name: "scala api",
        url: 'https://www.scala-lang.org/files/archive/api/current/'
      },
      {
        name: "nodejs doc",
        url: 'https://nodejs.org/dist/latest-v10.x/docs/api/'
      },

      {
        name: 'MDN',
        url: 'https://developer.mozilla.org/en-US/'
      }
    ]
  }
}));
