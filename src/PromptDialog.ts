import BaseDialog from "./BaseDialog";

interface PromptOptions {
  header?: string;
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

export default class PromptDialog extends BaseDialog<PromptResult> {
  inputElt: HTMLInputElement;

  constructor(label: string, options?: PromptOptions, callback?: (result: PromptResult) => void) {
    super(callback);
    if (options == null) options = {};

    if (options.header != null) {
      const header = document.createElement("header");
      header.textContent = options.header;
      this.formElt.appendChild(header);
    }

    const promptElt = document.createElement("div");
    promptElt.className = "group";
    promptElt.textContent = label;
    this.formElt.appendChild(promptElt);

    const inputGroup = document.createElement("div");
    inputGroup.className = "group";
    this.formElt.appendChild(inputGroup);

    this.inputElt = document.createElement("input");
    this.inputElt.style.width = "100%";

    if (options.type != null) this.inputElt.type = options.type;
    if (options.initialValue != null) this.inputElt.value = options.initialValue;
    if (options.placeholder != null) this.inputElt.placeholder = options.placeholder;
    if (options.pattern != null) this.inputElt.pattern = options.pattern;
    if (options.title != null) this.inputElt.title = options.title;
    this.inputElt.required = (options.required != null) ? options.required : true;
    inputGroup.appendChild(this.inputElt);

    // Buttons
    const buttonsElt = document.createElement("div");
    buttonsElt.className = "buttons";
    this.formElt.appendChild(buttonsElt);

    const cancelButtonElt = document.createElement("button");
    cancelButtonElt.type = "button";
    cancelButtonElt.textContent = options.cancelLabel != null ? options.cancelLabel : BaseDialog.defaultLabels.cancel;
    cancelButtonElt.className = "cancel-button";
    cancelButtonElt.addEventListener("click", (event) => { event.preventDefault(); this.cancel(); });

    this.validateButtonElt = document.createElement("button");
    this.validateButtonElt.textContent = options.validationLabel != null ? options.validationLabel : BaseDialog.defaultLabels.validate;
    this.validateButtonElt.className = "validate-button";

    if (navigator.platform === "Win32") {
      buttonsElt.appendChild(this.validateButtonElt);
      buttonsElt.appendChild(cancelButtonElt);
    } else {
      buttonsElt.appendChild(cancelButtonElt);
      buttonsElt.appendChild(this.validateButtonElt);
    }

    this.inputElt.select();
  }

  submit() { super.submit(this.inputElt.value); }
}
