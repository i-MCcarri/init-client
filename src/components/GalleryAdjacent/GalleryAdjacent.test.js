import React from 'react';
import ReactDOM from 'react-dom';
import GalleryAdjacent from './GalleryAdjacent';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<BrowserRouter><GalleryAdjacent match={{params: {}}} /></BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
});