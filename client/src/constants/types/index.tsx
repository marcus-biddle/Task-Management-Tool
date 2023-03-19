// date format is MM/DD/YYYY
export const dateRegex = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;
export const textRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

export interface DataType {
    title: String;
    description: String;
    completed: Boolean;
    date: String;
    editing: Boolean;
    _id?: String;
  }