import React from 'react';
import ReactDOM from 'react-dom';
import ProfileTop from './ProfileTop';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<BrowserRouter><ProfileTop match={{params: {}}} /></BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
});