var LCD = require('lcdi2c');

var lcd = new LCD(1, 0x27, 16,2);

lcd.clear();
lcd.println('Line one',1);
lcd.println('Line Two!!!',2);
//lcd.print('this            ',2);