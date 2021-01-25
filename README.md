# rpi_box
A hardware based game thats a mix of hot potato and simon says.

## My notes

## SSH

ss pi@192.168.0.167

cd ./git/rpi_box/

## Get new code
git pull

### Run
node./out/index.js

## Deploy

scp -r out pi@192.168.0.167:git/rpi_box

## misc

### stop onces it started

get process id second from the left

ps aux | grep node

process id was 449

sudo kill -9 449



### together
cd ./git/rpi_box && git pull && node ./out/index.js


