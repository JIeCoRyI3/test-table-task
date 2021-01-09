import React from 'react';
import styles from './String.module.css';
import {editString} from "../api/apiClient";

class String extends React.Component{

    state = {
        data: null,
    };

    componentDidMount() {
        this.setState({
            data: this.props.stringData
        });
    }

    onSave = () => {
        const {id} = this.state.data;
        const {name, surname, age} = this.getFields();

        editString({
            id: this.props.stringData.id,
            name: name.value,
            surname: surname.value,
            age: age.value
        }).then(res => {
            this.setState({
                data: JSON.parse(res)
            });

            this.changeToDiv(name);
            this.changeToDiv(surname);
            this.changeToDiv(age);
            document.getElementById("edit" + id).style.display = 'block';
            document.getElementById("save" + id).style.display = 'none';
        }).catch(err => {
            console.log(err);
        });


    };

    onEdit = () => {
        const {name, surname, age} = this.getFields();
        const {id} = this.state.data;
        document.getElementById("edit" + id).style.display = 'none';
        document.getElementById("save" + id).style.display = 'block';

        this.changeToInput(name);
        this.changeToInput(surname);
        this.changeToInput(age);
    };

    changeToInput = (element) => {
        element.outerHTML = `<input id=${element.id} value=${element.innerText}>`;
    };

    changeToDiv = (element) => {
        element.outerHTML = `<div id=${element.id}>${element.value}</div>`;
    };

    getFields = () => {
        const {id} = this.state.data;
        const name = document.getElementById("name" + id);
        const surname = document.getElementById("surname" + id);
        const age = document.getElementById("age" + id);
        return {name, surname, age}
    };

    render() {
        const {data} = this.state;

        return !data? <h1>Loading...</h1> : (
            <div className={styles.String}>
                <div id={"name" + data.id}>{data.name}</div>
                <div id={"surname" + data.id}>{data.surname}</div>
                <div id={"age" + data.id}>{data.age}</div>
                <button id={'edit' + data.id} onClick={this.onEdit}>Edit</button>
                <button id={'save' + data.id} className={styles.save} onClick={this.onSave}>Save</button>
            </div>
        )
    }
}

export default String;
