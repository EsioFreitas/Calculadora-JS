class CalcContoller {
    constructor() {
        this._displayCalc = '0';
        this._currentDate;
        this.initialize();
    }

    initialize(){
        let displayEl = document.querySelector("#display");
        let dateEl = document.querySelector("#data");
        let timeEl = document.querySelector("#hora");

        dateEl.innerHTML = '01/03/2019';
        timeEl.innerHTML = "00:00";
    }

    get displayCalc(){
        return this._displayCalc;
    }

    set displayCalc(valor){
        this._displayCalc = valor;
    }

    get currentDate_currentDate(){
        return this._currentDate;
    }

    set currentDate_currentDate(valor){
        this._currentDate = valor;
    }
}