/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
import { SchemaHtml } from './types';
declare class Html extends mongoose.Schema.Types.String {
    static schemaName: string;
    /**
     * Use an object instead of boolean value to change dompurify options.
     */
    private dompurify;
    /**
     * Use an object instead of boolean value to change sanitize-html options.
     */
    private sanitizehtml;
    /**
     * Inside constructor we merge dompurify and sanitize-html options.
     */
    constructor(key: string, options?: SchemaHtml.Options);
    /**
     * Execute dompurify and/or sanitize-html if activated at config.
     */
    cast(v: any): string;
}
export default Html;
