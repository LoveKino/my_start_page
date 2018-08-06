'use strict';

const {
  SPA
} = require('kabanery-lumine/lib/page/flowPfcSPA');
const pageSignalActionMap = require('./pageSignalAction');
const pageViewMap = require('./pageView');

SPA({
  pageViewMap,
  pageSignalActionMap,
  pageOptionsMap: {
    indexPage: {
      localStateStore: false,
      localStateStoreWhiteList: []
    }
  },
  defaultPage: 'indexPage'
});
