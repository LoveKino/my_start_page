'use strict';

const {
  n,
  lumineView
} = require('kabanery-lumine');

const FrameWindow = require('./frameWindow');
const Fold = require('kabanery-lumine/lib/view/fold/fold');
const Input = require('kabanery-lumine/lib/view/input/input')

module.exports = lumineView(({
  props
}, ctx) => {
  return n('div', {}, [
    n('strong', props.name),
    n('div', {
      style: {
        padding: '0 8 0 8'
      }
    }, [
      n(Fold, {
        hide: true
      }, [
        n('div', {
          style: {
            display: 'inline-block'
          }
        }, [
          n('span', 'inside frame'),
          n(`a href="${props.url}" target="_blank"`, {
            style: {
              display: 'inline-block',
              marginLeft: 10
            },
            onclick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(props.url, '_blank');
            }
          }, 'new page'),
          n('div style="display:inline-block"', {
            onclick: (e) => {
              e.preventDefault();
              e.stopPropagation();
            }
          }, [
            // TODO update bug
            ctx.bn({
              'url': 'value'
            }, {
              autoUpdate: true
            })(Input, {
              style: {
                width: 200
              }
            })
          ])
        ]),
        n('div', [
          n(FrameWindow, {
            src: props.url
          })
        ])
      ])
    ])
  ]);
}, {
  defaultProps: {
    name: '',
    url: ''
  }
});
