import BaseDialog from "./BaseDialog";

interface InfoOptions {
  header?: string;
  closeLabel?: string;
}

export default class InfoDialog extends BaseDialog<any> {
  constructor(label: string, options?: InfoOptions, callback?: () => void) {
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

    // Buttons
    const buttonsElt = document.createElement("div");
    buttonsElt.className = "buttons";
    this.formElt.appendChild(buttonsElt);

    this.validateButtonElt = document.createElement("button");
    this.validateButtonElt.textContent = options.closeLabel != null ? options.closeLabel : BaseDialog.defaultLabels.close;
    this.validateButtonElt.className = "validate-button";
    buttonsElt.appendChild(this.validateButtonElt);

    this.validateButtonElt.focus();
  }
}
