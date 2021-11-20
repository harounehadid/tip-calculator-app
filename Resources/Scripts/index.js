// # Global Variables //
const billInput = document.getElementById('bill');
const tipOptions = document.getElementsByClassName('tip-options');
const tipInput = document.getElementById('custom-tip');
const peopleNumInput = document.getElementById('people-num');

const tipAmountText = document.getElementById('tip-amount');
const totalText = document.getElementById('total');

const resetButton = document.getElementById('reset-button');

let billPrevValue = '';
let tipPrevValue = '';
let peopleNumPrevValue = '';

// # Functions //
// This is the function that verifies against regex
const checkAgainstRegex = (regex, str) => regex.test(str);

// Restrict what the user can input
const validateInput = (inputType, curValue, prevValue) => {
    let regex;

    if (inputType === 'integer') {
        regex = new RegExp('(^0$)|(^[1-9][0-9]*$)');
    }
    else if (inputType === 'float') {
        regex = new RegExp('(^0$)|(^0\\.([0-9]{1,2})?$)|(^[1-9][0-9]*$)|(^[1-9][0-9]*\\.([0-9]{1,2})?$)');
    }
    else {
        console.error("Unidentified input type");
    }

    if (!checkAgainstRegex(regex, curValue)) {
        
        if (curValue !== '00' && curValue.length === 2 && checkAgainstRegex(regex, curValue[1])) {
            /* This will change 0 to a number from 1 to 9 depending on what the user
            entered, this so the user won't need to remove the number 0 to write 
            another*/
            prevValue = curValue[1];
        }

        if (curValue !== '') {
            curValue = prevValue;
        }
    }

    return curValue;
}

// Check reset button state and updating the button
const resetBtnIsActive = () => {
    if (billPrevValue !== '' && tipPrevValue !== '' && peopleNumPrevValue !== '') {
        return true;
    }
    else {
        return false;
    }
}

const updateResetBtnState = () => {
    if (resetBtnIsActive() && resetButton.style.backgroundColor !== '#26c0ab') {
        resetButton.style.backgroundColor = '#26c0ab';
    }
}
// Display the results
const disaplyResults = () => {
    let tipAmount = 0;
    let total = 0;

    if (resetBtnIsActive() && peopleNumPrevValue !== '0') {

        const bill = +billPrevValue;
        const tip = +tipPrevValue / 100;
        const peopleNum = +peopleNumPrevValue;
    
        tipAmount = (+bill * +tip).toFixed(2);
        total = ((+bill + +tipAmount) / +peopleNum).toFixed(2);
    }

    tipAmountText.innerHTML = tipAmount.toString();
    totalText.innerHTML = total.toString();
}

// # Dealing with events //
billInput.addEventListener('input', () => {
    billInput.value = validateInput('float', billInput.value, billPrevValue);
    billPrevValue = billInput.value;

    updateResetBtnState();
    disaplyResults();
});

tipInput.addEventListener('input', () => {
    tipInput.value = validateInput('integer', tipInput.value, tipPrevValue);
    tipPrevValue = tipInput.value;

    updateResetBtnState();
    disaplyResults();
});

peopleNumInput.addEventListener('input', () => {
    peopleNumInput.value = validateInput('integer', peopleNumInput.value, peopleNumPrevValue);
    peopleNumPrevValue = peopleNumInput.value;

    if (peopleNumInput.value === '0') {
        // Activate error message
    }

    updateResetBtnState();
    disaplyResults();
});