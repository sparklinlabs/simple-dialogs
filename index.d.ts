declare namespace SimpleDialogs {
  export function cancelDialogIfAny(): void;
  export abstract class BaseDialog<T> {
    static activeDialog: BaseDialog<any>;
    static defaultLabels: { [key: string]: string };

    protected dialogElt: HTMLDivElement;
    protected formElt: HTMLFormElement;
    protected validateButtonElt: HTMLButtonElement;
    protected callback: Function;

    constructor(callback: (result: T) => void);
    protected submit(result?: T): void;
    protected cancel(result?: T): void;
  }

  interface ConfirmOptions {
    validationLabel?: string;
    cancelLabel?: string;
  }
  type ConfirmResult = boolean;
  export class ConfirmDialog extends BaseDialog<ConfirmResult> {
    constructor(label: string, options?: ConfirmOptions, callback?: (result: ConfirmResult) => any);
  }

  interface InfoOptions {
    closeLabel?: string;
  }
  export class InfoDialog extends BaseDialog<any> {
    constructor(label: string, options?: InfoOptions, callback?: () => any);
  }

  interface PromptOptions {
    validationLabel?: string;
    cancelLabel?: string;
    type?: string;
    initialValue?: string;
    placeholder?: string;
    pattern?: string;
    title?: string;
    required?: boolean;
  }
  type PromptResult = string;
  export class PromptDialog extends BaseDialog<PromptResult> {
    constructor(label: string, options?: PromptOptions, callback?: (result: PromptResult) => void);
  }

  interface SelectOptions {
    validationLabel?: string;
    cancelLabel?: string;
    size?: number;
  }
  type SelectResult = string;
  export class SelectDialog extends BaseDialog<SelectResult> {
    constructor(label: string, choices: { [value: string]: string; }, options?: SelectOptions, callback?: (result: SelectResult) => void)
  }
}

export = SimpleDialogs;
