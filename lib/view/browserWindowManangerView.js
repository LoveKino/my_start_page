let BrowserView = require('./browserView');
let lumineView = require('kabanery-lumine/lib/util/lumineView');
let n = require('kabanery-lumine/lib/util/n');
let {syncBindWithKeyMap} = require('kabanery-lumine/lib/view/compose/mapUI');
let Vn = require('kabanery-lumine/lib/view/layout/vn');
let Hn = require('kabanery-lumine/lib/view/layout/hn');
let {onSignalType} = require('kabanery-lumine/lib/util/signal');

module.exports = lumineView(({props}, ctx) => {
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

  let columnMatrix = [];
  let rowPers = [];

  if (props.fullIndex === -1) {
    for (let i = 0; i < props.rows; i++) {
      rowPers[i] = 1;
      let columnPers = [];
      for (let j = 0; j < props.columns; j++) {
        columnPers[j] = 1;
      }
      columnMatrix[i] = columnPers;
    }
  } else {
    for (let i = 0; i < props.rows; i++) {
      rowPers[i] = 0;
      let columnPers = [];
      for (let j = 0; j < props.columns; j++) {
        let windowIndex = i * props.columns + j;
        if (windowIndex === props.fullIndex) {
          columnPers[j] = 1;
          rowPers[i] = 1;
        } else {
          columnPers[j] = 0;
        }
      }
      columnMatrix[i] = columnPers;
    }
  }

  return n(
      Vn, {mode : 'percentage', pers : rowPers}, rowPers.map((_, rowIndex) => {
        return n(
            Hn, {mode : 'percentage', pers : columnMatrix[rowIndex]},

            columnMatrix[rowIndex].map((_, columnIndex) => {
              let windowIndex = rowIndex * props.columns + columnIndex;
              return n(
                  BrowserView,
                  syncBindWithKeyMap(
                      ctx, {
                        [`browserWindows.${windowIndex}.urlIndex`] : 'urlIndex',
                        [`browserWindows.${windowIndex}.urlIndex`] : 'urlList'
                      },
                      {
                        bindedProps :
                            {style : {container : props.style.windowContainer}},
                        onChildSignal : onSignalType(
                            'toggle-zoom', () => fullHandler(windowIndex))
                      }));
            }));
      }));
}, {
  defaultProps : {
    style : {managerContainer : {}, windowContainer : {}},
    browserWindows : [],
    rows : 2,
    columns : 1,
    urlIndex : 0,
    urlList : [],
    fullIndex : -1
  }
});
