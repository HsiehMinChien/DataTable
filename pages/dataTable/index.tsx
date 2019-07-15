import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';

import { DisplayTable, CustomizeModal, FabButton, DataType, ReducerActionType } from '../../components';

const StyledH1 = styled.h1`
  margin: 15px 0px;
  text-align: center;
`;

interface DataListProps {
  dataList: DataType[],
  dispatch: React.Dispatch<ReducerActionType>
}

const DataList = ({
  dataList,
  dispatch
}: DataListProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectItem, setSelectItem] = React.useState<number>(0);

  const toggle = () => {
    setIsOpen(!isOpen);
  }


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

export default DataList;