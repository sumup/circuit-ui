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

import { HTMLProps } from 'react';
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';
import { textKilo, hideVisually } from '../../styles/style-helpers';

export interface LabelProps extends HTMLProps<HTMLLabelElement> {
  /**
   * The identifier of the corresponding form element.
   */
  htmlFor: string;
  /**
   * Visually hides the label, but keeps it available to screen readers.
   * Useful to add a label to purely visual elements.
   */
  visuallyHidden?: boolean;
}

const visuallyHiddenStyles = ({ visuallyHidden }: LabelProps) =>
  visuallyHidden &&
  css`
    label: label--hidden;
    ${hideVisually()};
  `;

const baseStyles = ({ theme }: StyleProps) => css`
  label: label;
  ${textKilo({ theme })};
  display: block;
`;

/**
 * Label component for form inputs.
 */
export const Label = styled.label<LabelProps>(baseStyles, visuallyHiddenStyles);