import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Label, Input } from 'reactstrap';
import { CustomzieInput, OmdbApiType, SearchInputType } from '../..';

const StyledIcon = styled.i`
  font-size: 28px;
`;

const StyledH1 = styled.h1`
  text-align: center;
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
      <Label for="select">Type</Label>
      <Input
        type="select"
        name="select"
        id="select"
        value={select}
        onChange={e => handleOnChange(e, SearchInputType.type)} >
        <option>{OmdbApiType.movie}</option>
        <option>{OmdbApiType.episode}</option>
        <option>{OmdbApiType.series}</option>
      </Input>
      <StyledIcon
        className="fas fa-search"
        onClick={() => {
          setIsLoaded(false);
          setIsTrigger(true);
          handleClick();
        }} />
    </>
  );
}