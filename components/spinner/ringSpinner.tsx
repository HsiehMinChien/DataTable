import React from 'react';
import styled, { keyframes } from 'styled-components';

const ldsRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledDiv = styled.div`
  &.lds-ring {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
    & div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 51px;
      height: 51px;
      margin: 6px;
      border: 6px solid ${props => props.color};
      border-radius: 50%;
      animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: ${props => props.color} transparent transparent transparent;
      &:nth-child(1) {
        animation-delay: -0.45s;
      }
      &:nth-child(2) {
        animation-delay: -0.3s;
      }
      &:nth-child(3) {
        animation-delay: -0.15s;
      }
    }
  }
`;

export const RingSpinner = ({
  color = '#cef'
}: { color?: string }) => (
    <>
      <StyledDiv className="lds-ring" color={color}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </StyledDiv>
      <div>Loading...</div>
    </>
  )