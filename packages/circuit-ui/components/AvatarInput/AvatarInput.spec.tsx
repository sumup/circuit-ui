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

import React, { useState } from 'react';

import Avatar from '../Avatar';
import { render, axe, userEvent, waitFor } from '../../util/test-utils';

import { AvatarInput, AvatarInputProps } from './AvatarInput';

const defaultProps = {
  label: 'Upload an image',
  loadingLabel: 'Uploading',
  clearButtonLabel: 'Clear',
  onChange: () => Promise.resolve(),
  onClear: () => {},
  component: Avatar,
} as const;

describe('AvatarInput', () => {
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  global.URL.createObjectURL = jest.fn();

  function renderAvatarInput(
    props: AvatarInputProps = defaultProps,
    options = {},
  ) {
    return render(<AvatarInput {...props} />, options);
  }

  describe('styles', () => {
    it('should render with default styles', () => {
      const { container } = renderAvatarInput();
      expect(container).toMatchSnapshot();
    });

    it('should render with an existing image', () => {
      const { container } = renderAvatarInput({
        ...defaultProps,
        src: 'https://source.unsplash.com/EcWFOYOpkpY/200x200',
      });
      expect(container).toMatchSnapshot();
    });

    it('should render with invalid styles', () => {
      const { container } = renderAvatarInput({
        ...defaultProps,
        invalid: true,
        validationHint:
          'The uploaded image exceeds the maximum allowed size. Please use an image with a size below 20MB.',
      });
      expect(container).toMatchSnapshot();
    });
  });

  const mockUploadFn = jest
    .fn<Promise<string>, [File]>()
    .mockResolvedValue('https://source.unsplash.com/EcWFOYOpkpY/200x200');
  const mockClearFn = jest.fn();

  /**
   * Copied from the component Stories
   */
  function StatefulInput() {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [error, setError] = useState<string>('');

    const onChange = (file: File) => {
      setError('');
      setImageUrl('');
      return mockUploadFn(file)
        .then((remoteImageUrl) => {
          setImageUrl(remoteImageUrl);
        })
        .catch((e: Error) => setError(e.message));
    };

    const onClear = () => {
      setError('');
      setImageUrl('');
      mockClearFn();
    };

    return (
      <AvatarInput
        label="Upload an image"
        clearButtonLabel="Clear"
        src={imageUrl}
        onChange={onChange}
        onClear={onClear}
        invalid={!!error}
        validationHint={error}
        loadingLabel="Uploading"
        component={Avatar}
      />
    );
  }

  describe('business logic', () => {
    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    it('should call the provided upload function', async () => {
      const { getAllByLabelText } = render(<StatefulInput />);
      /**
       * TODO find a better way to query the input. We can't use a query by role because
       * a file input can be a role=button (according to Chrome) but role=button on an
       * input element is invalid according to jest-axe.
       */
      const inputEl = getAllByLabelText(
        defaultProps.label,
      )[1] as HTMLInputElement;

      userEvent.upload(inputEl, file);

      await waitFor(() => {
        expect(inputEl.files && inputEl.files[0]).toEqual(file);
        expect(inputEl.files).toHaveLength(1);
        expect(mockUploadFn).toHaveBeenCalledWith(file);
      });
    });

    it('should render a successfully uploaded image', async () => {
      const { getAllByLabelText, getByRole } = render(<StatefulInput />);
      const inputEl = getAllByLabelText(
        defaultProps.label,
      )[1] as HTMLInputElement;
      const imageEl = getByRole('img') as HTMLImageElement;

      userEvent.upload(inputEl, file);

      await waitFor(() => {
        expect(imageEl.src).toBe(
          'https://source.unsplash.com/EcWFOYOpkpY/200x200',
        );
      });
    });

    it('should clear an uploaded image', async () => {
      const { getAllByLabelText, getByRole } = render(<StatefulInput />);
      const inputEl = getAllByLabelText(
        defaultProps.label,
      )[1] as HTMLInputElement;
      const imageEl = getByRole('img') as HTMLImageElement;

      userEvent.upload(inputEl, file);

      await waitFor(() => {
        expect(imageEl.src).toBe(
          'https://source.unsplash.com/EcWFOYOpkpY/200x200',
        );
      });

      userEvent.click(
        getByRole('button', { name: defaultProps.clearButtonLabel }),
      );

      await waitFor(() => {
        expect(mockClearFn).toHaveBeenCalledTimes(1);
        expect(imageEl.src).not.toBe(
          'https://source.unsplash.com/EcWFOYOpkpY/200x200',
        );
      });
    });

    it('should render an error message when the upload fails', async () => {
      const errorMessage =
        'The uploaded image exceeds the maximum allowed size. Please use an image with a size below 20MB.';
      mockUploadFn.mockRejectedValue(new Error(errorMessage));
      const { getAllByLabelText, getByText } = render(<StatefulInput />);
      const inputEl = getAllByLabelText(
        defaultProps.label,
      )[1] as HTMLInputElement;

      userEvent.upload(inputEl, file);

      await waitFor(() => {
        expect(getByText(errorMessage)).toBeVisible();
        expect(inputEl).toBeInvalid();
      });
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = render(<StatefulInput />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
