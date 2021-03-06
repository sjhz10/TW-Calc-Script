import { Language } from '../language/language';
import { Logger } from '../logger/logger';
import { TheWestWindow } from '../../@types/the-west';
import { TW2Window } from '../tw2-window/tw2-window';

export class WardrobeWindow extends TW2Window {
    constructor(window: TheWestWindow, language: Language, logger: Logger) {
        super('TWCalcWardrobe', window, language, logger, { title: { type: 'translation', translation: 170 } });
    }

    open(tab?: string): void {
        super.open(tab);
    }
}
