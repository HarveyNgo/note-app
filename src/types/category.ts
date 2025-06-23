export interface Category {
  id: string;
  name: string;
  icon: string;
  avatar: string;
  items: {
    id: string;
    title: string;
    createdDate: string;
  }[];
}

export interface NotesState {
  categories: Category[] | [];
}

export interface AddNewNotePayload {
  categoryId: string;
  note: string;
}
