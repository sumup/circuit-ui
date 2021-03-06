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
import { fireEvent } from '@testing-library/dom';

import { create, render, renderToHtml, axe } from '../../../../util/test-utils';

import { CardHeader } from './Header';

describe('CardHeader', () => {
  const children = <p>This is a content.</p>;

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CardHeader>{children}</CardHeader>);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should render a close button when an onClose prop is passed', () => {
    const { getByTestId } = render(
      <CardHeader labelCloseButton="Close" onClose={() => {}}>
        {children}
      </CardHeader>,
    );
    const actual = getByTestId('header-close');
    expect(actual).toBeVisible();
  });

  it('should call the onClose prop when the close button is clicked', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <CardHeader labelCloseButton="Close" onClose={onClose}>
        {children}
      </CardHeader>,
    );

    fireEvent.click(getByTestId('header-close'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <CardHeader labelCloseButton="Close">{children}</CardHeader>,
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
