import { asErrorObject } from './catch-errors';
import { Config } from '../config/config';
import { ErrorLogWindow } from './error-log-window';
import { ErrorWindow } from './error-window';
import { inject, singleton } from 'tsyringe';
import { Logger } from '../logger/logger';
import { OnGoingEntry, TheWestWindow } from '../../@types/the-west';

@singleton()
export class ErrorTracker {
    private readonly log: Array<Error> = [];

    private readonly errorWindow: ErrorWindow;
    private readonly errorLogWindow: ErrorLogWindow;

    constructor(
        @inject('window') private readonly window: TheWestWindow,
        private readonly logger: Logger,
        private readonly config: Config,
    ) {
        this.errorWindow = new ErrorWindow(window, logger);
        this.errorLogWindow = new ErrorLogWindow(window, logger);
    }

    track(error: Error, component?: string): void {
        this.logger.debug('tracking error...', error);
        this.log.push(error);
        this.logger.error(error);
        this.window.WestUi.NotiBar.add(
            onGoingEntry(this.window, () => {
                this.errorWindow.show(error, component);
            }),
        );
        // send to tw-calc net
        this.window.$.get(
            this.config.website + '/service/send-error',
            {
                errorCode: component ? `${component} | ${error.toString()}` : error.toString(),
                name: this.window.Character.name,
                id: this.window.Character.playerId,
                server: this.window.Game.gameURL,
                locale: this.window.Game.locale,
                WestCalcVersion: this.config.version,
                GameVersion: this.window.Game.version,
            },
            function () {},
            'jsonp',
        );
    }

    execute(fn: () => void): void {
        try {
            fn();
        } catch (e: any) {
            const error = asErrorObject(e);
            this.track(error);
        }
    }

    open(): void {
        this.errorLogWindow.show(this.log);
    }
}

function onGoingEntry(window: TheWestWindow, cb: () => void): OnGoingEntry {
    const entry = new window.OnGoingEntry();
    entry.init('', cb);
    entry.setTooltip('TW-Calc Error');
    entry.setImageClass('hint');
    return entry;
}
