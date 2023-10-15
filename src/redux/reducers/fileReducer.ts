import {
  File,
  FileActionTypes,
  GET_ALL_FILES,
  UPLOAD_FILE,
  DELETE_FILE,
  START_LOADING,
  STOP_LOADING,
} from "../actions/fileActions";

export interface FileState {
  files: File[];
  loading: boolean;
}

const initialState: FileState = {
  files: [],
  loading: false,
};

export const fileReducer = (
  state: FileState = initialState,
  action: FileActionTypes
) => {
  switch (action.type) {
    case GET_ALL_FILES:
      return { ...state, files: action.payload.files, loading: false };

    case UPLOAD_FILE:
      return {
        ...state,
        loading: false,
        files: [action.payload.file, ...state.files],
      };

    case DELETE_FILE:
      return {
        ...state,
        loading: false,
        files: state.files.filter(
          (file) => file.fileName !== action.payload.fileName
        ),
      };

    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
