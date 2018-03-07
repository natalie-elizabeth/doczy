import React from 'react';
import shallowToJSON from 'enzyme-to-json';
import { mountWithContext as mount, shallowWithContext as shallow } from '../test-utils';
import { DocumentViewContainer } from '../../client/src/components/Documents/documentContainer';


const constructWrapper = props => shallow(<DocumentViewContainer {...props} />);
const constructProps = ({ documents = [] } = {}) => ({
  deleteDocument() { },
  router: {},
  documentActions: {
    listDocuments() { }
  },
  documentList: {
    documents
  },
});

describe('document container', () => {
  it('should render correctly', () => {
    const wrapper = constructWrapper(constructProps());
    expect(wrapper.props().className).toBe('container');
  });
  it('should have a matching snapshot', () => {
    const wrapper = constructWrapper(constructProps());
    const tree = shallowToJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should have a dialog container', () => {
    const wrapper = constructWrapper(constructProps());
    expect(wrapper.find('Dialog').length).toEqual(1);
  });
  it('should handleClose', () => {
    beforeEach((done) => {
      setTimeout(() => {
        done();
      }, 500);
    });
  });
  it('handleOpen opens the modal', () => {
    const props = constructProps();
    const wrapper = constructWrapper(props);

    let state = wrapper.state();
    expect(state.open).toBe(false);
    expect(wrapper.find('Dialog').props().open).toBe(false);

    const button = wrapper.find('FloatingActionButton').first();
    button.simulate('click');

    state = wrapper.state();
    expect(state.open).toBe(true);
    expect(wrapper.find('Dialog').props().open).toBe(true);
  });

  it('handleClose closes the modal', () => {
    const props = constructProps();
    const wrapper = constructWrapper(props);

    let state = wrapper.state();
    expect(state.open).toBe(false);
    expect(wrapper.find('Dialog').props().open).toBe(false);

    const button = wrapper.find('FlatButton').first();
    button.simulate('click');

    state = wrapper.state();
    expect(state.open).toBe(false);
    expect(wrapper.find('Dialog').props().open).toBe(false);
  });
});
