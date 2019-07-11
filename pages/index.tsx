import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { Pagination } from '../components';
import DataList from './dataTable/index';

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

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }

  return (
    <>
      <Pagination color="secondary" page={value} onChangeCallback={handleChange}>
        <LinkTab label="Data One" href="/" />
        <LinkTab label="To be implemented" href="/1" />
        <LinkTab label="To be implemented 2" href="/2" />
      </Pagination>
      {value === 0 && <TabContainer>
        <DataList />
      </TabContainer>}
      {value === 1 && <TabContainer>To be implemented</TabContainer>}
      {value === 2 && <TabContainer>To be implemented 2</TabContainer>}
    </>
  );
}

export default App;