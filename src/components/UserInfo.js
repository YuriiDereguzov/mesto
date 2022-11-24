import { textNameNew, textJobNew } from '../utils/constants.js';

export default class UserInfo {
    constructor({ name, job }) {
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
    }

    getUserInfo() {
        textNameNew.value = this._name.textContent;
        textJobNew.value = this._job.textContent;
    }

    setUserInfo(name, job) {
        this._name.textContent = name;
        this._job.textContent = job;
    }
}