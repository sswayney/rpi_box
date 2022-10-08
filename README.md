# rpi_box
Haunted Mansion Door Knob

## My notes
### So, rpi-gpio has no real support for PWM
We need input and output of pulse width for things like servos and distance measurement.

This looks good: https://github.com/fivdi/pigpio

A prerequisite is that we must have this lib installed on the pi: http://abyz.me.uk/rpi/pigpio/download.html

And if we use pigio, then should we just move over to it completely? Don't use rpi-gpio

## Install Node Globally
https://www.makersupplies.sg/blogs/tutorials/how-to-install-node-js-and-npm-on-the-raspberry-pi
FOR RASP ZERO: https://hassancorrigan.com/blog/install-nodejs-on-a-raspberry-pi-zero/

## rpi.gpo
https://www.raspberrypi-spy.co.uk/2012/05/install-rpi-gpio-python-library/

## Install Epoll - needed by rpi-gpio
https://github.com/fivdi/epoll


## SSH

ss pi@192.168.0.180

cd ./git/rpi_box/

## Get new code
git pull

### Run
node./out/index.js

## Deploy

scp -r out pi@192.168.0.180:git/rpi_box

## misc

### stop onces it started

get process id second from the left

ps aux | grep node

process id was 449

sudo kill -9 449

### together
cd ./git/rpi_box && git pull && node ./out/index.js

##Current working notes
Trying to stop use git as a way to deploy. Looks like I was setting up some scripts.



