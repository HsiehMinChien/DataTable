import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import {
  Button,
  Row,
  Col,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import { ItemPagination } from '../..';

const StyledFlex = styled.div`
  display: flex | inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: 20px;
  width: 170px;
`;

const StyledRow = styled(Row)`
  width: 150px;
`;

const StyledImg = styled.img`
  width: 150px;
  height: 222.5px;
  background-color: #eee;
  object-fit: cover;
  border: 0px;
`;

interface DisplayResultProps {
  data: any;
  showDetail: any;
  currentPage: number;
  totalPages: number;
  handlePaginationClick: any;
  setShowDetail: any;
}

export const DisplayResult = ({
  data,
  showDetail,
  currentPage,
  totalPages,
  handlePaginationClick,
  setShowDetail,
}: DisplayResultProps) => {

  const convertDataToDisplay = () => {
    if (
      !_.isNil(data) &&
      (_.get(data, 'Response', null) === 'False' || !_.isNil(_.get(data, 'Error', null)))
    ) {
      return <div>Oops, something went wrong!</div>
    } else if (
      !_.isNil(data) &&
      _.get(data, 'Response', null) === 'True' &&
      _.isNil(_.get(data, 'Error', null)) &&
      _.isArray(_.get(data, 'Search', null))
    ) {
      return data.Search.map((item: any, i: number) => (
        <StyledFlex key={`${item}${i}`} onClick={() => setShowDetail(item)}>
          <div>
            <StyledRow><StyledImg src={item.Poster} /></StyledRow>
            <StyledRow>{item.Title}</StyledRow>
          </div>
        </StyledFlex>
      ))
    }
    console.log(data);
    return <div> unexpect status !</div>
  }

  const createPaginationContent = () => {
    let items: any = [];

    for (let i = 1; i <= totalPages; i += 1) {
      items.push(<PaginationItem
        key={`${data}-${i}`}
        active={i === currentPage}
        onClick={() => handlePaginationClick(i)}
      >
        <PaginationLink href="">
          {i}
        </PaginationLink>
      </PaginationItem>);
    }

    return items;
  }

  return !showDetail ? <div>
    {convertDataToDisplay()}
    <br />
    <ItemPagination handlePaginationClick={handlePaginationClick} currentPage={currentPage} totalPages={totalPages}>
      {createPaginationContent()}
    </ItemPagination>
    {/* <Button onClick={() => setIsTrigger(false)}>Back to Search</Button> */}
  </div> : <Row>
      <Col xs={5}>
        <img src={showDetail.Poster} />
      </Col>
      <Col xs={7}>
        <div>{`Title: ${showDetail.Title}`}</div>
        <div>{`Type: ${showDetail.Type}`}</div>
        <div>{`Year: ${showDetail.Year}`}</div>
        <div>{`imdbID: ${showDetail.imdbID}`}</div>
      </Col>
      <br />
      <Button onClick={() => setShowDetail(null)}>Back to Result List</Button>
    </Row>;
}