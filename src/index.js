import 'babel-polyfill';
import './index.css'


import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import App from './pages/App'

const root = createRoot(document.getElementById('root'));
root.render(<App />);