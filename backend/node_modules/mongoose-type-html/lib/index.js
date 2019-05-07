"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
const mongoose = require("mongoose");
const sanitizeHtml = require("sanitize-html");
const deepmerge = require("deepmerge");
const kindOf = require("kind-of");
const createDOMPurify = require('dompurify');
const window = (new jsdom_1.JSDOM('')).window;
const DOMPurify = createDOMPurify(window);
/**
 * Default options for dompurify and sanitize html
 */
const optionsDefault = {
    /**
     * By default dompurify is activated with default options. Use an object instead of boolean value to
     * change dompurify options.
     */
    dompurify: true,
    /**
     * By default sanitize-html is NOT activated. Use an object instead of boolean value to
     * change sanitize-html options.
     */
    sanitizehtml: false
};
class Html extends mongoose.Schema.Types.String {
    /**
     * Inside constructor we merge dompurify and sanitize-html options.
     */
    constructor(key, options) {
        if (options && kindOf(options.dompurify) !== 'boolean' && kindOf(options.dompurify) !== 'object') {
            options.dompurify = true;
        }
        if (options && kindOf(options.sanitizehtml) !== 'boolean' && kindOf(options.sanitizehtml) !== 'object') {
            options.sanitizehtml = false;
        }
        const _options = deepmerge(optionsDefault, options);
        super(key, _options);
        this.dompurify = _options.dompurify;
        this.sanitizehtml = _options.sanitizehtml;
    }
    /**
     * Execute dompurify and/or sanitize-html if activated at config.
     */
    cast(v) {
        let _val = v;
        if ((kindOf(this.dompurify) === 'boolean' && this.dompurify === true) || kindOf(this.dompurify) === 'object') {
            _val = DOMPurify.sanitize(_val, this.dompurify);
        }
        if ((kindOf(this.sanitizehtml) === 'boolean' && this.sanitizehtml === true) || kindOf(this.sanitizehtml) === 'object') {
            _val = sanitizeHtml(_val, this.sanitizehtml);
        }
        return _val;
    }
}
Html.schemaName = 'Html';
mongoose.SchemaTypes.Html = module.exports = Html;
mongoose.Schema.Types.Html = module.exports = Html;
exports.default = Html;
//# sourceMappingURL=index.js.map