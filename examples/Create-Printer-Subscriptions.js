const ipp = require('../ipp');

// Create subscription to events from all of the printers registered on a cups server.
const printerUri = 'http://localhost:631/printers';

(async function getSubscriptions() {
  const printer = new ipp.Printer(printerUri);
  var msg = {
    'operation-attributes-tag': {
      'requesting-user-name': '',
    },
    'subscription-attributes-tag': {
      'notify-recipient-uri': 'http://recipient-uri',
      'notify-events': ['all'],
      // Subscription duration in seconds. Default value is 86400 (1 day). 0 means indefinite length subscription.
      'notify-lease-duration': 0,
    },
  };
  printer.execute('Create-Printer-Subscriptions', msg, function (err, res) {
    if (err) console.log(err);
    console.log(res);
  });
})();
