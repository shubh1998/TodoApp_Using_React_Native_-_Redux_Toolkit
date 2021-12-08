import {createSlice} from '@reduxjs/toolkit';
const defaultState = {
  list: [],
  activeListId: null,
};

const ListReducer = createSlice({
  name: 'ListReducer',
  initialState: defaultState,
  reducers: {
    setList: (state, action) => {
      return {
        ...state,
        list: action.payload,
      };
    },
    setActiveListId: (state, action) => {
      return {
        ...state,
        activeListId: action.payload,
      };
    },
  },
});

export const {setList, setActiveListId} = ListReducer.actions;

export default ListReducer.reducer;
