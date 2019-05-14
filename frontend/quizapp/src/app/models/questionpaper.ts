import { question } from './question';

export class questionpaper {
  title : String;
  section : {
    name: String;
    content : [question],
  };
  total_marks: Number;
}
