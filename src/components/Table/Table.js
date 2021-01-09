import React from 'react';
import styles from './Table.module.css';
import {getData, postString} from "../api/apiClient";
import String from "../String";

class Table extends React.Component {

    state = {
        data: null,
        isLoading: true,
    };

    componentDidMount() {
        getData().then(res => {
            this.setState({
                data: JSON.parse(res),
                isLoading: false
            })
        }).catch(err => {
            console.log(err);
        });
    }

    addString = () => {
        const name = document.getElementById('Name').value;
        document.getElementById('Name').value = '';
        const surname = document.getElementById('Surname').value;
        document.getElementById('Surname').value = '';
        const age = document.getElementById('Age').value;
        document.getElementById('Age').value = '';

        postString({
            name,
            surname,
            age
        }).then(res => {
            this.setState({
                data: JSON.parse(res),
                isLoading: false
            })
        }).catch(err => {
            console.log(err);
        });
    };

    render() {
        const {isLoading, data} = this.state;

        return isLoading? <h1>Loading...</h1> : (
            <div>
                <div className={styles.TableHead}>
                    <div>Name</div>
                    <div>Surname</div>
                    <div>Age</div>
                </div>
                {data.map((string, id) => {
                    return <String stringData={string} key={id}/>
                })}
                <div className={styles.TableHead}>
                    <input id="Name" placeholder="Name"/>
                    <input id="Surname" placeholder="Surname"/>
                    <input id="Age" placeholder="Age"/>
                    <button onClick={this.addString}>Add new String</button>
                </div>
            </div>
        )
    }
}

export default Table;
