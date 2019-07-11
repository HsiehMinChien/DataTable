import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';

interface PaginationProps {
  page: number;
  onChangeCallback: (event: React.ChangeEvent<{}>, value: any) => void;
  children: any;
  color?: "inherit" | "primary" | "secondary" | "default";
}

export const Pagination = ({
  page,
  onChangeCallback,
  children,
  color,
}: PaginationProps) => (
    <AppBar position="static" color={color}>
      <Tabs variant="fullWidth" value={page} onChange={onChangeCallback}>
        {children}
      </Tabs>
    </AppBar>
  )