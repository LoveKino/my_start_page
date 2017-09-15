let lumineView = require('kabanery-lumine/lib/util/lumineView');
let n = require('kabanery-lumine/lib/util/n');
let {
    syncBindWithKeyMap
} = require('kabanery-lumine/lib/view/compose/mapUI');
let {
    Signal,
    onSignalType
} = require('kabanery-lumine/lib/util/signal');
let Input = require('kabanery-lumine/lib/view/input/input');
let Button = require('kabanery-lumine/lib/view/Button/button');
let Vn = require('kabanery-lumine/lib/view/layout/vn');
let Full = require('kabanery-lumine/lib/view/layout/full');
let Hn = require('kabanery-lumine/lib/view/layout/hn');

module.exports = lumineView(({
    props
}, ctx) => {
    if (!props.urlList.length) {
        props.urlList = [{
            url: ''
        }];
    }
    let headBar = n(Hn, {
        style: {
            childs: [{}, {}, {
                marginLeft: 10
            }, {
                marginLeft: 10
            }]
        }
    }, [
        n(Input, syncBindWithKeyMap(
            ctx, {
                [`urlList.${props.urlIndex}.url`]: 'value'
            })),
        n(Button, {
                onsignal: onSignalType('click', () => {
                    let current = props.urlList[props.urlIndex];
                    if (current.url) {
                        current.url = current.url.indexOf('?') === -1 ? current.url + `?____t=${new Date().getTime()}` : current.url + `&____t=${new Date().getTime()}`;
                        ctx.update();
                    }
                })
            },
            'load'),

        n(Button, {
                onsignal: onSignalType(
                    'click', () => {
                        ctx.notify(Signal('toggle-zoom'));
                    })
            },
            'zoom'),

        n(Button, {
                onsignal: onSignalType('click',
                    () => {
                        props.openUrlList = !props.openUrlList;
                        ctx.update();
                    })
            },
            'list')
    ]);

    return n(
        Vn, {
            mode: 'partion',
            topPartions: props.openUrlList ? [50, 0] : [50],
            style: {
                container: {
                    border: '1px solid black'
                }
            }
        }, [
            headBar,
            n(Full, [
                props.urlList.map(({
                    url
                }, index) => {
                    return url && n('iframe', {
                        src: url,
                        allowfullscreen: true,
                        style: {
                            width: index === props.urlIndex ? '100%' : 0,
                            height: index === props.urlIndex ? '100%' : 0,
                            border: 0
                        }
                    });
                })
            ]),

            props.openUrlList &&
            n('ul', [
                n(Button, {
                    onsignal: onSignalType('click', () => {
                        props.urlList.push({
                            url: ''
                        });

                        ctx.updateWithNotify(Signal('add-new-url'));
                    })
                }, 'add'),

                props.urlList.map(({
                    url
                }, index) => {
                    return n('li', {
                        onclick: () => {
                            props.openUrlList = false;
                            props.urlIndex = index;
                            ctx.updateWithNotify(Signal('change-focused-url'));
                        }
                    }, [
                        n('span style="padding-right: 10px"', 'url address:'),
                        n('span', url),
                        n(Button, {
                            onsignal: onSignalType('click', () => {
                                props.openUrlList = false;
                                props.urlList.splice(index, 1);
                                props.urlIndex = index === 0 ? 0 : index - 1;

                                ctx.updateWithNotify(Signal('remove-url-from-list'));
                            })
                        }, 'remove')
                    ])
                })
            ])
        ]);
}, {
    defaultProps: {
        urlIndex: 0,
        openUrlList: false,
        // list
        urlList: [{
            url: ''
        }]
    }
});
