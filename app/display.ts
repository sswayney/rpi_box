import {LCD} from "../libs/lcdi2c";

export class Display {
    /**
     * LCD display
     * Uses pins 3 and 5
     */
    protected lcd = new LCD(1, 0x27, 16,2);

    constructor() {}

    public clear(): void {
        this.lcd.clear();
    }

    public println(value: string, line: number): void {
        this.lcd.println(value, line);
    }


}
