/// <reference types="sanitize-html" />
import { IOptions as SanitizeHtmlOptions } from 'sanitize-html';
import { Config as DomPurifyConfig } from 'dompurify';
export declare namespace SchemaHtml {
    type Options = {
        sanitizehtml: Options.SanitizeHtml;
        dompurify: Options.DomPurify;
    };
    namespace Options {
        type SanitizeHtml = SanitizeHtml.Config | null | undefined;
        type DomPurify = DomPurify.Config | null | undefined;
    }
    namespace SanitizeHtml {
        type Config = boolean | SanitizeHtmlOptions;
    }
    namespace DomPurify {
        type Config = boolean | DomPurifyConfig;
    }
}
