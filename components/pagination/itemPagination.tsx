import React from 'react';
import _ from 'lodash';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

interface ItemPaginationProps {
  data: any[]
  handleClickCallback?: (i: number) => void;
}

export const ItemPagination = ({
  data,
  handleClickCallback,
}: ItemPaginationProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = _.isArray(data) ? Math.floor(data.length / 12) + 1 : 0;

  const handleClick = (i: number) => {
    setCurrentPage(i);
    handleClickCallback && handleClickCallback(i);
  }

  const createRenderContent = () => {
    let items: any = [];

    for (let i = 1; i <= totalPages; i += 1) {
      items.push(<PaginationItem
        key={`${data}-${i}`}
        active={i === currentPage}
        onClick={() => handleClick(i)}
      >
        <PaginationLink href="">
          {i}
        </PaginationLink>
      </PaginationItem>);
    }

    return totalPages > 0 ? (
      <Pagination>
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink first href="" />
        </PaginationItem>
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink previous href="" />
        </PaginationItem>
        {items}
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink next href="" />
        </PaginationItem>
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink last href="" />
        </PaginationItem>
      </Pagination>
    ) : <div />;
  }

  return createRenderContent();
}