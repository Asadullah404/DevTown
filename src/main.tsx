import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './Application/UI/App';
import Application from './Application/Application';
import './style.css';

// 1. Initialize Three.js 3D & CSS3D Application
new Application();

// 2. Mount React UI
const uiContainer = document.getElementById('ui');
if (uiContainer) {
  ReactDOM.createRoot(uiContainer).render(<App />);
}

