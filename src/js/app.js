if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('js/service-worker.js')
    .then(function() {
      console.log('[Gamebase App] Service Worker Registered');
    })
    .catch(ex => {
      console.error('[Gamebase App] Service Worker Exception', ex)
    });
}
