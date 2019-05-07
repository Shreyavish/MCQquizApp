import { JSDOM } from 'jsdom';
import * as mongoose from 'mongoose';
import * as sanitizeHtml from 'sanitize-html';
import * as deepmerge from 'deepmerge';
import * as kindOf from 'kind-of';

import { SchemaHtml } from './types';

const createDOMPurify = require('dompurify');

const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

/**
 * Default options for dompurify and sanitize html
 */
const optionsDefault: SchemaHtml.Options = {
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
}

class Html extends mongoose.Schema.Types.String {
  static schemaName: string;

  /**
   * Use an object instead of boolean value to change dompurify options.
   */
  private dompurify: SchemaHtml.DomPurify.Config;
  
  /**
   * Use an object instead of boolean value to change sanitize-html options.
   */
  private sanitizehtml: SchemaHtml.SanitizeHtml.Config;

  /**
   * Inside constructor we merge dompurify and sanitize-html options.
   */
  constructor(key: string, options?: SchemaHtml.Options) {
    if (options && kindOf(options.dompurify) !== 'boolean' && kindOf(options.dompurify) !== 'object') {
      options.dompurify = true;
    }

    if (options && kindOf(options.sanitizehtml) !== 'boolean' && kindOf(options.sanitizehtml) !== 'object') {
      options.sanitizehtml = false;
    }

    const _options: SchemaHtml.Options = deepmerge(optionsDefault, options);

    super(key, _options);

    this.dompurify = <SchemaHtml.DomPurify.Config>_options.dompurify;
    this.sanitizehtml = <SchemaHtml.SanitizeHtml.Config>_options.sanitizehtml;
  }

  /**
   * Execute dompurify and/or sanitize-html if activated at config.
   */
  cast(v: any) {
    let _val: string = v;

    if ((kindOf(this.dompurify) === 'boolean' && this.dompurify === true) || kindOf(this.dompurify) === 'object') {
      _val = DOMPurify.sanitize(_val, <{}>this.dompurify);
    }

    if ((kindOf(this.sanitizehtml) === 'boolean' && this.sanitizehtml === true) || kindOf(this.sanitizehtml) === 'object') {
      _val = sanitizeHtml(_val, <{}>this.sanitizehtml);
    }

    return _val;
  }
}

Html.schemaName = 'Html';

mongoose.SchemaTypes.Html = module.exports = Html;
mongoose.Schema.Types.Html = module.exports = Html;

export default Html;
