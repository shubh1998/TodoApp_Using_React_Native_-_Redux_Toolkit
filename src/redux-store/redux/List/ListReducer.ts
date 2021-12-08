import {createSlice} from '@reduxjs/toolkit';
import { listType } from '../../../utils/types/listType';

interface defaultState {
  list: Array<listType>,
  activeListId: string
}

const defaultState: defaultState = {
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
  activeListId: '',
};

const ListReducer = createSlice({
  name: 'ListReducer',
  initialState: defaultState,
  reducers: {
    AddNewList: (state, action) => {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    },
    setActiveListId: (state, action) => {
      return {
        ...state,
        activeListId: action.payload,
      };
    },
    deleteList: (state, action) =>{
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload)
      }
    }
  },
});

export const {AddNewList, setActiveListId, deleteList} = ListReducer.actions;

export default ListReducer.reducer;
