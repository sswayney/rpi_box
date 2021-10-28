#!/usr/bin/expect -f

spawn ssh pi@192.168.0.180
expect "password: "
send   "Voltron2020\r"

## Go to folder
#expect "$ "
#send "cd \r"
#
## list
#expect "$ "
#send "ls \r"

# Go to folder
expect "$ "
send "sudo node ./windows/rpi_box/out/index.js\r"

expect "$ "
send "exit\r"

interact
