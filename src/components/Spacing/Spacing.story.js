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
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import Spacing from './Spacing';
import Button from '../Button';

storiesOf(`${GROUPS.LAYOUT}|Spacing`, module)
  .addParameters({ jest: ['Spacing'] })
  .add('Bottom Spacing', () => (
    <Fragment>
      <Spacing bottom>
        <Button primary>Spacing bottom</Button>
      </Spacing>
      <Button>No spacing</Button>
    </Fragment>
  ))
  .add('Top Spacing', () => (
    <Fragment>
      <Button>No spacing</Button>
      <Spacing top>
        <Button primary>Spacing top</Button>
      </Spacing>
    </Fragment>
  ));
