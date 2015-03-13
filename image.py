#!/usr/bin/python

from Adafruit_Thermal import *

printer = Adafruit_Thermal("/dev/ttyAMA0", 19200, timeout=5)

printer.feed(1)

import gfx.adaqrcode as adaqrcode
printer.printBitmap(adaqrcode.width, adaqrcode.height, adaqrcode.data)
printer.println("Printing!")

image = Image.open("img/test-pattern.jpg")

printer.printImage(image);

printer.println("Printed!")
printer.feed(1)

printer.sleep()      # Tell printer to sleep
printer.wake()       # Call wake() before printing again, even if reset
printer.setDefault() # Restore printer to defaults
