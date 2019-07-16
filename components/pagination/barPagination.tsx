import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';

interface PaginationBarProps {
  page: number;
  onChangeCallback: (event: React.ChangeEvent<{}>, value: any) => void;
  children: any;
  color?: "inherit" | "primary" | "secondary" | "default";
}

export const BarPagination = ({
  page,
  onChangeCallback,
  children,
  color,
}: PaginationBarProps) => (
    <AppBar position="static" color={color}>
      <Tabs variant="fullWidth" value={page} onChange={onChangeCallback}>
        {children}
      </Tabs>
    </AppBar>
  )