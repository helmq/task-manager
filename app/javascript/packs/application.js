import WebpackerReact from 'webpacker-react';
import TaskBoard from './components/TaskBoard';
import '@babel/polyfill';

WebpackerReact.setup({ TaskBoard });
