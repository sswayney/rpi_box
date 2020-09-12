import {LCD} from "../libs/lcdi2c";

export class Display {
    /**
     * LCD display
     * Uses pins 3 and 5
     */
    protected lcd = new LCD(1, 0x27, 16,2);

    constructor() {
        this.lcd.clear();
        this.lcd.println('ENTER SEQUENCE',1);
        this.lcd.println('####',2);
    }

    public clear(): void {
        this.lcd.clear();
    }

    public println(value: string, line: number): void {
        this.lcd.println(value, line);
    }


}
