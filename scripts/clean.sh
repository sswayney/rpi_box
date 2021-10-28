#!/usr/bin/expect -f

spawn ssh pi@192.168.0.180
expect "password: "
send   "Voltron2020\r"

# Go to folder
expect "$ "
send "cd ./windows\r"

# Clean
expect "$ "
send "find . -type f -iname \*.js -delete\r"




## list
#expect "$ "
#send "ls \r"
#
## Go to folder
#expect "$ "
#send "rm -r app libs\r"

expect "$ "
send "exit\r"

interact
