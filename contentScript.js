chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  event = {};
  if (request.driverId) {
    var event = new CustomEvent('dispatcherIdReceived', {detail: request});
  } else if (request.busInternalCode) {
    request.busInternalCode = parseInt(request.busInternalCode).toString();
    var event = new CustomEvent('busInternalCodeReceived', {detail: request});
  } else if (request.direction) {
    request.busInternalCode = parseInt(request.busInternalCode).toString();
    var event = new CustomEvent('serviceDirectionDataReceived', {detail: request});
  }
  window.dispatchEvent(event);
  sendResponse({farewell: 'Received', object: request});
});

console.log('Initialized content script!');