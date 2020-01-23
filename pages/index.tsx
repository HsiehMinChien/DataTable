import React from 'react';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { BarPagination, dataListReducer, DataList, OmdbDemo } from '../components';

import 'bootstrap/dist/css/bootstrap.css';
import '../components/style.css';

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

function TabContainer(props: any) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function LinkTab(props: any) {
  return (
    <Tab
      component="a"
      onClick={(event: any) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const App = () => {
  const [value, setValue] = React.useState(0);
  const [dataList, dispatch] = React.useReducer(dataListReducer, []);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }

  return (
    <>
      <BarPagination color="primary" page={value} onChangeCallback={handleChange}>
        <LinkTab label="Data List demo" href="/" />
        <LinkTab label="Omdb api demo" href="/1" />
        <LinkTab label="To be implemented 2" href="/2" />
      </BarPagination>
      {value === 0 && <TabContainer>
        <DataList
          dataList={dataList}
          dispatch={dispatch}
        />
      </TabContainer>}
      {value === 1 && <TabContainer><OmdbDemo /></TabContainer>}
      {value === 2 && <TabContainer>To be implemented 2</TabContainer>}
    </>
  );
}

export default App;