import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Input, Row, Col } from 'reactstrap';
import { CustomzieInput, OmdbApiType, SearchInputType } from '../..';

const StyledIcon = styled.i`
  font-size: 28px;
  cursor: pointer;
  &:hover {
    color: #0066ff;
  }
`;

const StyledH1 = styled.h1`
  text-align: center;
`;

const StyleCol = styled(Col)`
  text-align: center;
  & input {
    display: inline-block;
    width: 60%;
    margin-left: 10px;
  }
  &.title {
    text-align: end;
  }
  &.type {
    text-align: start;
    select {
      width: 100%;
      margin-left: 0px;
      margin-top: 12px;
      display: block;
    }
    & i {
      margin-top: 16px;
    }
  }
`;

interface SearchPageProps {
  title: string;
  year: string;
  select: string;
  titleRef: any;
  yearRef: any;
  handleOnChange: any;
  setIsLoaded: any;
  setIsTrigger: any;
  handleClick: any;
}

export const SearchPage = ({
  year,
  title,
  select,
  titleRef,
  yearRef,
  handleOnChange,
  setIsLoaded,
  setIsTrigger,
  handleClick,
}: SearchPageProps) => {
  return (
    <>
      <StyledH1>Let's find out...</StyledH1>
      <Row>
        <StyleCol className="title" xs={4}>
          <CustomzieInput
            isValid={false}
            title={'Title'}
            placeholder={''}
            refs={titleRef}
            onBlur={() => { }}
            onChange={e => handleOnChange(e, SearchInputType.title)}
            warningString={''}
            value={title}
          />
        </StyleCol>
        <StyleCol xs={4}>
          <CustomzieInput
            isValid={false}
            title={'Year'}
            placeholder={''}
            refs={yearRef}
            onBlur={() => { }}
            onChange={e => handleOnChange(e, SearchInputType.year)}
            warningString={''}
            value={year}
          />
        </StyleCol>
        <StyleCol className="type" xs={3}>
          <Input
            type="select"
            name="select"
            value={select}
            onChange={e => handleOnChange(e, SearchInputType.type)} >
            <option>{OmdbApiType.movie}</option>
            <option>{OmdbApiType.episode}</option>
            <option>{OmdbApiType.series}</option>
          </Input>
        </StyleCol>
        <StyleCol className="type" xs={1}>
          <StyledIcon
            className="fas fa-search"
            onClick={() => {
              setIsLoaded(false);
              setIsTrigger(true);
              handleClick();
            }} />
        </StyleCol>
      </Row>
    </>
  );
}