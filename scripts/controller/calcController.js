class CalcContoller {
    constructor() {
        this._locale = 'pt-BR'
        this._displayEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.inputButtonsEvents();
    }

    initialize(){
        this.setDisplayDateTime();

        setInterval(()=>{
            this.setDisplayDateTime();
        }, 1000);
        
    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(e =>{
            element.addEventListener(e, fn, false);
        })
    }

    inputButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        [...buttons].forEach(btn=>{
            this.addEventListenerAll(btn,'click', e => {
                console.log(btn.className.baseVal.replace('btn-',""));
            })

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => btn.style.cursor = 'pointer')
        })
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayEl.innerHTML;
    }

    set displayCalc(value){
        this._displayEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }
}