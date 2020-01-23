import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Row } from 'reactstrap';
import Container from '@material-ui/core/Container';
import { RippleSpinner, convertToOmdbApiURL, OmdbApiTypeList, getValue } from '../..';
import { DisplayResult } from './displayResult';
import { SearchPage } from './searchPage';

const StyledRow = styled(Row)`
  justify-content: center;
`;

export enum SearchInputType {
  title = 'title',
  year = 'year',
  type = 'type'
}

export type SearchInputTypeList = keyof typeof SearchInputType;

export const OmdbDemo = () => {
  const titleRef = React.useRef(null);
  const yearRef = React.useRef(null);

  const [title, setTitle] = React.useState('');
  const [year, setYear] = React.useState('');
  const [select, setSelect] = React.useState<OmdbApiTypeList>('movie');

  const [data, setData] = React.useState<any>(null);
  const [isTrigger, setIsTrigger] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [showDetail, setShowDetail] = React.useState<any>(null);

  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = _.isArray(getValue(data, 'Search', null)) ? Math.floor(data.Search.length / 12) + 1 : 0;

  const handlePaginationClick = (i: number) => {
    setCurrentPage(i);
  }

  const handleClick = () => {
    fetch(convertToOmdbApiURL(title, year, select))
      .then(res => res.json())
      .then(
        (result) => {
          setData(result);
          setIsLoaded(true);
        },
        (error) => {
          setData(error);
          setIsLoaded(true);
        }
      )
      .catch(() => {
        setIsLoaded(true);
      });
  }

  const handleOnChange = (e: any, t: SearchInputTypeList) => {
    switch (t) {
      case SearchInputType.title:
        setTitle(e.target.value);
        break;
      case SearchInputType.year:
        setYear(e.target.value);
        break;
      case SearchInputType.type:
        setSelect(e.target.value);
        break;
      default:
        break;
    }
  }

  const renderContent = () => {
    if (!isTrigger && isLoaded) {
      return (
        <SearchPage
          year={year}
          title={title}
          select={select}
          titleRef={titleRef}
          yearRef={yearRef}
          handleOnChange={handleOnChange}
          setIsLoaded={setIsLoaded}
          setIsTrigger={setIsTrigger}
          handleClick={handleClick}
        />)
    } else if (isTrigger && isLoaded) {
      return (
        <DisplayResult
          data={data}
          showDetail={showDetail}
          setShowDetail={setShowDetail}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePaginationClick={handlePaginationClick}
        />);
    } else {
      return <StyledRow>
        <div>
          <RippleSpinner />
        </div>
      </StyledRow>;
    }
  }

  return <Container>{renderContent()}</Container>;
}