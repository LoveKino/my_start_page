'use strict';

let SimplePager = require('kabanery-lumine/lib/page/simplePager');
let lumineView = require('kabanery-lumine/lib/util/lumineView');
let n = require('kabanery-lumine/lib/util/n');
let {syncBindWithKeyMap} = require('kabanery-lumine/lib/view/compose/mapUI');
let {Signal, deliver, onSignalType} =
    require('kabanery-lumine/lib/util/signal');
let {compileTreeScript} = require('kabanery-lumine/lib/util/treeScript');

// SIGNAL CONSTANTS
let {KABANERY_DO_RENDER} =
    require('kabanery-lumine/lib/flow/baseSignalActions');

let Input = require('kabanery-lumine/lib/view/input/input');
let Button = require('kabanery-lumine/lib/view/Button/button');
let Vn = require('kabanery-lumine/lib/view/layout/vn');
let Hn = require('kabanery-lumine/lib/view/layout/hn');
let BrowserWindowManangerView = require('../view/browserWindowManangerView')

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
 *     demo: n(Input, syncBindWithKeyMap(ctx, {[parent props]: 'value'},
 * {bindedProps: {}}))
 */

/**
 * deliver signal
 *     demo: n(Button, {onsignal: onSignalType('click', deliver(ctx,
 * SIGNAL_TYPE))}, 'save')
 */

module.exports = SimplePager(lumineView(({props}, ctx) => {
  return n(Vn, {mode : 'partion', topPartions : [ 50 ]}, [
    n(Hn,
      [
        n(Input, syncBindWithKeyMap(ctx, {'rows' : 'value'}, {
            bindedProps : {style : {width : 50}, type : 'number'},
            autoUpdate : true
          })),

        n('div', {style : {lineHeight : 50}}, '×'),

        n(Input, syncBindWithKeyMap(ctx, {'columns' : 'value'}, {
            bindedProps : {style : {width : 50}, type : 'number'},
            autoUpdate : true
          }))
      ]),

    n(BrowserWindowManangerView, syncBindWithKeyMap(ctx, {
        'rows' : 'rows',
        'columns' : 'columns',
        'browserWindows' : 'browserWindows',
        'fullIndex' : 'fullIndex'
      }))
  ]);
}, {
  defaultProps :
      {rows : 2, columns : 1, browserWindows : [], fullIndex : -1}
}));
