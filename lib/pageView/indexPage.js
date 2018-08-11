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

    // TODO
    n(FrameLink, {
      name: 'plan service. (TODO design a plan service)',
      url: ''
    }),

    n('h3', 'tools'),
    n('ul', [
      props.tools.map((tool) => {
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
    tools: [

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
      }
    ]
  }
}));
