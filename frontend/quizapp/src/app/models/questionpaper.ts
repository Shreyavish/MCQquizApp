import { question } from './question';

export class questionpaper {
  title : String;
  section : {
    name: String;
    //content : [question],
    question_content: [String]
  };
  total_marks: Number;
}
