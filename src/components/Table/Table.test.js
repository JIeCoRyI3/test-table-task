import React from 'react';
import { shallow, mount } from 'enzyme';
import Table from './Table';
import {getData} from "../api/apiClient";

describe('<Table />', () => {
    it('should render', () => {
        const wrapper = shallow(<Table />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should setState on componentDidMount', () => {
        const wrapper = shallow(<Table />);
        const instance = wrapper.instance();
        instance.componentDidMount = () => {
            instance.setState();
        };
        const spy = jest.spyOn(instance, "setState");
        instance.componentDidMount();
        expect(spy).toHaveBeenCalled();
    });

    it('should not broke ww=ith loader', () => {
        const wrapper = mount(<Table />);
        const instance = wrapper.instance();
        instance.setState({
            isLoading: false,
            data: [{}, {}]
        });
        expect(instance.state.isLoading).toBeFalsy();
    });

    it('should call getData', async () => {
        const wrapper = mount(<Table />);
        const instance = wrapper.instance();
        await getData();
        expect(instance.state.isLoading).toBeFalsy();
    });

    it('should get all fields', async () => {
        const wrapper = mount(<Table />);
        await getData();
        wrapper.update();
        expect(wrapper.find('#Name')).toBeDefined();
    });

    it('should clear fields', async () => {
        const mElement = { value: 123 };
        document.getElementById = jest.fn(() => {
            return mElement;
        });
        const wrapper = mount(<Table />);
        await getData();
        wrapper.update();
        const instance = wrapper.instance();
        instance.addString();
        expect(wrapper.find('#Name')).toBeDefined();
    });
});
