import {createSlice} from '@reduxjs/toolkit';
const defaultState = {
  list: [
    {
      id: Math.random(),
      note: 'Todo List-1',
    },
    {
      id: Math.random(),
      note: 'Todo List-2',
    },
    {
      id: Math.random(),
      note: 'Todo List-3',
    },
    {
      id: Math.random(),
      note: 'Todo List-4',
    },
  ],
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
