import { IOptions as SanitizeHtmlOptions } from 'sanitize-html';
import { Config as DomPurifyConfig } from 'dompurify';

export namespace SchemaHtml {
  export type Options = {
    sanitizehtml: Options.SanitizeHtml,
    dompurify: Options.DomPurify
  };

  export namespace Options {
    export type SanitizeHtml = SanitizeHtml.Config | null | undefined;
    export type DomPurify = DomPurify.Config | null | undefined;
  }

  export namespace SanitizeHtml {
    export type Config = boolean | SanitizeHtmlOptions;
  }

  export namespace DomPurify {
    export type Config = boolean | DomPurifyConfig
  }
}
