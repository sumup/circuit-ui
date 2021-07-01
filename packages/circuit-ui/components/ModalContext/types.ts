/**
 * Copyright 2021, SumUp Ltd.
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

import { MouseEvent, KeyboardEvent } from 'react';
import { Props as ReactModalProps } from 'react-modal';
import { Dispatch as TrackingProps } from '@sumup/collector';

type OnClose = (event?: MouseEvent | KeyboardEvent) => void;

export interface BaseModalProps
  extends Omit<
    ReactModalProps,
    'shouldCloseOnOverlayClick' | 'shouldCloseOnEsc'
  > {
  /**
   * Callback function that is called when the modal is closed.
   */
  onClose?: OnClose;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

export type ModalComponent<TProps extends BaseModalProps = BaseModalProps> = ((
  props: TProps,
) => JSX.Element) & { TIMEOUT?: number };