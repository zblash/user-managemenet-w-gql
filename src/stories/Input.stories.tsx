import React from 'react';

import { UIInputComponent } from '@/components/input';

export default {
  title: 'Button',
  component: UIInputComponent,
};

export const Default = () => <UIInputComponent labelKey="Test" type="text" name="testInput" errorKey="Error" />;
