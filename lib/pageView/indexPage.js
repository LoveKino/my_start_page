'use strict';

const SimplePager = require('kabanery-lumine/lib/page/simplePager');
const {
  lumineView,
  n
} = require('kabanery-lumine');
const Fold = require('kabanery-lumine/lib/view/fold/fold');
const FrameWindow = require('../view/frameWindow');
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
  //
  return n('div', [
    n('ul', [
      n('li', [
        n(FrameLink, {
          name: 'youtube',
          url: 'https://www.youtube.com/'
        })
      ]),

      n('li', [
        n(FrameLink, {
          name: 'netflix',
          url: 'https://www.netflix.com/browse'
        })
      ]),

      n('li', [
        n(FrameLink, {
          name: 'facebook messager',
          url: 'https://www.messenger.com/t/kinolee97'
        })
      ])
    ])
  ]);
}, {
  defaultProps: {}
}));
