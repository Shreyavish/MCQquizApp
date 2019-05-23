

export class question    {
    _id?:String;
    title?:String;
    author?: String;
    description?:String;
    options?: [{option_no : Number,
             content: String}];

    answer?:[Number];
    text_answer? :  [String];// if the question type is fill in the blanks
    domain?:String;
    subdomain?: String;
    keywords?:[String];//topic tags
    marks?:Number;
    level?:String;
    type?:String;
    explanation?: String;
    }

