import { listType } from "./listType";
import { taskType } from "./taskType";

export type DefaultRootStoreType = {
    ListReducer: {
        list: Array<listType>,
        activeListId: string
    },
    TaskReducer: {
        taskList: Array<taskType>,
    }
}