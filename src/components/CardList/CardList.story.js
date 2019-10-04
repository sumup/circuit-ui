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

import React, { Component } from 'react';
import { range } from 'lodash/fp';
import { storiesOf } from '@storybook/react';
import * as knobs from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import CardList from '.';

class CardListStory extends Component {
  state = { selected: 0 };

  handleClick = selected => () => this.setState({ selected });

  render() {
    const { selected } = this.state;
    const padding = knobs.select(
      'padding',
      [CardList.Item.KILO, CardList.Item.MEGA, CardList.Item.GIGA],
      CardList.Item.GIGA
    );

    return (
      <div style={{ width: '320px' }}>
        <CardList>
          {range(1, 6).map(i => (
            <CardList.Item
              key={i}
              selected={selected === i}
              onClick={this.handleClick(i)}
              padding={padding}
            >
              Item #{i}
            </CardList.Item>
          ))}
        </CardList>
      </div>
    );
  }
}

storiesOf(`${GROUPS.COMPONENTS}|CardList`, module)
  .addParameters({ jest: ['CardList'] })
  .add('CardList', () => <CardListStory />);
