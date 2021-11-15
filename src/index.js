import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import Loading from './pages/Loading';
import App from './components/App';

import { GlobalStyle } from './styles/';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <RecoilRoot>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </RecoilRoot>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();
