import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import App from '@/app/index';

import 'react-toastify/dist/ReactToastify.css';
import i18n from '@/i18n';

const rootEl = document.getElementById('root');

render(
  <>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </>,
  rootEl,
);
