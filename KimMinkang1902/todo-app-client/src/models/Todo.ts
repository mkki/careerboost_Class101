export default class Todo {
  public id: string;
  public text: string;
  public stat: string;
  public folderId: string;
  public editing: boolean;

  constructor(
    id: string,
    text: string,
    folderId: string,
    stat: string = "active",
    editing: boolean = false
  ) {
    this.id = id;
    this.text = text;
    this.stat = stat;
    this.folderId = folderId;
    this.editing = editing;
  }
}
