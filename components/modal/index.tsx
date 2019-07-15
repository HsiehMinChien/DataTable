import React from 'react';
import styled from 'styled-components';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { DataType, ActionType, ReducerActionType } from '../../pages';
import { CustomzieInput } from '..';
import { Footer } from './footer';

const StyledModal = styled(Modal)`
  & .modal-content {
    background-color: ${props => props.color};
  }
`;

enum DataList {
  phone = 'phone',
  name = 'name',
  email = 'email'
}

type ListType = keyof typeof DataList;

interface CustomizeModalProps {
  isOpen: boolean,
  toggle: () => void,
  dispatch: React.Dispatch<ReducerActionType>,
  selectItem: number,
  dataList: DataType[],
  setSelectItem: React.Dispatch<React.SetStateAction<number>>,
}

export const CustomizeModal = ({
  isOpen,
  toggle,
  dispatch,
  selectItem,
  dataList,
  setSelectItem
}: CustomizeModalProps) => {
  const emailRef = React.useRef<any>(null);
  const phoneRef = React.useRef<any>(null);
  const nameRef = React.useRef<any>(null);

  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [name, setName] = React.useState('');
  const [isVisited, setIsVisited] = React.useState({
    name: false,
    phone: false,
    email: false,
  })
  const [validation, setValidation] = React.useState({
    isValidName: false,
    isValidPhone: true,
    isValidEmail: false,
  });

  React.useEffect(() => {
    if (selectItem) {
      setEmail(dataList[selectItem - 1].email);
      setName(dataList[selectItem - 1].name);
      setPhone(dataList[selectItem - 1].phone);
      setValidation({
        isValidName: true,
        isValidPhone: true,
        isValidEmail: true,
      })
    }
  }, [selectItem])

  const handleCancel = () => {
    if (emailRef && emailRef.current && emailRef.current.value) emailRef.current.value = '';
    if (phoneRef && phoneRef.current && phoneRef.current.value) phoneRef.current.value = '';
    if (nameRef && nameRef.current && nameRef.current.value) nameRef.current.value = '';
    setEmail('');
    setPhone('');
    setName('');
    setValidation({
      isValidName: false,
      isValidPhone: true,
      isValidEmail: false,
    });
    setIsVisited({
      name: false,
      phone: false,
      email: false,
    })
    setSelectItem(0);
    toggle();
  }

  const handleSubmit = () => {
    const serial = selectItem ? dataList[selectItem - 1].serial : selectItem;
    dispatch({
      type: selectItem ? ActionType.modify : ActionType.insert,
      payload: { serial, name: name, email: email, phone: phone }
    });
    handleCancel();
  }

  const handleOnClick = (type: ListType) => {
    setIsVisited((prevState) => {
      prevState[type] = true;
      return { ...prevState }
    })
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, type: ListType) => {
    const confirmIsValid = (value: string) => {
      const re = {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phone: /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        name: dataList.filter((item: DataType) => item[type] === value) as any
      }
      return type !== DataList.name ?
        re[type as ListType].test(String(value).toLowerCase()) :
        re.name.length === 0 || (re.name[0].name === e.target.value && re.name[0].serial === selectItem);
    }
    switch (type) {
      case DataList.name:
        const isValidName = confirmIsValid(e.target.value);
        setValidation(prevState => ({ ...prevState, isValidName }))
        setName(e.target.value);
        break;
      case DataList.email:
        const isValidEmail = confirmIsValid(e.target.value);
        setValidation(prevState => ({ ...prevState, isValidEmail }))
        setEmail(e.target.value);
        break;
      case DataList.phone:
        const isValidPhone = confirmIsValid(e.target.value) || e.target.value === '';
        setValidation(prevState => ({ ...prevState, isValidPhone }))
        setPhone(e.target.value);
        break;
      default:
        break;
    }
  }

  return (
    <StyledModal
      isOpen={isOpen}
      toggle={handleCancel}
      color={selectItem ? '#eee' : '#ffffff'}
    >
      <ModalHeader toggle={handleCancel}>
        {selectItem ? `Modify no.${selectItem} item` : 'Insert an new item'}
      </ModalHeader>
      <ModalBody>
        <CustomzieInput
          isValid={isVisited.name && !validation.isValidName}
          title={'Name'}
          placeholder={'Insert your name'}
          refs={nameRef}
          onBlur={() => handleOnClick(DataList.name)}
          onChange={e => handleOnChange(e, DataList.name)}
          warningString={'Oh noes! that name is already taken or empty.'}
          value={name}
        />
        <CustomzieInput
          isValid={!validation.isValidPhone}
          title={'Phone'}
          placeholder={'Insert your phone'}
          refs={phoneRef}
          onBlur={() => handleOnClick(DataList.phone)}
          onChange={e => handleOnChange(e, DataList.phone)}
          warningString={'Oh noes! that phone is invalid.'}
          value={phone}
        />
        <CustomzieInput
          isValid={isVisited.email && !validation.isValidEmail}
          needFilled
          title={'Email'}
          placeholder={'Insert your email'}
          refs={emailRef}
          onBlur={() => handleOnClick(DataList.email)}
          onChange={e => handleOnChange(e, DataList.email)}
          warningString={'Oh noes! that email is invalid or empty.'}
          value={email}
        />
      </ModalBody>
      <Footer
        validation={validation}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
    </StyledModal>
  )
}