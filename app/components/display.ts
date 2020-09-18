import {Observable} from "rxjs";
import {LCD} from "../../libs/lcdi2c";
import {PINS} from "../../libs/pins.enum";
import {EventResponder} from "../events/event-responder";
import {GameEventTypes} from "../events/events";

export class Display extends EventResponder {
    /**
     * LCD display
     * Uses pins 3 and 5
     */
    protected lcd = new LCD(1, 0x27, 16,2);

    constructor(private gameState$: Observable<GameEventTypes>) {
        super(gameState$);
        // this.lcd.clear();
        // this.lcd.home();
        // this.lcd.println('ENTER SEQUENCE',1);
        // this.lcd.println('####',2);
    }

    public clear(): void {
        this.lcd.clear();
    }

    public println(value: string, line: number): void {
        this.lcd.println(value, line);
    }

    handleValueChange(channel: number, value: any) {
        switch (channel) {
            case PINS.pin35_buttonWhite:
                this.lcd.clear();
                this.lcd.println('COLOR', 1);
                this.lcd.println('White', 2);
                break;
            case PINS.pin37_buttonYellow:
                this.lcd.clear();
                this.lcd.println('COLOR', 1);
                this.lcd.println('Yellow', 2);
                break;
            case PINS.pin40_buttonBlue:
                this.lcd.clear();
                this.lcd.println('COLOR', 1);
                this.lcd.println('Blue', 2);
                break;
        }
    }


}
