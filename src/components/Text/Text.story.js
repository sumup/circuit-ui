import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Text from '.';

storiesOf('Text', module)
  .addDecorator(withTests('Text'))
  .add(
    'Giga Text with p',
    withInfo()(() => (
      <Text element="p" size="giga">
        This is a giga Text with a p element
      </Text>
    ))
  )
  .add(
    'Mega Text with article',
    withInfo()(() => (
      <Text element="article" size="mega">
        This is an mega Text with an article element
      </Text>
    ))
  )
  .add(
    'Kilo Text with div',
    withInfo()(() => (
      <Text element="div" size="kilo">
        This is a kilo Text with a div element
      </Text>
    ))
  );
