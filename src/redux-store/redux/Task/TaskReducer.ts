import {createSlice} from '@reduxjs/toolkit';
import { taskType } from '../../../utils/types/taskType';

interface defaultState {
  taskList: Array<taskType>,
}

const defaultState: defaultState = {
  taskList: [
    {
      id: Math.random(),
      listId: 1,
      taskNote: 'Todo Task-1',
      completed: true
    },
    {
      id: Math.random(),
      listId: 2,
      taskNote: 'Todo Task-2',
      completed: false
    },
    {
      id: Math.random(),
      listId: 1,
      taskNote: 'Todo Task-3',
      completed: false
    },
    {
      id: Math.random(),
      listId: 2,
      taskNote: 'Todo Task-4',
      completed: true
    },
  ],
};

const TaskReducer = createSlice({
  name: 'TaskReducer',
  initialState: defaultState,
  reducers: {
    AddNewTask: (state, action) => {
      return {
        ...state,
        taskTask: [...state.taskList, action.payload],
      };
    },
    updateTask: (state, action) => {
        return {
            ...state,
            taskList: state.taskList.map(item => {
                if(item.id === action.payload.id){
                    item.taskNote = action.payload.taskNote
                }
                return item
            })
        }
    },
    deleteTask: (state, action) => {
      return {
        ...state,
        taskList: state.taskList.filter(item => item.id !== action.payload)
      }
    }
  },
});

export const {AddNewTask, updateTask, deleteTask} = TaskReducer.actions;

export default TaskReducer.reducer;
