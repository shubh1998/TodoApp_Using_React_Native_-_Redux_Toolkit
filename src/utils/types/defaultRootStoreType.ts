import { listType } from "./listType";

export type DefaultRootStoreType = {
    ListReducer: {
        list: Array<listType>,
        activeListId: string
    }
}