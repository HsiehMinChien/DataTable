import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { Button, Row } from 'reactstrap';
import {
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import { RippleSpinner, convertToOmdbApiURL, CustomzieInput, ItemPagination } from '../..';

enum InputType {
  title = 'title',
  year = 'year',
  type = 'type'
}

type InputTypeList = keyof typeof InputType

const StyledImg = styled.img`
  width: 150px;
  height: 222.5px;
  background-color: #eee;
  object-fit: cover;
  border: 0px;
`;

const StyledFlex = styled.div`
  display: flex | inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: 20px;
  width: 170px;
`;

const StyledRow = styled(Row)`
  width: 150px;
`

export const OmdbDemo = () => {
  const titleRef = React.useRef(null);
  const yearRef = React.useRef(null);

  const [title, setTitle] = React.useState('');
  const [year, setYear] = React.useState('');

  const [data, setData] = React.useState<any>(null);
  const [isTrigger, setIsTrigger] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(true);

  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = _.isArray(_.get(data, 'Search', null)) ? Math.floor(data.Search.length / 12) + 1 : 0;

  const handlePaginationClick = (i: number) => {
    console.log(i)
    setCurrentPage(i);
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


  const handleClick = () => {
    fetch(convertToOmdbApiURL(title, year, 'movie'))
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
      .catch((err) => {
        setIsLoaded(true);
      });
  }

  const handleOnChange = (e: any, t: InputTypeList) => {
    switch (t) {
      case InputType.title:
        setTitle(e.target.value);
        break;
      case InputType.year:
        setYear(e.target.value);
        break;
      default:
        break;
    }
  }

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
        <StyledFlex key={`${item}${i}`}>
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

  const renderContent = () => {
    if (!isTrigger && isLoaded) {
      return <>
        <CustomzieInput
          isValid={false}
          title={'Title'}
          placeholder={''}
          refs={titleRef}
          onBlur={() => { }}
          onChange={e => handleOnChange(e, InputType.title)}
          warningString={''}
          value={title}
        />
        <CustomzieInput
          isValid={false}
          title={'Year'}
          placeholder={''}
          refs={yearRef}
          onBlur={() => { }}
          onChange={e => handleOnChange(e, InputType.year)}
          warningString={''}
          value={year}
        />
        <br />
        <Button
          color="primary"
          onClick={() => {
            setIsLoaded(false);
            setIsTrigger(true);
            handleClick();
          }}>Fetch</Button>
      </>;
    } else if (isTrigger && isLoaded) {
      return <div>
        {convertDataToDisplay()}
        <br />
        <ItemPagination handlePaginationClick={handlePaginationClick} currentPage={currentPage} totalPages={totalPages}>
          {createPaginationContent()}
        </ItemPagination>
        {/* <Button onClick={() => setIsTrigger(false)}>Back to Search</Button> */}
      </div>;
    } else {
      return <RippleSpinner />;
    }
  }

  console.log('OmdbDemo', data);
  return <Container>{renderContent()}</Container>;
}