(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SimpleDialogs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BaseDialog = (function () {
    function BaseDialog(callback) {
        var _this = this;
        this.callback = callback;
        this.onDocumentKeyDown = function (event) {
            if (event.keyCode === 27) {
                event.preventDefault();
                _this.cancel();
            }
        };
        if (BaseDialog.activeDialog != null)
            throw new Error("Cannot open two dialogs at the same time.");
        BaseDialog.activeDialog = this;
        this.dialogElt = document.createElement("div");
        this.dialogElt.className = "dialog";
        this.formElt = document.createElement("form");
        this.dialogElt.appendChild(this.formElt);
        this.formElt.addEventListener("submit", function (event) {
            if (!_this.formElt.checkValidity())
                return;
            event.preventDefault();
            _this.submit();
        });
        document.addEventListener("keydown", this.onDocumentKeyDown);
        document.body.appendChild(this.dialogElt);
    }
    BaseDialog.prototype.submit = function (result) {
        if (!this.formElt.checkValidity()) {
            // Trigger form validation
            this.validateButtonElt.click();
            return;
        }
        this.dismiss();
        if (this.callback != null)
            this.callback(result);
    };
    BaseDialog.prototype.cancel = function (result) {
        this.dismiss();
        if (this.callback != null)
            this.callback(result);
    };
    BaseDialog.prototype.dismiss = function () {
        BaseDialog.activeDialog = null;
        document.body.removeChild(this.dialogElt);
        document.removeEventListener("keydown", this.onDocumentKeyDown);
    };
    BaseDialog.defaultLabels = {
        "validate": "Validate",
        "cancel": "Cancel",
        "close": "Close"
    };
    return BaseDialog;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseDialog;

},{}],2:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseDialog_1 = require("./BaseDialog");
var ConfirmDialog = (function (_super) {
    __extends(ConfirmDialog, _super);
    function ConfirmDialog(label, options, callback) {
        var _this = this;
        _super.call(this, callback);
        if (options == null)
            options = {};
        var labelElt = document.createElement("label");
        labelElt.textContent = label;
        this.formElt.appendChild(labelElt);
        // Buttons
        var buttonsElt = document.createElement("div");
        buttonsElt.className = "buttons";
        this.formElt.appendChild(buttonsElt);
        var cancelButtonElt = document.createElement("button");
        cancelButtonElt.type = "button";
        cancelButtonElt.textContent = options.cancelLabel != null ? options.cancelLabel : BaseDialog_1.default.defaultLabels.cancel;
        cancelButtonElt.className = "cancel-button";
        cancelButtonElt.addEventListener("click", function (event) { event.preventDefault(); _this.cancel(); });
        this.validateButtonElt = document.createElement("button");
        this.validateButtonElt.textContent = options.validationLabel != null ? options.validationLabel : BaseDialog_1.default.defaultLabels.validate;
        this.validateButtonElt.className = "validate-button";
        if (navigator.platform === "Win32") {
            buttonsElt.appendChild(this.validateButtonElt);
            buttonsElt.appendChild(cancelButtonElt);
        }
        else {
            buttonsElt.appendChild(cancelButtonElt);
            buttonsElt.appendChild(this.validateButtonElt);
        }
        this.validateButtonElt.focus();
    }
    ConfirmDialog.prototype.submit = function () { _super.prototype.submit.call(this, true); };
    ConfirmDialog.prototype.cancel = function () { _super.prototype.cancel.call(this, false); };
    return ConfirmDialog;
})(BaseDialog_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConfirmDialog;

},{"./BaseDialog":1}],3:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseDialog_1 = require("./BaseDialog");
var InfoDialog = (function (_super) {
    __extends(InfoDialog, _super);
    function InfoDialog(label, options, callback) {
        _super.call(this, callback);
        if (options == null)
            options = {};
        var labelElt = document.createElement("label");
        labelElt.textContent = label;
        this.formElt.appendChild(labelElt);
        // Buttons
        var buttonsElt = document.createElement("div");
        buttonsElt.className = "buttons";
        this.formElt.appendChild(buttonsElt);
        this.validateButtonElt = document.createElement("button");
        this.validateButtonElt.textContent = options.closeLabel != null ? options.closeLabel : BaseDialog_1.default.defaultLabels.close;
        this.validateButtonElt.className = "validate-button";
        buttonsElt.appendChild(this.validateButtonElt);
        this.validateButtonElt.focus();
    }
    return InfoDialog;
})(BaseDialog_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InfoDialog;

},{"./BaseDialog":1}],4:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseDialog_1 = require("./BaseDialog");
var PromptDialog = (function (_super) {
    __extends(PromptDialog, _super);
    function PromptDialog(label, options, callback) {
        var _this = this;
        _super.call(this, callback);
        if (options == null)
            options = {};
        var labelElt = document.createElement("label");
        labelElt.textContent = label;
        this.formElt.appendChild(labelElt);
        this.inputElt = document.createElement("input");
        if (options.type != null)
            this.inputElt.type = options.type;
        if (options.initialValue != null)
            this.inputElt.value = options.initialValue;
        if (options.placeholder != null)
            this.inputElt.placeholder = options.placeholder;
        if (options.pattern != null)
            this.inputElt.pattern = options.pattern;
        if (options.title != null)
            this.inputElt.title = options.title;
        this.inputElt.required = (options.required != null) ? options.required : true;
        this.formElt.appendChild(this.inputElt);
        // Buttons
        var buttonsElt = document.createElement("div");
        buttonsElt.className = "buttons";
        this.formElt.appendChild(buttonsElt);
        var cancelButtonElt = document.createElement("button");
        cancelButtonElt.type = "button";
        cancelButtonElt.textContent = options.cancelLabel != null ? options.cancelLabel : BaseDialog_1.default.defaultLabels.cancel;
        cancelButtonElt.className = "cancel-button";
        cancelButtonElt.addEventListener("click", function (event) { event.preventDefault(); _this.cancel(); });
        this.validateButtonElt = document.createElement("button");
        this.validateButtonElt.textContent = options.validationLabel != null ? options.validationLabel : BaseDialog_1.default.defaultLabels.validate;
        this.validateButtonElt.className = "validate-button";
        if (navigator.platform === "Win32") {
            buttonsElt.appendChild(this.validateButtonElt);
            buttonsElt.appendChild(cancelButtonElt);
        }
        else {
            buttonsElt.appendChild(cancelButtonElt);
            buttonsElt.appendChild(this.validateButtonElt);
        }
        this.inputElt.select();
    }
    PromptDialog.prototype.submit = function () { _super.prototype.submit.call(this, this.inputElt.value); };
    return PromptDialog;
})(BaseDialog_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PromptDialog;

},{"./BaseDialog":1}],5:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseDialog_1 = require("./BaseDialog");
var SelectDialog = (function (_super) {
    __extends(SelectDialog, _super);
    function SelectDialog(label, choices, options, callback) {
        var _this = this;
        _super.call(this, callback);
        if (options == null)
            options = {};
        // Label
        var labelElt = document.createElement("label");
        labelElt.textContent = label;
        this.formElt.appendChild(labelElt);
        // Select
        this.selectElt = document.createElement("select");
        for (var choiceName in choices) {
            var optionElt = document.createElement("option");
            optionElt.value = choiceName;
            optionElt.textContent = choices[choiceName];
            this.selectElt.appendChild(optionElt);
        }
        if (options.size != null)
            this.selectElt.size = options.size;
        this.formElt.appendChild(this.selectElt);
        this.selectElt.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                _this.submit();
            }
        });
        this.selectElt.addEventListener("dblclick", function () { _this.submit(); });
        // Buttons
        var buttonsElt = document.createElement("div");
        buttonsElt.className = "buttons";
        this.formElt.appendChild(buttonsElt);
        var cancelButtonElt = document.createElement("button");
        cancelButtonElt.type = "button";
        cancelButtonElt.textContent = options.cancelLabel != null ? options.cancelLabel : BaseDialog_1.default.defaultLabels.cancel;
        cancelButtonElt.className = "cancel-button";
        cancelButtonElt.addEventListener("click", function (event) { event.preventDefault(); _this.cancel(); });
        this.validateButtonElt = document.createElement("button");
        this.validateButtonElt.textContent = options.validationLabel != null ? options.validationLabel : BaseDialog_1.default.defaultLabels.validate;
        this.validateButtonElt.className = "validate-button";
        if (navigator.platform === "Win32") {
            buttonsElt.appendChild(this.validateButtonElt);
            buttonsElt.appendChild(cancelButtonElt);
        }
        else {
            buttonsElt.appendChild(cancelButtonElt);
            buttonsElt.appendChild(this.validateButtonElt);
        }
        this.selectElt.focus();
    }
    SelectDialog.prototype.submit = function () { _super.prototype.submit.call(this, (this.selectElt.value !== "") ? this.selectElt.value : null); };
    return SelectDialog;
})(BaseDialog_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SelectDialog;

},{"./BaseDialog":1}],6:[function(require,module,exports){
/* tslint:disable:no-unused-variable */
var BaseDialog_1 = require("./BaseDialog");
exports.BaseDialog = BaseDialog_1.default;
var PromptDialog_1 = require("./PromptDialog");
exports.PromptDialog = PromptDialog_1.default;
var ConfirmDialog_1 = require("./ConfirmDialog");
exports.ConfirmDialog = ConfirmDialog_1.default;
var InfoDialog_1 = require("./InfoDialog");
exports.InfoDialog = InfoDialog_1.default;
var SelectDialog_1 = require("./SelectDialog");
exports.SelectDialog = SelectDialog_1.default;
/* tslint:enable:no-unused-variable */
function cancelDialogIfAny() {
    if (BaseDialog_1.default.activeDialog != null)
        BaseDialog_1.default.activeDialog.cancel();
}
exports.cancelDialogIfAny = cancelDialogIfAny;

},{"./BaseDialog":1,"./ConfirmDialog":2,"./InfoDialog":3,"./PromptDialog":4,"./SelectDialog":5}]},{},[6])(6)
});