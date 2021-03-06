class CalcContoller {
    constructor() {
        this._lastOperator = '';
        this._lasNumber = '';   
        this._operation = [];
        this._locale = 'pt-BR'
        this._displayEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.inputButtonsEvents();
    }

    copyToClipBoard(){
        let input = document.createElement('input');
        input.value = this.displayCalc;
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        input.remove();
    }

    pasteClipboard(){
        document.addEventListener('paste', e => {
            let text = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(text);
        })
    }

    initialize(){
        this.setDisplayDateTime();

        setInterval(()=>{
            this.setDisplayDateTime();
        }, 1000);
        this.initKeyboard();
        this.pasteClipboard();
    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(e =>{
            element.addEventListener(e, fn, false);
        })
    }

    isOperation(value){
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    clearAll(){
        this._operation = [];
        this._lasNumber = '';
        this._lastOperator ='';

        this.setNumberToDisplay()
    }

    addOperation(value){
        this._operation.push(value);
    }

    clearEntry(){
        this._operation.pop();
        this.setNumberToDisplay()
    }

    getLastOperation(){
        return (this._operation[this._operation.length-1]);
    }

    getResult(){
        return eval(this._operation.join(''));
    }

    calc(){
        let last = '';
        
        this._lastOperator = this.getLastItem(); 

        if(this._operation < 3){
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lasNumber];
        }

        if(this._operation > 3){
            last =  this._operation.pop();
            this._lasNumber = this.getResult();
        }else if(this._operation == 3)
            this._lasNumber = this.getLastItem(false);

        let result = this.getResult();

        if(last == '%'){
            result /= 100;
            this._operation = [result];
        }else {
            this._operation = [result];
            if(last) this._operation.push(last);
        }

        this.setNumberToDisplay();
    }

    pushOperator(value){
        this._operation.push(value);

        if(this._operation.length > 3){
            this.calc();
        }else {

        }
    }

    addOperation(value){
        console.log(this._operation)
        if(isNaN(this.getLastOperation())){

            if(this.isOperation(value)){
                this.setLastOperation(value);
            }else if(isNaN(value)){
                
            }else {
                this.pushOperator(value);
                this.setNumberToDisplay();
            }
        }else { 

            if( this.isOperation(value)){
                this.pushOperator(value);
            }else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation( (newValue));
                this.setNumberToDisplay();
                
            }
        }
    }

    getLastItem(isOperator = true){
        let lastItem;

        for (let i = this._operation.length-1; i >= 0; i--) {
            if(this.isOperation(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break;
            } 
        }

        if(!lastItem)
            lastItem = (isOperator) ? this._lastOperator : this._lasNumber;

        return lastItem;
    }

    setNumberToDisplay(){
        let lastNumber = this.getLastItem(false);

        if(!lastNumber) lastNumber = 0; 

        this.displayCalc = lastNumber; 
    }

    setLastOperation(value){
        this._operation[this._operation.length-1]= value;
    }
    
    setError(){
        this.displayCalc = 'Error'; 
    }

    addDot(){
        let lasOperation = this.getLastOperation();

        if(typeof lasOperation === 'string' && lasOperation.split('').indexOf('.') > -1) return;

        if(this.isOperation(lasOperation) || !lasOperation)
            this.pushOperator('0.');
        else this.setLastOperation(lasOperation.toString()+'.');

        this.setNumberToDisplay();
    }

    initKeyboard(){
        document.addEventListener('keyup', e => {
            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key); 
                    break;
                case 'Enter':
                case '=':
                    this.calc();    
                    break;
                case '.':
                case ',':
                    this.addDot(); 
                    break;
    
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(e.key));
                    break;

                case 'c':
                    if(e.ctrlKey) this.copyToClipBoard();
                    break;
            }
        })
    }

    execBtn(value){
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');                
                break;
            case 'divisao':
                this.addOperation('/'); 
                break;
            case 'subtracao':
                this.addOperation('-'); 
                break;
            case 'multiplicacao':
                this.addOperation('*'); 
                break;
            case 'porcento':
                this.addOperation('%'); 
                break;
            case 'igual':
                this.calc();    
                break;
            case 'ponto':
                this.addDot(); 
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
        
            default:
                this.setError();
                break;
        }
    }

    inputButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        [...buttons].forEach(btn=>{
            this.addEventListenerAll(btn,'click', e => {
                let textBtn = btn.className.baseVal.replace('btn-',"")
                this.execBtn(textBtn);
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
        if(value.toString().length > 10) {
            this.setError();
            return false;
        }
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