export default class Todo {
  public id: string;
  public text: string;
  public stat: string;
  public folderId: string;

  constructor(id: string, text: string, folderId: string, stat: string = "active") {
    this.id = id;
    this.text = text;
    this.stat = stat;
    this.folderId = folderId;
  }
}
