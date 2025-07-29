import { createSlice } from "@reduxjs/toolkit";
import {
  addUserFolders,
  getService,
  getServiceData,
  getUserDocuments,
  getUserFolders,
  getfolderData,
  loadMoreServiceData,
  uploadUserDocuments,
} from "../actions/document-action";

// Initial State
const initialState = {
  documentList: [],
  total: [],
  fetchingDocumentError: "",
  serviceDocumentError: "",
  folderDocumentError: "",
  isLoading: false,
  dataList: [],
  listData: [],
  isDataLoading: false,
  isDocumentLoading: false,
  userFolders: [],
  userDocuments: [],
  userFoldersLoading: false,
  userDocumentsLoading: false,
  totalUserFolders: 0,
  totalUserDocuments: 0,
  addUserFolder: false,
  uploadUserDocuments: false,
  total : 0,
  page : 1,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    removeDocumentListError: (state) => {
      state.fetchingDocumentError = "";
      state.serviceDocumentError = "";
      state.folderDocumentError = "";
    },
    clearDocumentList: (state) => {
      state.documentList = [];
    },
    addDoc: (state, action) => {
      state.userDocuments = [action.payload, ...state.userDocuments];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getService.pending, (state) => {
        state.isLoading = true;
        state.fetchingDocumentError = "";
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentList = action.payload?.caseId || [];
        console.log(state.documentList, "action.payload document");
        state.total = action.payload.total || [];
      })
      .addCase(getService.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchingDocumentError =
          action.payload || "An error occurred while fetching services.";
      })
      .addCase(getServiceData.pending, (state) => {
        state.isDataLoading = true;
        state.serviceDocumentError = "";
      })
      .addCase(getServiceData.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.dataList = action.payload || [];
      })
      .addCase(getServiceData.rejected, (state, action) => {
        state.isDataLoading = false;
        state.serviceDocumentError =
          action.payload || "An error occurred while fetching service data.";
        state.dataList = [];
      })
      .addCase(getfolderData.pending, (state) => {
        state.isDocumentLoading = true;
        state.folderDocumentError = "";
      })
      .addCase(getfolderData.fulfilled, (state, action) => {
        state.isDocumentLoading = false;
        state.listData = action.payload || [];
      })
      .addCase(getfolderData.rejected, (state, action) => {
        state.isDocumentLoading = false;
        state.folderDocumentError =
          action.payload || "An error occurred while fetching documents.";
      })
      .addCase(getUserFolders.pending, (state) => {
        state.userFoldersLoading = true;
      })
      .addCase(getUserFolders.fulfilled, (state, action) => {
        state.userFolders = action.payload.userFolders;
        state.totalUserFolders = action.payload.totalUserFolders;

        state.userFoldersLoading = false;
      })
      .addCase(getUserFolders.rejected, (state) => {
        state.userFoldersLoading = false;
      })
      .addCase(getUserDocuments.pending, (state) => {
        state.userDocumentsLoading = true;
      })
      .addCase(getUserDocuments.fulfilled, (state, action) => {
        state.userDocuments = action.payload.userDocuments;
        state.totalUserDocuments = action.payload.totalUserDocuments;

        state.userDocumentsLoading = false;
      })
      .addCase(getUserDocuments.rejected, (state) => {
        state.userDocumentsLoading = false;
      })

      .addCase(addUserFolders.pending, (state) => {
        state.addUserFolder = true;
      })
      .addCase(addUserFolders.fulfilled, (state, action) => {
        console.log(action.payload, "add folder data");
        state.addUserFolder = false;
        const { folderData } = action.payload;
        state.totalUserFolders = state.totalUserFolders + 1;
        state.userFolders = [folderData, ...state.userFolders];
      })
      .addCase(addUserFolders.rejected, (state) => {
        state.addUserFolder = false;
      });
    builder
      .addCase(uploadUserDocuments.pending, (state) => {
        state.uploadUserDocuments = true;
      })
      .addCase(uploadUserDocuments.fulfilled, (state, action) => {
        console.log(action.payload, "add Document data");
        const { documentData } = action.payload;

        state.userDocuments = [documentData, ...state.userDocuments];
        state.totalUserDocuments = state.totalUserDocuments + 1;
        state.uploadUserDocuments = false;
      })
      .addCase(uploadUserDocuments.rejected, (state, action) => {
        console.log(action.payload, " rejected document");
        state.uploadUserDocuments = false;
      });

    builder
    .addCase(loadMoreServiceData.fulfilled, (state, action) => {
      if (action.payload.data?.length) {
        state.dataList = [...state.dataList, ...action.payload.data];
        state.page += 1;
      }
    });
  },
});

export const { removeDocumentListError, clearDocumentList } =
  documentSlice.actions;
export default documentSlice.reducer;
