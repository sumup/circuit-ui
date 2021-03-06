/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { forwardRef, Ref, HTMLProps } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';
import { textMega, textKilo, textGiga } from '../../styles/style-mixins';
import deprecate from '../../util/deprecate';

type Size = 'kilo' | 'mega' | 'giga';
type Variant = 'ordered' | 'unordered';

export interface ListProps
  extends Omit<HTMLProps<HTMLOListElement>, 'size' | 'type'> {
  /**
   * A Circuit UI body text size.
   */
  size?: Size;
  /**
   * Whether the list should be presented as an <ol>
   */
  variant?: Variant;
  /**
   * Removes the default bottom margin from the list.
   */
  noMargin?: boolean;
  /**
   The ref to the HTML DOM element
   */
  ref?: Ref<HTMLOListElement & HTMLUListElement>;
}

const baseStyles = ({ theme }: StyleProps) => css`
  label: list;
  font-weight: ${theme.fontWeight.regular};
  margin-bottom: ${theme.spacings.mega};
`;

const sizeStyles = ({ theme, size = 'mega' }: ListProps & StyleProps) => {
  const sizeMap = {
    kilo: {
      marginBottom: theme.spacings.kilo,
      paddingLeft: theme.spacings.kilo,
      marginLeft: theme.spacings.bit,
      type: textKilo({ theme }),
    },
    mega: {
      marginBottom: theme.spacings.byte,
      paddingLeft: theme.spacings.kilo,
      marginLeft: theme.spacings.kilo,
      type: textMega({ theme }),
    },
    giga: {
      marginBottom: theme.spacings.kilo,
      paddingLeft: theme.spacings.mega,
      marginLeft: theme.spacings.kilo,
      type: textGiga({ theme }),
    },
  };
  const { marginBottom, paddingLeft, marginLeft, type } = sizeMap[size];
  return css`
    label: ${`list--${size}`};
    padding-left: ${paddingLeft};
    ${type};

    li {
      margin-bottom: ${marginBottom};
      margin-left: ${marginLeft};
    }

    ul,
    ol {
      margin-left: ${marginLeft};
    }
  `;
};

const marginStyles = ({ noMargin }: ListProps) => {
  if (!noMargin) {
    deprecate(
      [
        'The default outer spacing in the List component is deprecated.',
        'Use the `noMargin` prop to silence this warning.',
        'Read more at https://github.com/sumup-oss/circuit-ui/issues/534.',
      ].join(' '),
    );
    return null;
  }
  return css`
    label: list--no-margin;
    margin-bottom: 0;
  `;
};

const BaseList = styled('ol', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<ListProps>(baseStyles, sizeStyles, marginStyles);

/**
 * A list, which can be ordered or unordered.
 */
export const List = forwardRef(
  ({ variant, ...props }: ListProps, ref: ListProps['ref']) => (
    <BaseList as={variant === 'ordered' ? 'ol' : 'ul'} {...props} ref={ref} />
  ),
);

List.displayName = 'List';
