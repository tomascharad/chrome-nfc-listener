var buffer = '';
chrome.runtime.onMessageExternal.addListener(function(message, sender, sendResponse) {
  var messageString = message.data.toString();
  buffer = buffer + messageString;
  if (buffer.match('.*PRESENT:\\$CON\\$.*\\$.*')) {
    driverDataReceived(buffer);
    buffer = '';
  }
});

function driverDataReceived(driverData) {
  console.log(driverData.match('[0-9]*-[0-9]|K|k')[0]);
}

console.log('started');
alert('started');