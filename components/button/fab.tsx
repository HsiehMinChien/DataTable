import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

const StyledSVG = styled.svg`
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
  user-select: none;
`

const StyledFab = styled(Fab)`
  &.MuiFab-root,
  &.MuiFab-root:hover {
    color: #fff;
    background-color: #1976d2;
  }
`

export const FabButton = ({
  toggle,
  icon,
}: { toggle: () => void, icon?: string }) => (
    <StyledFab onClick={toggle}>
      {icon ? <i className={icon} /> :
        <StyledSVG focusable="false" viewBox="0 0 24 24" role="presentation">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
        </StyledSVG>
      }
    </StyledFab>
  )