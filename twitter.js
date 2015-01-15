var SerialPort = require('serialport').SerialPort,
    serialPort = new SerialPort('/dev/ttyUSB0', {
        baudrate: 19200
    }),
    Printer = require('thermalprinter'),
    Twitter = require('node-twitter');

var twitterStreamClient = new Twitter.StreamClient(
    '1B5KBUELhN2NY1zuDs0xxyO8p',
    'y6XMwwVVTC3CUaZAEYm1DZWa3FF3XVnKNRXLWlvEA0aEFAeWyn',
    '102975831-9JzJ4wuYfXyUuEww1N6UHUFdsl1W4jkqtgSIsLvr',
    'XnD4yRh6g95FidbRrMZWvJmuG0nH8B06uMytL2EYdrFEE'
);

var keywords = [process.argv[2]] || ['#whitegirlproblems'],
    locations = [process.argv[3]] || null,
    users = [process.argv[4]] || null;

serialPort.on('open',function() {
    var printer = new Printer(serialPort);
    printer.on('ready', function() {
        twitterStreamClient.on('close', function() {
            console.log('Connection closed.');
        });
        twitterStreamClient.on('end', function() {
            console.log('End of Line.');
        });
        twitterStreamClient.on('error', function(error) {
            console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
        });
        twitterStreamClient.on('tweet', function(tweet) {
            printer.printLine(tweet.text).lineFeed(3).print(function() {
                console.log(tweet);
            });
        });

        twitterStreamClient.start(keywords, locations, users);
    });
});
