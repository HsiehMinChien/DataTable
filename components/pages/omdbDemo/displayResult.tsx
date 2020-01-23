import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import styled from 'styled-components';
import {
  Button,
  Row,
  Col,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import { ItemPagination, getValue } from '../..';

const StyledFlex = styled.div`
  display: flex | inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0px 16px;
  width: 170px;
`;

const StyledRow = styled(Row)`
  width: 150px;
  &.pagination,
  &.detail-button {
    margin-top:20px;
    width: 100%;
    justify-content: center;
  }
`;

const StyledImg = styled.img`
  width: 150px;
  height: 222.5px;
  background-color: #eee;
  object-fit: cover;
  border: 0px;
`;

const StyledCol = styled(Col)`
  padding: 20px;
  &.center {
    text-align: center;
  }
`;

const StyledH1 = styled.h1`
  text-align: center;
  padding: 50px 0px;
`;

const StyledH3 = styled.h3`
  margin-bottom: 20px;
`;

const StyledH4 = styled.h4`
  margin-bottom: 20px;
  color: gray;
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
      (getValue(data, 'Response', null) === 'False' || !_.isNil(getValue(data, 'Error', null)))
    ) {
      return <StyledH1>Oops, something went wrong!</StyledH1>
    } else if (
      !_.isNil(data) &&
      getValue(data, 'Response', null) === 'True' &&
      _.isNil(getValue(data, 'Error', null)) &&
      _.isArray(getValue(data, 'Search', null))
    ) {
      return data.Search.map((item: any, i: number) => (
        <StyledFlex key={`${item}${i}`} onClick={() => setShowDetail(item)}>
          <div>
            <StyledRow><StyledImg src={item.Poster} /></StyledRow>
            <StyledRow>{item.Title}</StyledRow>
          </div>
        </StyledFlex>
      )).filter((_: any, i: number) => (Math.floor(i / 12) + 1) === currentPage)
    }
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
    <StyledRow className={classnames('pagination')} style={{ justifyContent: 'center' }}>
      <ItemPagination
        handlePaginationClick={handlePaginationClick}
        currentPage={currentPage}
        totalPages={totalPages}>
        {createPaginationContent()}
      </ItemPagination>
    </StyledRow>
  </div > : <Row>
      <StyledCol className={classnames('center')} xs={5}>
        <img src={showDetail.Poster} />
      </StyledCol>
      <StyledCol xs={7}>
        <StyledH3>{`Title: ${showDetail.Title}`}</StyledH3>
        <StyledH3>{`Type: ${showDetail.Type}`}</StyledH3>
        <StyledH4>{`Year: ${showDetail.Year}`}</StyledH4>
        <StyledH4>{`imdbID: ${showDetail.imdbID}`}</StyledH4>
      </StyledCol>
      <br />
      <StyledRow className={classnames('detail-button')}>
        <Button
          outline
          color="success"
          onClick={() => setShowDetail(null)}
        >
          Back to Result List
        </Button>
      </StyledRow>
    </Row>;
}