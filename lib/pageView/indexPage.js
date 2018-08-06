'use strict';

const SimplePager = require('kabanery-lumine/lib/page/simplePager');
const {
  lumineView,
  n
} = require('kabanery-lumine');
const Fold = require('kabanery-lumine/lib/view/fold/fold');

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
        n('a href="https://www.youtube.com/"', 'youtube')
      ]),
    ]),

    n(Fold, {
      hide: true
    }, [
      n('span', 'facebook messager'),
      n('div', [
        n('iframe src="https://www.messenger.com/t/kinolee97"', {
          style: {
            margin: 0,
            padding: 0,
            border: '1px solid #999999',
            width: '100%',
            height: 400
          }
        })
      ])
    ])
  ]);
}, {
  defaultProps: {}
}));
