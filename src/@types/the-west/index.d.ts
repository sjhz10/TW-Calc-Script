export namespace tw2gui {
    export interface Dialog {
        addButton(text: string, cb: () => void): Dialog;
        setTitle(title: string): Dialog;
        setText(text: string): Dialog;

        show(): void;
    }

    export interface DialogConstructor {
        SYS_WARNING: string;
        SYS_OK: string;

        new (title?: string, text?: string, type?: string): Dialog;
    }

    export interface Combobox<T> {
        setWidth(width: number): Combobox<T>;
        addItem(value: T, label: string): Combobox<T>;
        select(option: number): Combobox<T>;
        getMainDiv(): JQuery;
        getValue(): T;
        addListener(cb: (value: T) => void): Combobox<T>;
    }

    export interface ComboboxConstructor {
        new <T>(id: string): Combobox<T>;
    }

    export interface Checkbox {
        setId(id: string): Checkbox;
        setId(id: string, groupClass: string): Checkbox;
        isSelected(): boolean;
        setRadiobutton(): Checkbox;
        setLabel(label: string): Checkbox;
        setSelected(state: boolean): Checkbox;
        setEnabled(state: boolean): Checkbox;
        getValue(): boolean;
        setCallback(cb: () => void): Checkbox;
        getMainDiv(): JQuery;
    }

    export interface CheckboxConstructor {
        new (label: string): Checkbox;
    }

    export interface Button {
        setCaption(text: string): Button;
        click(cb: () => void): Button;
        getMainDiv(): JQuery;
    }

    export interface ButtonConstructor {
        new (): Button;
    }

    export interface UserMessage {
        show: () => void;
    }

    export interface UserMessageConstructor {
        TYPE_SUCCESS: 'success';
        TYPE_ERROR: 'error';
        TYPE_HINT: 'hint';

        new (data: any): UserMessage;
    }

    export interface Window {
        divMain: JQuery;
        draggable: boolean;
        id: string;
        sizeRange: { x: Array<number>; y: Array<number> };

        setMiniTitle(title: string): Window;
        setTitle(title: string): Window;
        addTab(title: string, id: string): Window;
        addTab(title: string, id: string, onActivate: () => void): Window;
        activateTab(id: string): Window;
        appendToContentPane(content: JQuery | string): Window;
    }
}

export type MessageSuccessConstructor = (text: string) => tw2gui.UserMessage;
export type MessageErrorConstructor = (text: string) => tw2gui.UserMessage;
export type MessageHintConstructor = (text: string) => tw2gui.UserMessage;

export interface WestGui {
    Dialog: tw2gui.DialogConstructor;
    Combobox: tw2gui.ComboboxConstructor;
    Checkbox: tw2gui.CheckboxConstructor;
    Button: tw2gui.ButtonConstructor;
}

export interface West {
    gui: WestGui;
}

export interface TheWestApi {
    register: (
        key: string,
        name: string,
        minVersion: string,
        maxVersion: string,
        author: string,
        website: string,
    ) => GameScript;
}

export interface GameScript {
    key: string;
    name: string;
    minVersion: string;
    maxVersion: string;
    author: string;
    website: string;

    setGui(content: JQuery): void;
}

export interface Ajax {
    get: <T extends any>(
        window: string,
        ajax: string,
        param: Record<string, string>,
        callback: (data: T) => void,
    ) => void;
}

export namespace TheWest {
    export interface WindowManager {
        open(id: string, title: string, classes: string): tw2gui.Window;
    }

    export interface Game {
        locale: string;
        version: string;
        gameURL: string;
    }

    export type Map = any;

    export interface Character {
        name: string;
        playerId: number;
    }
}

export interface TheWestWindow extends Window {
    Game: TheWest.Game;
    $: JQueryStatic;
    west: West;
    MessageSuccess: MessageSuccessConstructor;
    MessageHint: MessageHintConstructor;
    MessageError: MessageErrorConstructor;
    wman: TheWest.WindowManager;
    TheWestApi: TheWestApi;
    Character: TheWest.Character;
    Ajax: Ajax;
    UserMessage: tw2gui.UserMessageConstructor;
}
