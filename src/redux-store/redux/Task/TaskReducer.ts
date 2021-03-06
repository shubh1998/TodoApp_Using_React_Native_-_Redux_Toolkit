import {createSlice} from '@reduxjs/toolkit';
import {taskType} from '../../../utils/types/taskType';
interface defaultState {
  taskList: Array<taskType>;
}

const defaultState: defaultState = {
  taskList: [
    {
      id: 5,
      listId: 1,
      taskNote: 'Todo Task-1',
      completed: true,
    },
    {
      id: 6,
      listId: 2,
      taskNote: 'Todo Task-2',
      completed: false,
    },
    {
      id: 7,
      listId: 1,
      taskNote: 'Todo Task-3',
      completed: false,
    },
    {
      id: 8,
      listId: 2,
      taskNote: 'Todo Task-4',
      completed: true,
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
        taskList: [...state.taskList, action.payload],
      };
    },
    updateTask: (state, action) => {
      return {
        ...state,
        taskList: state.taskList.map(item =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };
    },
    deleteTask: (state, action) => {
      return {
        ...state,
        taskList: state.taskList.filter(item => item.id !== action.payload),
      };
    },
  },
});

export const {AddNewTask, updateTask, deleteTask} = TaskReducer.actions;

export default TaskReducer.reducer;
