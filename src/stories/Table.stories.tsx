/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import { UITableComponent } from '@/components/table';
import { IUser } from '@/helpers/api-models';

export default {
  title: 'Button',
  component: UITableComponent,
};

const users: IUser[] = [
  {
    id: 1,
    name: 'Test1',
    lastname: 'Test1',
    phone: '5555555555',
    email: 'Test1@test.com',
    date_of_birth: '12/12/2000',
  },
  {
    id: 2,
    name: 'Test2',
    lastname: 'Test2',
    phone: '5555555555',
    email: 'Test2@test.com',
    date_of_birth: '12/12/2000',
  },
  {
    id: 3,
    name: 'Test3',
    lastname: 'Test3',
    phone: '5555555555',
    email: 'Test3@test.com',
    date_of_birth: '12/12/2000',
  },
];

export const Default = () => (
  <UITableComponent
    columns={[
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Lastname',
        accessor: 'lastname',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Date of Birth',
        accessor: 'date_of_birth',
      },
    ]}
    data={users}
  />
);
