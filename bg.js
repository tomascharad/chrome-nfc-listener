var buffer = '';
chrome.runtime.onMessageExternal.addListener(function(message, sender, sendResponse) {
  var messageString = message.data.toString();
  buffer = buffer + messageString;
  if (buffer.match('.*PRESENT:\\$CON\\$.*\\$.*')) {
    driverDataReceived(buffer);
    buffer = '';
  }
  if (buffer.match('.*PRESENT:\\$BUS\\$.*\\$.*')) {
    busDataReceived(buffer);
    buffer = '';
  }
});

function driverDataReceived(driverData) {
  sendMessage({driverId: driverData.match('[0-9]*-[0-9]|K|k')[0]});
}

function busDataReceived(busData) {
  // console.log(driverData.match('$BUS.*$')[0]);
  var busInternalCode = busData.match('\\$BUS.*\\$')[0].split('BUS')[2];
  sendMessage({busInternalCode: busInternalCode.slice(0, busInternalCode.length - 1)});
}

function sendMessage (message) {
  console.log(message);
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.sendMessage(tab.id, message, function(response) {
        if (response) {
          console.log(response);
        }
      });
    });
  });
}

console.log('started');