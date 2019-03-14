(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SimpleDialogs = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseDialog = /** @class */ (function () {
    function BaseDialog(callback) {
        var _this = this;
        this.callback = callback;
        this.focusedElt = document.activeElement;
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
        this.focusedElt.focus();
    };
    BaseDialog.defaultLabels = {
        "validate": "Validate",
        "cancel": "Cancel",
        "close": "Close"
    };
    return BaseDialog;
}());
exports.default = BaseDialog;

},{}],2:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseDialog_1 = _dereq_("./BaseDialog");
var checkboxNextId = 0;
var ConfirmDialog = /** @class */ (function (_super) {
    __extends(ConfirmDialog, _super);
    function ConfirmDialog(label, options, callback) {
        var _this = _super.call(this, callback) || this;
        if (options == null)
            options = {};
        if (options.header != null) {
            var header = document.createElement("header");
            header.textContent = options.header;
            _this.formElt.appendChild(header);
        }
        var promptElt = document.createElement("div");
        promptElt.className = "group";
        promptElt.textContent = label;
        _this.formElt.appendChild(promptElt);
        // Checkbox
        if (options.checkboxLabel != null) {
            var checkboxContainerElt = document.createElement("div");
            checkboxContainerElt.classList.add("group");
            checkboxContainerElt.classList.add("checkbox");
            _this.formElt.appendChild(checkboxContainerElt);
            var checkboxElt_1 = document.createElement("input");
            checkboxElt_1.id = "simpleDialogsConfirmCheckbox" + checkboxNextId++;
            checkboxElt_1.type = "checkbox";
            checkboxContainerElt.appendChild(checkboxElt_1);
            var labelElt = document.createElement("label");
            labelElt.htmlFor = checkboxElt_1.id;
            labelElt.textContent = options.checkboxLabel;
            checkboxContainerElt.appendChild(labelElt);
            checkboxElt_1.addEventListener("change", function () { _this.validateButtonElt.disabled = !checkboxElt_1.checked; });
        }
        // Buttons
        var buttonsElt = document.createElement("div");
        buttonsElt.className = "buttons";
        _this.formElt.appendChild(buttonsElt);
        var cancelButtonElt = document.createElement("button");
        cancelButtonElt.type = "button";
        cancelButtonElt.textContent = options.cancelLabel != null ? options.cancelLabel : BaseDialog_1.default.defaultLabels.cancel;
        cancelButtonElt.className = "cancel-button";
        cancelButtonElt.addEventListener("click", function (event) { event.preventDefault(); _this.cancel(); });
        _this.validateButtonElt = document.createElement("button");
        _this.validateButtonElt.textContent = options.validationLabel != null ? options.validationLabel : BaseDialog_1.default.defaultLabels.validate;
        _this.validateButtonElt.className = "validate-button";
        // If there is a checkbox, disable Validate button until checkbox is checked
        _this.validateButtonElt.disabled = options.checkboxLabel != null;
        if (navigator.platform === "Win32") {
            buttonsElt.appendChild(_this.validateButtonElt);
            buttonsElt.appendChild(cancelButtonElt);
        }
        else {
            buttonsElt.appendChild(cancelButtonElt);
            buttonsElt.appendChild(_this.validateButtonElt);
        }
        _this.validateButtonElt.focus();
        return _this;
    }
    ConfirmDialog.prototype.submit = function () { _super.prototype.submit.call(this, true); };
    ConfirmDialog.prototype.cancel = function () { _super.prototype.cancel.call(this, false); };
    return ConfirmDialog;
}(BaseDialog_1.default));
exports.default = ConfirmDialog;

},{"./BaseDialog":1}],3:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseDialog_1 = _dereq_("./BaseDialog");
var InfoDialog = /** @class */ (function (_super) {
    __extends(InfoDialog, _super);
    function InfoDialog(label, options, callback) {
        var _this = _super.call(this, callback) || this;
        if (options == null)
            options = {};
        if (options.header != null) {
            var header = document.createElement("header");
            header.textContent = options.header;
            _this.formElt.appendChild(header);
        }
        var promptElt = document.createElement("div");
        promptElt.className = "group";
        promptElt.textContent = label;
        _this.formElt.appendChild(promptElt);
        // Buttons
        var buttonsElt = document.createElement("div");
        buttonsElt.className = "buttons";
        _this.formElt.appendChild(buttonsElt);
        _this.validateButtonElt = document.createElement("button");
        _this.validateButtonElt.textContent = options.closeLabel != null ? options.closeLabel : BaseDialog_1.default.defaultLabels.close;
        _this.validateButtonElt.className = "validate-button";
        buttonsElt.appendChild(_this.validateButtonElt);
        _this.validateButtonElt.focus();
        return _this;
    }
    return InfoDialog;
}(BaseDialog_1.default));
exports.default = InfoDialog;

},{"./BaseDialog":1}],4:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseDialog_1 = _dereq_("./BaseDialog");
var PromptDialog = /** @class */ (function (_super) {
    __extends(PromptDialog, _super);
    function PromptDialog(label, options, callback) {
        var _this = _super.call(this, callback) || this;
        if (options == null)
            options = {};
        if (options.header != null) {
            var header = document.createElement("header");
            header.textContent = options.header;
            _this.formElt.appendChild(header);
        }
        var promptElt = document.createElement("div");
        promptElt.className = "group";
        promptElt.textContent = label;
        _this.formElt.appendChild(promptElt);
        var inputGroup = document.createElement("div");
        inputGroup.className = "group";
        _this.formElt.appendChild(inputGroup);
        _this.inputElt = document.createElement("input");
        _this.inputElt.style.width = "100%";
        if (options.type != null)
            _this.inputElt.type = options.type;
        if (options.initialValue != null)
            _this.inputElt.value = options.initialValue;
        if (options.placeholder != null)
            _this.inputElt.placeholder = options.placeholder;
        if (options.pattern != null)
            _this.inputElt.pattern = options.pattern;
        if (options.title != null)
            _this.inputElt.title = options.title;
        _this.inputElt.required = (options.required != null) ? options.required : true;
        inputGroup.appendChild(_this.inputElt);
        // Buttons
        var buttonsElt = document.createElement("div");
        buttonsElt.className = "buttons";
        _this.formElt.appendChild(buttonsElt);
        var cancelButtonElt = document.createElement("button");
        cancelButtonElt.type = "button";
        cancelButtonElt.textContent = options.cancelLabel != null ? options.cancelLabel : BaseDialog_1.default.defaultLabels.cancel;
        cancelButtonElt.className = "cancel-button";
        cancelButtonElt.addEventListener("click", function (event) { event.preventDefault(); _this.cancel(); });
        _this.validateButtonElt = document.createElement("button");
        _this.validateButtonElt.textContent = options.validationLabel != null ? options.validationLabel : BaseDialog_1.default.defaultLabels.validate;
        _this.validateButtonElt.className = "validate-button";
        if (navigator.platform === "Win32") {
            buttonsElt.appendChild(_this.validateButtonElt);
            buttonsElt.appendChild(cancelButtonElt);
        }
        else {
            buttonsElt.appendChild(cancelButtonElt);
            buttonsElt.appendChild(_this.validateButtonElt);
        }
        _this.inputElt.select();
        return _this;
    }
    PromptDialog.prototype.submit = function () { _super.prototype.submit.call(this, this.inputElt.value); };
    return PromptDialog;
}(BaseDialog_1.default));
exports.default = PromptDialog;

},{"./BaseDialog":1}],5:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseDialog_1 = _dereq_("./BaseDialog");
var SelectDialog = /** @class */ (function (_super) {
    __extends(SelectDialog, _super);
    function SelectDialog(label, choices, options, callback) {
        var _this = _super.call(this, callback) || this;
        if (options == null)
            options = {};
        if (options.header != null) {
            var header = document.createElement("header");
            header.textContent = options.header;
            _this.formElt.appendChild(header);
        }
        var promptElt = document.createElement("div");
        promptElt.className = "group";
        promptElt.textContent = label;
        _this.formElt.appendChild(promptElt);
        // Select
        var selectGroup = document.createElement("div");
        selectGroup.className = "group";
        _this.formElt.appendChild(selectGroup);
        _this.selectElt = document.createElement("select");
        _this.selectElt.style.width = "100%";
        for (var choiceName in choices) {
            var optionElt = document.createElement("option");
            optionElt.value = choiceName;
            optionElt.textContent = choices[choiceName];
            _this.selectElt.appendChild(optionElt);
        }
        if (options.size != null)
            _this.selectElt.size = options.size;
        selectGroup.appendChild(_this.selectElt);
        _this.selectElt.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                _this.submit();
            }
        });
        _this.selectElt.addEventListener("dblclick", function () { _this.submit(); });
        // Buttons
        var buttonsElt = document.createElement("div");
        buttonsElt.className = "buttons";
        _this.formElt.appendChild(buttonsElt);
        var cancelButtonElt = document.createElement("button");
        cancelButtonElt.type = "button";
        cancelButtonElt.textContent = options.cancelLabel != null ? options.cancelLabel : BaseDialog_1.default.defaultLabels.cancel;
        cancelButtonElt.className = "cancel-button";
        cancelButtonElt.addEventListener("click", function (event) { event.preventDefault(); _this.cancel(); });
        _this.validateButtonElt = document.createElement("button");
        _this.validateButtonElt.textContent = options.validationLabel != null ? options.validationLabel : BaseDialog_1.default.defaultLabels.validate;
        _this.validateButtonElt.className = "validate-button";
        if (navigator.platform === "Win32") {
            buttonsElt.appendChild(_this.validateButtonElt);
            buttonsElt.appendChild(cancelButtonElt);
        }
        else {
            buttonsElt.appendChild(cancelButtonElt);
            buttonsElt.appendChild(_this.validateButtonElt);
        }
        _this.selectElt.focus();
        return _this;
    }
    SelectDialog.prototype.submit = function () { _super.prototype.submit.call(this, (this.selectElt.value !== "") ? this.selectElt.value : null); };
    return SelectDialog;
}(BaseDialog_1.default));
exports.default = SelectDialog;

},{"./BaseDialog":1}],6:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var BaseDialog_1 = _dereq_("./BaseDialog");
exports.BaseDialog = BaseDialog_1.default;
var PromptDialog_1 = _dereq_("./PromptDialog");
exports.PromptDialog = PromptDialog_1.default;
var ConfirmDialog_1 = _dereq_("./ConfirmDialog");
exports.ConfirmDialog = ConfirmDialog_1.default;
var InfoDialog_1 = _dereq_("./InfoDialog");
exports.InfoDialog = InfoDialog_1.default;
var SelectDialog_1 = _dereq_("./SelectDialog");
exports.SelectDialog = SelectDialog_1.default;
function cancelDialogIfAny() {
    if (BaseDialog_1.default.activeDialog != null)
        BaseDialog_1.default.activeDialog.cancel();
}
exports.cancelDialogIfAny = cancelDialogIfAny;

},{"./BaseDialog":1,"./ConfirmDialog":2,"./InfoDialog":3,"./PromptDialog":4,"./SelectDialog":5}]},{},[6])(6)
});
