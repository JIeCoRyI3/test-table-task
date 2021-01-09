import React from 'react';
import { shallow, mount } from 'enzyme';
import String from './String';
import {editString} from "../api/apiClient";

describe('<String />', () => {
    beforeEach(() => {
        const mElement = { style: { display: false} };
        document.getElementById = jest.fn(() => {
            return mElement;
        });
    });

    it('should render', () => {
        const wrapper = shallow(<String />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should call onEdit', () => {
        const wrapper = mount(<String stringData={{name: 'test', surname: 'test', id: 0, age: 23}}/>);
        const instance = wrapper.instance();
        const spy = jest.spyOn(instance, 'getFields');
        wrapper.find('#edit0').simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    it('should call onSave', () => {
        const wrapper = mount(<String stringData={{name: 'test', surname: 'test', id: 0, age: 23}}/>);
        const instance = wrapper.instance();
        const spy = jest.spyOn(instance, 'getFields');
        wrapper.find('#save0').simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    it('should call editString', async () => {
        const wrapper = mount(<String stringData={{name: 'test', surname: 'test', id: 0, age: 23}}/>);
        const instance = wrapper.instance();
        const spy = jest.spyOn(instance, 'changeToDiv');
        wrapper.find('#save0').simulate('click');
        await editString(instance.state.data);
        expect(spy).toHaveBeenCalled();
    });
});
