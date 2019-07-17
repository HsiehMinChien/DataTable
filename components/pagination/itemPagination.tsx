import React from 'react';
import _ from 'lodash';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

interface ItemPaginationProps {
  handlePaginationClick: any;
  currentPage: number;
  totalPages: number;
  children: React.ReactChildren;
}

export const ItemPagination = ({
  handlePaginationClick,
  currentPage,
  totalPages,
  children,
}: ItemPaginationProps) => {
  return totalPages > 0 ? (
    <Pagination>
      <PaginationItem disabled={currentPage === 1} onClick={() => handlePaginationClick(1)}>
        <PaginationLink first href="" />
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1} onClick={() => handlePaginationClick(currentPage === 1 ? 1 : currentPage - 1)}>
        <PaginationLink previous href="" />
      </PaginationItem>
      {children}
      <PaginationItem disabled={currentPage === totalPages} onClick={() => handlePaginationClick(currentPage === totalPages ? totalPages : currentPage + 1)}>
        <PaginationLink next href="" />
      </PaginationItem>
      <PaginationItem disabled={currentPage === totalPages} onClick={() => handlePaginationClick(totalPages)}>
        <PaginationLink last href="" />
      </PaginationItem>
    </Pagination>
  ) : <div />;
}