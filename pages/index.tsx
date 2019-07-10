import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import 'bootstrap/dist/css/bootstrap.css';

import { DisplayTable, CustomizeModal, FabButton } from '../components';

const StyledH1 = styled.h1`
  margin: 15px 0px;
  text-align: center;
`;

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

const reducer = (dataList: DataType[], action: ReducerActionType) => {
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

const App = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectItem, setSelectItem] = React.useState<number>(0);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const [dataList, dispatch] = React.useReducer(reducer, []);
  return (
    <Container>
      <StyledH1>Data List Demo</StyledH1>
      {React.useMemo(() => (
        <DisplayTable
          dataList={dataList}
          dispatch={dispatch}
          toggle={toggle}
          setSelectItem={setSelectItem}
        />
      ), [dataList])}
      {React.useMemo(() => (
        <CustomizeModal
          isOpen={isOpen}
          toggle={toggle}
          dispatch={dispatch}
          dataList={dataList}
          selectItem={selectItem}
          setSelectItem={setSelectItem}
        />
      ), [dataList, selectItem, isOpen])}
      {React.useMemo(() => {
        return <FabButton onClick={toggle} />
      }, [])}
    </Container>
  );
}

export default App;