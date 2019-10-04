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
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import Header from '.';
import Hamburguer from '../Hamburger';

const HeaderContainer = styled('div')`
  width: 375px;
  height: auto;
`;

storiesOf(`${GROUPS.COMPONENTS}|Header`, module)
  .addParameters({ jest: ['Header'] })
  .add('Header', () => (
    <HeaderContainer>
      <Header title="Title" mobileOnly={boolean('mobileOnly')}>
        <Hamburguer light />
      </Header>
    </HeaderContainer>
  ));
