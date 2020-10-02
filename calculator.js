/*********************** GLOBAL VARIABLES ********************/

let resultText = '';
let operator = '';

const resultCell = document.querySelector('.result-cell');

/*************************************************************/

init();

/****** WE USE querySelectorAll() TO SELECT ALL ELEMENTS THAT HAVE THE SAME SELECTOR ******/

function init() {
    let rowList = document.querySelectorAll('.calculator-row');
    rowList.forEach(function(row){
        row.addEventListener('click', function(event) {
            buttonClick(event.target.innerText);
        })
    })
}

/*************** buttonClick(button): IDENTIFIES & HANDLES THE INPUT **************/

function buttonClick(button) {
    let buttonClicked = button;

    if(buttonClicked === 'C'){
        clear();
    }
    else if(buttonClicked === '←'){
        deleteLastDigit();
    }
    else if(isOperator(buttonClicked)) {  

        switch (buttonClicked) {
            case '-':
                if (resultCell.innerText === '0') {
                    resultCell.innerText = '-';
                }
                else {
                    resultCell.innerText = '0';
                }
                operator = '-';
                break;
        
            case '×': 
                operator = '*';
                resultCell.innerText = '0';
                break;
            
            case '÷': 
                operator = '/';
                resultCell.innerText = '0';
                break;

            default:
                operator = '+';
                resultCell.innerText = '0';
                break;
        }
        resultText += operator;
    }
    else if(buttonClicked === '=') {
        let result = calculate(operator);
        resultText = "" + result;
        resultCell.innerText = resultText;
    }
    else {
        makeInput(buttonClicked);
    }
}

/********** clear(): WHEN THE BUTTON C IS CLICKED: THE RESULT CELL IS SET TO 0 **********/

function clear() {
    resultText = '';   
    operator = '';
    resultCell.innerText = '0';
}

/***** deleteLastDigit(): WHEN THE BUTTON ← IS CLICKED: THE LAST DIGIT ON THE SCREEN WILL BE DELETED (IF THE RESULT HAS ONLY 1 DIGIT, THE RESULT WILL BE SET TO 0) *****/

function deleteLastDigit() {
    let inputText = resultCell.innerText;
    if(inputText.length === 1){
        resultCell.innerText = '0';
        resultText += '0';
    }
    else{    
        resultCell.innerText = inputText.substring(0, inputText.length-1);  
        resultText = resultText.substring(0, resultText.length-1);  
    }
}

/************* isOperator(button): CHECKS IF THE INPUT IS AN OPERATOR OR NOT *************/

function isOperator(button) {
    if(button === '+' || button === '-' || button === '×' || button === '÷')
        return true;
    else
        return false;
}

/*************** makeInput(number): MAKES INPUT FROM THE BUTTONS CLICKED ***************/

function makeInput(number){
    let inputText = resultCell.innerText;
    if(inputText === '0') {
        inputText = number;
    }
    else {
        inputText += number;
    }
    resultCell.innerText = inputText;
    resultText += number;
}

/********** calculate(op): EVALUATES THE ESPRESSION MADE FROM THE BUTTONS CLICKED **********/

function calculate(op) {
    let result = 0;
    if(resultText.indexOf(op) <= resultText.length-1) {
        result = eval(resultText);
        operator = '';
        resultCell.innerText = result;
    }
    else {
        if(op === '+' && resultText.indexOf(op) == 0) {
            result = resultText;
        }
        else if(op === '-' && resultText.indexOf(op) == 0) {
            result = op + resultText;   
            operator = '';
        }    
    }
    
    return result;
}
