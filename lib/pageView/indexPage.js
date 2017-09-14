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

let BrowserWindowManangerView = lumineView(({props}, ctx) => {
  let sum = props.rows * props.columns;
  for (let i = 0; i < sum; i++) {
    props.browserWindows[i] = props.browserWindows[i] || {url : ''};
  }

  let fullHandler = (windowIndex) => {
    if (props.fullIndex === -1) {
      props.fullIndex = windowIndex;
    } else {
      props.fullIndex = -1;
    }
    ctx.update();
  };

  return props.fullIndex === -1
             ? n(Vn, {mode : 'percentage'},
                 (Array.from('x'.repeat(props.rows))).map((_, rowIndex) => {
                   return n(
                       Hn, {mode : 'percentage'},

                       (Array.from('x'.repeat(props.columns)))
                           .map((_, columnIndex) => {
                             let windowIndex =
                                 rowIndex * props.columns + columnIndex;
                             return n(
                                 BrowserView,
                                 syncBindWithKeyMap(
                                     ctx, {
                                       [`browserWindows.${windowIndex}.url`] :
                                           'url'
                                     },
                                     {
                                       bindedProps : {
                                         style : {
                                           container :
                                               props.style.windowContainer
                                         }
                                       },
                                       onChildSignal : onSignalType(
                                           'toggle-zoom',
                                           () => fullHandler(windowIndex))
                                     }));
                           }));
                 }))
             : n(Vn, {mode : 'percentage'}, [
                 n(BrowserView,
                   syncBindWithKeyMap(
                       ctx, {[`browserWindows.${props.fullIndex}.url`] : 'url'},
                       {
                         bindedProps : {
                           style : {container : props.style.windowContainer}
                         },
                         onChildSignal : onSignalType(
                             'toggle-zoom', () => fullHandler(props.fullIndex))
                       }))
               ]);
}, {
  defaultProps : {
    style : {managerContainer : {}, windowContainer : {}},
    browserWindows : [],
    rows : 2,
    columns : 1,
    fullIndex : -1
  }
});

let BrowserView = lumineView(({props}, ctx) => {
  return n(Vn, {
    mode : 'partion',
    topPartions : [ 50 ],
    style : {container : {border : '1px solid black'}}
  },
           [
             n(Hn, {style : {childs : [ {}, {}, {marginLeft : 10} ]}},
               [
                 n(Input, syncBindWithKeyMap(ctx, {'url' : 'value'})),
                 n(Button,
                   {onsignal : onSignalType('click', () => { ctx.update(); })},
                   'load'),

                 n(Button, {
                   onsignal : onSignalType(
                       'click', () => { ctx.notify(Signal('toggle-zoom')); })
                 },
                   'zoom')
               ]),

             props.url && n('iframe', {
               src : props.url,
               allowfullscreen : true,
               style : {width : '100%', height : '100%', border : 0}
             })
           ]);
}, {defaultProps : {url : ''}});
