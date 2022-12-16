export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
        this._textNameNew = document.querySelector('.popup__input_type_name');
        this._textJobNew = document.querySelector('.popup__input_type_job');
    }

    getUserInfo() {
        this._textNameNew.value = this._name.textContent;
        this._textJobNew.value = this._job.textContent;
    }

    setUserInfo(name, job) {
        this._name.textContent = name;
        this._job.textContent = job;
    }
}