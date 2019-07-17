import React from 'react';
import _ from 'lodash';
import Container from '@material-ui/core/Container';
import { Button, Label, Input } from 'reactstrap';
import { RippleSpinner, convertToOmdbApiURL, CustomzieInput, OmdbApiType, OmdbApiTypeList } from '../..';
import { DisplayResult } from './displayResult'

enum InputType {
  title = 'title',
  year = 'year',
  type = 'type'
}

type InputTypeList = keyof typeof InputType;

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
  const totalPages = _.isArray(_.get(data, 'Search', null)) ? Math.floor(data.Search.length / 12) + 1 : 0;

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
      case InputType.type:
        setSelect(e.target.value);
        break;
      default:
        break;
    }
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
        <Label for="select">Type</Label>
        <Input type="select" name="select" id="select" onChange={e => handleOnChange(e, InputType.type)} value={select}>
          <option>{OmdbApiType.movie}</option>
          <option>{OmdbApiType.episode}</option>
          <option>{OmdbApiType.series}</option>
        </Input>
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
      return <RippleSpinner />;
    }
  }

  return <Container>{renderContent()}</Container>;
}