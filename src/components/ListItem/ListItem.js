import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { sizes } from '../../styles/constants';
import { childrenPropType } from '../../util/shared-prop-types';

const { BYTE, KILO, MEGA, GIGA } = sizes;

const itemContainerActiveStyles = ({ theme, isActive }) =>
  isActive &&
  css`
    background-color: ${theme.colors.black};
  `;

const itemContainerBaseStyles = ({ theme, gutter }) => css`
  label: list-item__container;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-top: ${theme.spacings.bit};
  margin-bottom: ${theme.spacings.bit};
  padding: ${theme.spacings[gutter]};
  transition: background-color ${theme.transitions.easing.default};
  border-radius: 4px;
`;

/**
 * Describe ListItem here.
 */
const ListItem = ({ component: Component, children, isActive, ...rest }) => {
  const StyledComponent = styled(Component)`
    ${itemContainerBaseStyles} ${itemContainerActiveStyles};
  `;

  return (
    <StyledComponent isActive={isActive} {...rest}>
      {children}
    </StyledComponent>
  );
};

ListItem.BYTE = BYTE;
ListItem.KILO = KILO;
ListItem.MEGA = MEGA;
ListItem.GIGA = GIGA;

ListItem.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object
  ]),
  /**
   * The label to show for this navigation item.
   */
  children: childrenPropType,
  /**
   * Whether to render the item with active styles.
   */
  isActive: PropTypes.bool,
  gutter: PropTypes.oneOf([
    ListItem.BYTE,
    ListItem.KILO,
    ListItem.MEGA,
    ListItem.GIGA
  ])
};

ListItem.defaultProps = {
  component: 'li',
  isActive: false,
  children: null,
  gutter: ListItem.KILO
};

/**
 * @component
 */
export default ListItem;
