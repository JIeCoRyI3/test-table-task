import * as serverResponse from './data.json';

export function getData() {
    return new Promise(res => setTimeout(() => res(JSON.stringify(serverResponse.dataArray)), 2000));
}

export function editString(data) {
    serverResponse.dataArray[data.id] = data;
    return new Promise(res => setTimeout(() => res(JSON.stringify(serverResponse.dataArray[data.id])), 1000));
}

export function postString(data) {
    data.id = serverResponse.dataArray.length;
    serverResponse.dataArray.push(data);
    return new Promise(res => setTimeout(() => res(JSON.stringify(serverResponse.dataArray)), 1000));
}
