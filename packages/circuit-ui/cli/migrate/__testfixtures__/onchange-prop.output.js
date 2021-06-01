import React from 'react';
import styled from '@emotion/styled';
import { RadioButton, Switch, Toggle } from '@sumup/circuit-ui';

const BaseRadioButton = () => <RadioButton onChange={() => {}} checked />;

const RedRadioButton = styled(RadioButton)`
  color: red;
`;

const StyledRadioButton = () => <RedRadioButton onChange={() => {}} checked />;

const BaseSwitch = () => <Switch onChange={() => {}} checked />;

const RedSwitch = styled(Switch)`
  color: red;
`;

const StyledSwitch = () => <RedSwitch onChange={() => {}} checked />;

const BaseToggle = () => <Toggle onChange={() => {}} checked />;

const RedToggle = styled(Toggle)`
  color: red;
`;

const StyledToggle = () => <RedToggle onChange={() => {}} checked />;
