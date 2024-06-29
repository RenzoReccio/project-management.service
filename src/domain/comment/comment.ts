export class Comment {
    date: Date;
    user: string;
    userUniqueName: string;
    text: string;
  
    constructor(date: Date, user: string, userUniqueName: string, text: string) {
      this.date = date;
      this.user = user;
      this.userUniqueName = userUniqueName;
      this.text = text;
    }
  }