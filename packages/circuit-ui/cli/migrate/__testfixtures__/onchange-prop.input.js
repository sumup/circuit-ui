import React from 'react';
import styled from '@emotion/styled';
import { RadioButton, Switch, Toggle } from '@sumup/circuit-ui';

const BaseRadioButton = () => <RadioButton onToggle={() => {}} checked />;

const RedRadioButton = styled(RadioButton)`
  color: red;
`;

const StyledRadioButton = () => <RedRadioButton onToggle={() => {}} checked />;

const BaseSwitch = () => <Switch onToggle={() => {}} checked />;

const RedSwitch = styled(Switch)`
  color: red;
`;

const StyledSwitch = () => <RedSwitch onToggle={() => {}} checked />;

const BaseToggle = () => <Toggle onToggle={() => {}} checked />;

const RedToggle = styled(Toggle)`
  color: red;
`;

const StyledToggle = () => <RedToggle onToggle={() => {}} checked />;
