import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "@testing-library/react";
import Modal from './Modal';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Modal comments={[]}/>, div);

    ReactDOM.unmountComponentAtNode(div);
})
// it('should contain the paragraph text "Live Project"', () => {
//     const { getByText } = render(<Modal comments={[]}/>);
//     const title = getByText('Live Project');
//     expect(title.tagName.toLowerCase()).toEqual('p');
// });