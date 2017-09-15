'use strict';

let SimplePager = require('kabanery-lumine/lib/page/simplePager');
let lumineView = require('kabanery-lumine/lib/util/lumineView');
let n = require('kabanery-lumine/lib/util/n');
let {
    syncBindWithKeyMap
} = require('kabanery-lumine/lib/view/compose/mapUI');
let {
    Signal,
    deliver,
    onSignalType
} =
require('kabanery-lumine/lib/util/signal');
let {
    compileTreeScript
} = require('kabanery-lumine/lib/util/treeScript');

// SIGNAL CONSTANTS
let {
    KABANERY_DO_RENDER
} =
require('kabanery-lumine/lib/flow/baseSignalActions');

let Input = require('kabanery-lumine/lib/view/input/input');
let Button = require('kabanery-lumine/lib/view/Button/button');
let Vn = require('kabanery-lumine/lib/view/layout/vn');
let Hn = require('kabanery-lumine/lib/view/layout/hn');
let Modal = require('kabanery-lumine/lib/view/modal/modal');

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

module.exports = SimplePager(lumineView(({
    props
}, ctx) => {
    return n(Vn, {
        mode: 'partion',
        topPartions: [50]
    }, [
        n(Hn, [
            // windows: m * n
            n(Input, syncBindWithKeyMap(ctx, {
                'rows': 'value'
            }, {
                bindedProps: {
                    style: {
                        width: 50
                    },
                    type: 'number'
                },
                autoUpdate: true
            })),

            n('div', {
                style: {
                    lineHeight: 50
                }
            }, '×'),

            n(Input, syncBindWithKeyMap(ctx, {
                'columns': 'value'
            }, {
                bindedProps: {
                    style: {
                        width: 50
                    },
                    type: 'number'
                },
                autoUpdate: true
            })),

            // search window
            n(Input, syncBindWithKeyMap(ctx, {
                'searchWindowWord': 'value'
            }, {
                bindedProps: {
                    placeholder: 'keyword of window url'
                }
            })),

            n(Button, {
                onsignal: onSignalType('click', () => {
                    let matchs = searchWindow(props.searchWindowWord, props.browserWindows);
                    props.showSearchResultList = true;
                    props.searchResult = matchs;
                    ctx.update();
                })
            })
        ]),

        n(BrowserWindowManangerView, syncBindWithKeyMap(ctx, {
            'rows': 'rows',
            'columns': 'columns',
            'browserWindows': 'browserWindows',
            'fullIndex': 'fullIndex'
        })),

        props.showSearchResultList && n(Modal, {
            autoHide: true
        }, [n('ul', {
            style: {
                textAlign: 'left'
            }
        }, [
            props.searchResult.map(({
                url,
                browserWindowIndex,
                urlListIndex
            }) => {
                return n('li', {
                    onclick: () => {
                        props.fullIndex = browserWindowIndex;
                        props.browserWindows[browserWindowIndex].urlIndex = urlListIndex;
                        props.showSearchResultList = false;
                        props.searchResult = [];
                        ctx.updateWithNotify();
                    }
                }, url);
            })
        ])])
    ]);
}, {
    defaultProps: {
        rows: 2,
        columns: 1,
        browserWindows: [],
        fullIndex: -1,
        searchWindowWord: '',
        showSearchResultList: false,
        searchResult: []
    }
}));

let searchWindow = (word, browserWindows) => {
    let matchs = [];
    for (let i = 0; i < browserWindows.length; i++) {
        let {
            urlList
        } = browserWindows[i];
        if (urlList) {
            for (let j = 0; j < urlList.length; j++) {
                let {
                    url
                } = urlList[j];
                if (url.indexOf(word) !== -1) {
                    matchs.push({
                        url,
                        browserWindowIndex: i,
                        urlListIndex: j
                    });
                }
            }
        }
    }

    return matchs;
};
