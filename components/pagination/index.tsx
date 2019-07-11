import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';

interface PaginationProps {
  page: number;
  onChangeCallback: (event: React.ChangeEvent<{}>, value: any) => void;
  children: any;
}

export const Pagination = ({
  page,
  onChangeCallback,
  children
}: PaginationProps) => (
    <AppBar position="static">
      <Tabs variant="fullWidth" value={page} onChange={onChangeCallback}>
        {children}
      </Tabs>
    </AppBar>
  )