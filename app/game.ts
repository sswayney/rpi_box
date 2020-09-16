import * as gpio from 'rpi-gpio';
import {ButtonLED} from "../libs/button-led";
import {LCD} from "../libs/lcdi2c";
import {PINS} from "../libs/pins.enum";
import {Switch} from "../libs/switch";
import {TM1637} from "../libs/tm1637";
import {Buttons} from "./components/buttons";
import {CountDown} from "./components/count-down";
import {Display} from "./components/display";
import {Updateable} from "./intefaces/updateable";
import {Switches} from "./components/switches";


/**
 * Main Game
 */
export class Game {

    /**
     * Various States the game can be in.
     */
    public static State: 'EnterSequence' | 'Defuse' | 'Explode' | 'FixSwitches' = 'EnterSequence';

    /**
     * Switches
     */
    protected switches = new Switches();

    /**
     * Buttons
     */
    protected buttons = new Buttons();

    /**
     * Count down that uses the 7 segment display
     */
    protected countDown = new CountDown();

    /**
     * LCD display
     */
    protected display = new  Display();

    protected updaters: Updateable[] = [];

    constructor() {
      this.updaters.push(this.buttons);
      this.updaters.push(this.countDown);
      this.updaters.push(this.display);
    }

    public async start(): Promise<void> {

        console.log('Red switch Val', await this.switches.red.getValue());
        console.log('Green switch Val', await this.switches.green.getValue());

        /**
         * Value change listener
         */
        gpio.on('change', this.channelValueListener());

    }

    protected channelValueListener(): (...args: any[]) => void {
        const lastValues: Map<any, any> = new Map();
        return (channel, value) => {

            if (lastValues.get(channel) !== value) {
                lastValues.set(channel, value);
                // console.log('Channel ' + channel + ' value is now ' + value);

                /**
                 * Pass update values to all update able components
                 */
                this.updaters.forEach((u: Updateable) => u.update(channel,value))

            }
        }

    }
}
