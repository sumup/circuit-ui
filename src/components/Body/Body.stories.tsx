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

import docs from './Body.docs.mdx';
import { BodyProps } from './Body';

import Body from '.';

const content =
  'An electronic circuit is composed of individual electronic components, such as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires or traces through which electric current can flow.';

export default {
  title: 'Typography/Body',
  component: Body,
  parameters: {
    docs: { page: docs },
  },
};

export const Base = (args: BodyProps) => (
  <Body {...args} noMargin>
    {content}
  </Body>
);

const sizes = ['kilo', 'mega', 'giga'] as const;

export const Sizes = (args: BodyProps) =>
  sizes.map((s) => (
    <Body key={s} {...args} size={s} noMargin>
      This is a {s} text. {content}
    </Body>
  ));

export const Bold = (args: BodyProps) => (
  <Body {...args} as="strong" bold noMargin>
    {content}
  </Body>
);

export const Italic = (args: BodyProps) => (
  <Body {...args} as="em" italic noMargin>
    {content}
  </Body>
);

export const Strike = (args: BodyProps) => (
  <Body {...args} as="s" strike noMargin>
    {content}
  </Body>
);