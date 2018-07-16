import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { childrenPropType } from '../../util/shared-prop-types';
import { directions } from '../../styles/constants';

const ALIGMENT_TYPES = [directions.LEFT, directions.CENTER, directions.RIGHT];

const marginStyles = ({ theme, noMargin }) =>
  !noMargin &&
  css`
    li:not(:last-of-type) {
      margin-bottom: ${theme.spacings.mega};

      ${theme.mq.kilo`
        margin-bottom: 0;
      `};
    }
  `;

const alignmentStyles = ({ align }) => {
  const alignmentMap = {
    [directions.LEFT]: 'flex-start',
    [directions.CENTER]: 'center',
    [directions.RIGHT]: 'flex-end'
  };

  return css`
    label: button-group--${align};
    justify-content: ${alignmentMap[align]};
  `;
};

const baseStyles = ({ theme, noMargin }) => css`
  label: button-group;
  display: block;
  list-style-type: none;
  width: 100%;

  ${marginStyles({ theme, noMargin })};

  > * {
    width: 100%;
  }

  ${theme.mq.kilo`
    display: flex;

    li:not(:last-of-type) {
      margin-right: ${theme.spacings.mega};
    }

    > * {
      width: auto;
    }
  `};
`;

const ButtonGroupList = styled('ul')(baseStyles, alignmentStyles);

/**
 * Groups its Button children into a list and adds margins between.
 */
const ButtonGroup = ({ children, align, noMargin, ...rest }) => (
  <ButtonGroupList {...rest} align={align} noMargin={noMargin}>
    {Children.map(children, child => <li>{child}</li>)}
  </ButtonGroupList>
);

ButtonGroup.LEFT = directions.LEFT;
ButtonGroup.CENTER = directions.CENTER;
ButtonGroup.RIGHT = directions.RIGHT;

ButtonGroup.propTypes = {
  /**
   * Buttons to group.
   */
  children: childrenPropType.isRequired,
  /**
   * Removes the default bottom margin from the heading.
   */
  noMargin: PropTypes.bool,
  /**
   * Direction to align the content. Either left/right
   */
  align: PropTypes.oneOf(ALIGMENT_TYPES)
};

ButtonGroup.defaultProps = {
  align: ButtonGroup.RIGHT,
  noMargin: false
};

/**
 * @component
 */
export default ButtonGroup;
