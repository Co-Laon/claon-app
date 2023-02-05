import Config from 'react-native-config';

export const api = Config.API + '/api/v1';

export const injectedScriptForWebViewBackButton = `
(function() {
  function wrap(fn) {
    return function wrapper() {
      var res = fn.apply(this, arguments);
      window.ReactNativeWebView.postMessage('navigationStateChange');
      return res;
    }
  }

  history.pushState = wrap(history.pushState);
  history.replaceState = wrap(history.replaceState);
  window.addEventListener('popstate', function() {
    window.ReactNativeWebView.postMessage('navigationStateChange');
  });
})();

document.body.style.userSelect = 'none'
true;
`;

// webview css
// user-select:  none;
//
