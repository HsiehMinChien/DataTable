import React from 'react';
import _ from 'lodash';
import Container from '@material-ui/core/Container';
import { RippleSpinner, convertToOmdbApiURL } from '../..';

export const OmdbDemo = () => {
  const [data, setData] = React.useState<any>(null);
  const [isTrigger, setIsTrigger] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(true);

  const handleClick = () => {
    fetch(convertToOmdbApiURL('iron man', '2008', 'movie'))
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
      _.isArray(_.get(data, 'Search', []))
    ) {
      return data.Search.map((item: any, i: number) => (
        <div key={`${item}${i}`}>
          <div>Title: {item.Title}</div>
        </div>
      ))
    }
    console.log(data);
    return <div> unexpect status !</div>
  }

  const renderContent = () => {
    if (!isTrigger && isLoaded) {
      return <button
        onClick={() => {
          setIsLoaded(false);
          setIsTrigger(true);
          handleClick();
        }}>Fetch</button>;
    } else if (isTrigger && isLoaded) {
      return <div>
        {convertDataToDisplay()}
        Done<br />
        <button onClick={() => setIsTrigger(false)}>Back to Search</button>
      </div>;
    } else {
      return <RippleSpinner />;
    }
  }

  console.log('OmdbDemo', data);
  return <Container>{renderContent()}</Container>;
}