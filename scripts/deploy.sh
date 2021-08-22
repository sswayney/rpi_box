#!/usr/bin/expect -f

spawn bash -c "scp -r out pi@192.168.0.167:git/rpi_box"
expect {
  -re ".*es.*o.*" {
    exp_send "yes\r"
    exp_continue
  }
  -re ".*sword.*" {
    exp_send "Voltron2020\r"
  }
}
interact
