import { createSlice } from '@reduxjs/toolkit';
import { DOCUMENT_UPLOAD_MANAGER } from '@/store/config';
import { RootState } from '@/store/reducer';

export interface DocumentState {
  name: string;
  progress: string;
  id: string;
  status: 'normal' | 'exception' | 'active' | 'success';
}

const initialState: { documents: DocumentState[] } = {
  documents: []
};

export const documentUploadSlice = createSlice({
  name: DOCUMENT_UPLOAD_MANAGER,
  initialState: initialState,
  reducers: {
    push(state, action) {
      state.documents = [...state.documents, ...action.payload.documents];
    },
    remove(state, action) {
      const filterDocuments = state.documents.filter((item) => item.id !== action.payload.document.id);
      state.documents = filterDocuments;
    },
    clear(state) {
      state.documents = [];
    },
    update(state, action) {
      const filterDocument = state.documents.find((item) => item.id == action.payload.document.id);
      if (filterDocument) {
        filterDocument.progress = action.payload?.document?.progress;
        state.documents = [...state.documents];
      }
    },
    updateStatus(state, action) {
      const filterDocument = state.documents.find((item) => item.id == action.payload.document.id);
      if (filterDocument) {
        filterDocument.status = action.payload?.document?.status;
        state.documents = [...state.documents];
      }
    }
  }
});

export const { push, remove, update, updateStatus, clear } = documentUploadSlice.actions;
export const documentUploadStore = (state: RootState) => state[DOCUMENT_UPLOAD_MANAGER];
export default documentUploadSlice.reducer;
