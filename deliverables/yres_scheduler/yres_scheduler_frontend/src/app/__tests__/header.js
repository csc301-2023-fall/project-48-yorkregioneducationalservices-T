import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../components/header';

it('renders properly', () => {
    const component = renderer.create(<Header/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});