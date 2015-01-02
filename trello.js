var SerialPort = require('serialport').SerialPort,
    serialPort = new SerialPort('/dev/ttyUSB0', {
        baudrate: 19200
    }),
    Printer = require('../src/printer'),
    Trello = require("node-trello"),
    trello = new Trello("0de5f43fafafa96673dba7a8558cc431", "e29127216cce9813ddca5400caa4d96de513b330b84683ea57688db4e9d06fe7");

serialPort.on('open',function() {
    var printer = new Printer(serialPort);
    printer.on('ready', function() {

        trello.get("/1/members/me", { cards: "open" }, function(err, data) {
            if (err) throw err;

            for (var i = 0; i < 10; i++) {
                printer.printLine(data.cards[i].name).lineFeed(3).print(function() {
                    console.log('printed');
                });
            };

            console.log(data.cards.length);
        });

    });
});

