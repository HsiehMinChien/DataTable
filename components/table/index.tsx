import React from 'react';
import styled from 'styled-components';
import { Table, Button } from 'reactstrap';

import { DataType, ActionType, ReducerActionType } from '../../pages';

export const StyledSpan = styled.span`
  color: red
`;

const SytledTr = styled.tr`
  background-color: ${props => props.color}
`;

const StyledTbody = styled.tbody`
  border-bottom: 1px solid #eee;
`;

const StyledTd = styled.td`
  vertical-align: middle !important;
`

const StyledTh = styled.th`
  vertical-align: middle !important;
`

interface DisplayTableType {
  dataList: DataType[];
  dispatch: React.Dispatch<ReducerActionType>;
  toggle: () => void;
  setSelectItem: React.Dispatch<React.SetStateAction<number>>
}

export const DisplayTable = ({
  dataList,
  dispatch,
  toggle,
  setSelectItem
}: DisplayTableType) => {
  return (
    <Table>
      <thead>
        <SytledTr color="#ffffff">
          <th>No.</th>
          <th>Name</th>
          <th>Phone</th>
          <th><StyledSpan>*</StyledSpan>{' '}E-mail</th>
          <th>Actions</th>
        </SytledTr>
      </thead>
      <StyledTbody>
        {Array.isArray(dataList) &&
          dataList
            .sort((a: DataType, b: DataType) => a.serial - b.serial)
            .map((item: DataType, i: number) => (
              <SytledTr color={i % 2 === 1 ? '#eee' : '#fffff'} key={`${item}-${i}`}>
                <StyledTh scope="row">{i + 1}</StyledTh>
                <StyledTd>{item.name}</StyledTd>
                <StyledTd>{item.phone}</StyledTd>
                <StyledTd>{item.email}</StyledTd>
                <th>
                  <Button
                    color="primary"
                    outline
                    onClick={() => {
                      setSelectItem(i + 1);
                      toggle();
                    }}>
                    Modify
                  </Button>{' '}
                  <Button
                    color="danger"
                    outline
                    onClick={() => dispatch({ type: ActionType.delete, payload: item })}
                  >
                    Delete
                  </Button>
                </th>
              </SytledTr>)
            )}
      </StyledTbody>
    </Table>
  )
}