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
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs/react';

import LoadingButton from '.';

storiesOf('Components|Button/LoadingButton', module)
  .addParameters({ jest: ['LoadingButton'] })
  .add('LoadingButton with Success animation', () => (
    <LoadingButton
      isLoading={boolean('Loading', false)}
      onClick={action('clicked')}
      onAnimationComplete={action('animation completed')}
      exitAnimation={LoadingButton.SUCCESS}
      primary
    >
      Click me
    </LoadingButton>
  ))
  .add('LoadingButton with Error animation', () => (
    <LoadingButton
      isLoading={boolean('Loading', false)}
      onClick={action('clicked')}
      onAnimationComplete={action('animation completed')}
      exitAnimation={LoadingButton.ERROR}
      primary
    >
      Click me
    </LoadingButton>
  ))
  .add('LoadingButton with no exit animation', () => (
    <LoadingButton
      isLoading={boolean('Loading', false)}
      onClick={action('clicked')}
      onAnimationComplete={action('animation completed')}
      primary
    >
      Click me
    </LoadingButton>
  ));
