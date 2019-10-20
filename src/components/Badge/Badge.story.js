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

import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs/react';
import { values } from 'lodash/fp';

import { colorNames } from '../../styles/constants';

import Badge from './Badge';

storiesOf('Components|Badge', module)
  .addParameters({ jest: ['Badge'] })
  .add('Default Badge', () => (
    <Badge color={select('Color', values(colorNames))}>Update</Badge>
  ))
  .add('Circular Badge', () => (
    <Fragment>
      <Badge circle>1</Badge>
      <Badge circle>12</Badge>
      <Badge circle>88</Badge>
    </Fragment>
  ));
