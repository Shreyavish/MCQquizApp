

export class question    {
    _id?:String;
    title?:String;
    author?: String;
    description?:String;
    options?: [{option_no : Number,
             content: String}];

    answer?:[Number];
    domain?:String;
    subdomain?: String;
    keywords?:[String];//topic tags
    marks?:Number;
    level?:String;
    type?:String;
    explanation?: String;
    }

