import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Downshift from 'downshift';
import { includes } from 'lodash/fp';

import SearchInput from '../SearchInput';
import Card from '../Card';
import { textMega } from '../../styles/style-helpers';

const AutoCompleteWrapper = styled('div')`
  label: input__container
  position: relative;
  min-width: 150px;
`;

const ItemsWrapper = styled('div')`
  position: relative;
  height: 0px;
  overflow: visible;
  margin-top: ${props => props.theme.spacings.bit};
`;

const itemsBaseStyles = ({ theme }) => css`
  padding-top: calc(${theme.spacings.mega} - ${theme.spacings.bit});
  padding-bottom: calc(${theme.spacings.mega} - ${theme.spacings.bit});
  min-width: initial !important;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Items = styled(Card)(itemsBaseStyles);

Items.defaultProps = Card.defaultProps;

const itemBaseStyles = ({ theme }) => css`
  cursor: pointer;
  padding: ${theme.spacings.bit} 0 ${theme.spacings.bit} 0;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  ${textMega({ theme })};
`;

const itemHighlight = ({ selected, theme }) =>
  selected &&
  css`
    color: ${theme.colors.p500};
  `;

const Item = styled('div')(itemBaseStyles, itemHighlight);

const filterItems = inputValue => item =>
  !inputValue || includes(inputValue.toLowerCase(), item.toLowerCase());

/**
 * Basic AutoCompleteInput input with styled suggestions list
 */
export default class AutoCompleteInput extends Component {
  static propTypes = {
    /**
     * handleChange function that will receive the input
     */
    handleChange: PropTypes.func.isRequired,

    /**
     * If true, will clean the input after a value ie selected
     */
    clearOnSelect: PropTypes.bool,

    /**
     * Array of items (strings) the can be selected
     */
    items: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  static defaultProps = {
    clearOnSelect: false
  };

  _handleChange = value => {
    const { clearOnSelect, handleChange } = this.props;

    if (value) {
      handleChange(value);

      if (clearOnSelect && this._downshiftRef) {
        this._downshiftRef.clearSelection();
      }
    }
  };

  _handleDownShiftRef = ref => {
    this._downshiftRef = ref;
  };

  render() {
    const { items, handleChange, clearOnSelect, ...inputProps } = this.props;

    return (
      <Downshift ref={this._handleDownShiftRef} onSelect={this._handleChange}>
        {({
          getRootProps,
          getInputProps,
          getItemProps,
          inputValue,
          isOpen,
          highlightedIndex
        }) => {
          const filteredItems = items
            .filter(filterItems(inputValue))
            .slice(0, 7);

          return (
            <AutoCompleteWrapper {...getRootProps({ refKey: 'innerRef' })}>
              <SearchInput
                {...getInputProps({ ...inputProps })}
                noMargin
                renderSuffix={() => null}
              />
              {isOpen &&
                !!filteredItems.length && (
                  <ItemsWrapper>
                    <Items spacing={Card.MEGA}>
                      {filteredItems.map((item, index) => (
                        <Item
                          {...getItemProps({ item })}
                          key={item}
                          selected={index === highlightedIndex}
                        >
                          {item}
                        </Item>
                      ))}
                    </Items>
                  </ItemsWrapper>
                )}
            </AutoCompleteWrapper>
          );
        }}
      </Downshift>
    );
  }
}
