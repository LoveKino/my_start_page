'use strict';

let {SPA} = require('kabanery-lumine/lib/page/flowPfcSPA');
let pageSignalActionMap = require('./pageSignalAction');
let pageViewMap = require('./pageView');

SPA({

  pageViewMap,
  pageSignalActionMap,
  pageOptionsMap : {
    indexPage : {
      localStateStore : true,
      localStateStoreWhiteList :
          [ 'rows', 'columns', 'browserWindows', 'fullIndex' ]
    }
  },
  defaultPage : 'indexPage'
});
