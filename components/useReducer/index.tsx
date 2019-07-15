export enum ActionType {
  insert = 'insert',
  modify = 'modify',
  delete = 'delete'
}

export interface DataType {
  serial: number;
  name: string;
  phone: string;
  email: string;
}

export interface ReducerActionType {
  type: string,
  payload: DataType,
}

export const dataListReducer = (dataList: DataType[], action: ReducerActionType) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.insert:
      if (Array.isArray(dataList)) {
        if (dataList.length === 0) {
          payload['serial'] = 1;
        } else {
          payload['serial'] = dataList[dataList.length - 1].serial + 1;
        }
      }
      return [...dataList, payload];
    case ActionType.modify:
      const outputState = dataList.filter((item: DataType) => item.serial !== payload.serial);
      return [...outputState, payload];
    case ActionType.delete:
      return dataList.filter((item: DataType) => item.name !== payload.name);
    default:
      return dataList;
  }
}