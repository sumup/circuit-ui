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

import React from 'react';
import { isEmpty } from 'lodash/fp';
import { isArray } from '../../../../util/type-check';
import { ReactComponent as Lock } from './lock.svg';

export const hasSelectedChild = children => {
  if (children) {
    return isArray(children)
      ? !isEmpty(children.filter(item => item.props.selected))
      : children.props.selected;
  }
  return false;
};

const disabledIcon = <Lock />;

export const getIcon = ({ defaultIcon, selected, selectedIcon, disabled }) => {
  if (defaultIcon && disabled) {
    return disabledIcon;
  }
  if (defaultIcon && selectedIcon && selected) {
    return selectedIcon;
  }
  if (defaultIcon) {
    return defaultIcon;
  }
  return null;
};
