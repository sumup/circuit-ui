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

import { ReactNode } from 'react';
import { css, ClassNames } from '@emotion/core';
import ReactModal from 'react-modal';
import { Theme } from '@sumup/design-tokens';

import { isFunction } from '../../util/type-check';
import { useClickHandler } from '../../hooks/useClickHandler';
import { ModalComponent, BaseModalProps } from '../ModalContext/ModalContext';
import CloseButton from '../CloseButton';

const TRANSITION_DURATION_MOBILE = 120;
const TRANSITION_DURATION_DESKTOP = 240;
const TRANSITION_DURATION = Math.max(
  TRANSITION_DURATION_MOBILE,
  TRANSITION_DURATION_DESKTOP,
);

const closeButtonStyles = (theme: Theme) => css`
  position: absolute;
  top: ${theme.spacings.byte};
  right: ${theme.spacings.byte};

  ${theme.mq.kilo} {
    top: ${theme.spacings.mega};
    right: ${theme.spacings.mega};
  }
`;
export interface ModalProps extends BaseModalProps {
  /**
   * The modal content. Use a render function when you need access to the
   * `onClose` function.
   */
  children:
    | ReactNode
    | (({ onClose }: Pick<BaseModalProps, 'onClose'>) => ReactNode);
  /**
   * Use the `contextual` variant when the modal content requires the context
   * of the page underneath to be understood, otherwise, use the `immersive`
   * variant to focus the user's attention.
   */
  variant: 'contextual' | 'immersive';
  /**
   * Text label for the close button for screen readers.
   * Important for accessibility.
   */
  labelCloseButton: string;
  /**
   * Allow user to close the modal by clicking/tapping the overlay or pressing
   * the escape key. Default true.
   */
  dismissible?: boolean;
  /**
   * Custom styles for the modal wrapper element.
   */
  className?: string;
}

/**
 * The modal component displays self-contained tasks in a focused window that
 * overlays the page content.
 * Built on top of [`react-modal`](https://reactcommunity.org/react-modal/).
 */
export const Modal: ModalComponent<ModalProps> = ({
  children,
  onClose,
  variant,
  dismissible = true,
  labelCloseButton,
  tracking = {},
  className,
  ...props
}) => {
  const handleClose = useClickHandler(onClose, tracking, 'modal-close');
  return (
    <ClassNames<Theme> key={variant}>
      {({ css: cssString, cx, theme }) => {
        // React Modal styles
        // https://reactcommunity.org/react-modal/styles/classes/

        const styles = {
          base: cx(
            cssString`
              position: fixed;
              outline: none;
              background-color: ${theme.colors.white};

              ${theme.mq.untilKilo} {
                right: 0;
                bottom: 0;
                left: 0;
                -webkit-overflow-scrolling: touch;
                overflow-y: auto;
                width: 100vw;
                transform: translateY(100%);
                transition: transform ${TRANSITION_DURATION_MOBILE}ms ease-in-out;
                padding: ${theme.spacings.mega};
              }

              ${theme.mq.kilo} {
                top: 50%;
                left: 50%;
                padding: ${theme.spacings.giga};
                transform: translate(-50%, -50%);
                min-height: 320px;
                max-height: 90vh;
                min-width: 480px;
                max-width: 90vw;
                opacity: 0;
                transition: opacity ${TRANSITION_DURATION_DESKTOP}ms ease-in-out;
                border-radius: ${theme.borderRadius.mega};
              }
            `,
            variant === 'immersive' &&
              cssString`
              ${theme.mq.untilKilo} {
                height: 100vh;
              }
            `,
            variant === 'contextual' &&
              cssString`
              ${theme.mq.untilKilo} {
                max-height: calc(100vh - ${theme.spacings.mega});
                border-top-left-radius: ${theme.borderRadius.mega};
                border-top-right-radius: ${theme.borderRadius.mega};
              }
            `,
            className,
          ),
          afterOpen: cssString`
            label: modal--after-open;

            ${theme.mq.untilKilo} {
              transform: translateY(0);
            }

            ${theme.mq.kilo} {
              opacity: 1;
            }
          `,
          beforeClose: cssString`
            label: modal--before-close;

            ${theme.mq.untilKilo} {
              transform: translateY(100%);
            }

            ${theme.mq.kilo} {
              opacity: 0;
            }
          `,
        };

        const overlayStyles = {
          base: cssString`
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            opacity: 0;
            transition: opacity ${TRANSITION_DURATION_MOBILE}ms ease-in-out;
            background: ${theme.colors.overlay};
            z-index: ${theme.zIndex.modal};

            ${theme.mq.kilo} {
              -webkit-overflow-scrolling: touch;
              overflow-y: auto;
              transition: opacity ${TRANSITION_DURATION_DESKTOP}ms ease-in-out;
            }
          `,
          afterOpen: cssString`
            opacity: 1;
          `,
          beforeClose: cssString`
            opacity: 0;
          `,
        };

        const reactModalProps = {
          className: styles,
          overlayClassName: overlayStyles,
          onRequestClose: handleClose,
          closeTimeoutMS: TRANSITION_DURATION,
          shouldCloseOnOverlayClick: dismissible,
          shouldCloseOnEsc: dismissible,
          ...props,
        };

        return (
          <ReactModal {...reactModalProps}>
            {dismissible && (
              <CloseButton
                onClick={onClose}
                label={labelCloseButton}
                css={closeButtonStyles}
              />
            )}

            {isFunction(children)
              ? children({ onClose: handleClose })
              : children}
          </ReactModal>
        );
      }}
    </ClassNames>
  );
};

Modal.TIMEOUT = TRANSITION_DURATION;
