// import * as _ from 'lodash';

// function component() {
//     const element = document.createElement('div');

//     element.innerHTML = _.join(['Hello', 'webpack', 'tsx'], ' ');

//     return element;
//   }

//   document.body.appendChild(component());
import log from './utils';
log('page same')

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';

const root = document.getElementById('root');
if(root) {
  createRoot(root).render(<App />)
}

