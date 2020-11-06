import { ErrorLogWindow } from './error-log-window';
import { inject, singleton } from 'tsyringe';
import { Language } from '../language/language';
import { Logger } from '../logger/logger';
import { TheWestWindow } from '../../@types/the-west';

@singleton()
export class ErrorLog {
    public readonly window: ErrorLogWindow;

    constructor(@inject('window') window: TheWestWindow, language: Language, logger: Logger) {
        this.window = new ErrorLogWindow(window, language, logger);
    }
}
