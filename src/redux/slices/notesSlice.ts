import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import myData from '../../data/note.json';
import {NotesState} from '../../types/category';

export const addNote = createAsyncThunk<
  {categoryId: string; note: string},
  {categoryId: string; note: string}
>('notes/addNote', async ({categoryId, note}) => {
  await new Promise(resolve => setTimeout(resolve, 100)); // 300ms fake delay
  return {categoryId, note};
});

export const deleteAllNote = createAsyncThunk<{}, {}>(
  'notes/deleteAllNote',
  async ({}) => {
    await new Promise(resolve => setTimeout(resolve, 100)); // 300ms fake delay
    return {};
  },
);

const initialState: NotesState = {
  categories: myData,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addNote.fulfilled, (state, action) => {
      const {categoryId, note} = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.items.push({
          id: Math.random().toString(),
          title: note,
          createdDate: new Date().toISOString(),
        });
      }
    });
    builder.addCase(deleteAllNote.fulfilled, (state, _) => {
      state.categories = state.categories.map(cat => ({
        ...cat,
        items: [],
      }));
    });
  },
});

export const {} = notesSlice.actions;
export default notesSlice.reducer;
