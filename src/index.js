import './index.html';
import './styles.css';
import { calculate, clearInput, mutateInputValue } from './core/display-manager';
import { changeTheme } from './core/theme-manager';

addEventHandlers();

function addEventHandlers() {
    const allButtons = document.getElementsByTagName('button');
    for (let i = 0; i < allButtons.length; i++) {
        const buttonValue = allButtons[i].innerText;
    
        if (buttonValue === '=') {
            allButtons[i].addEventListener('click', calculate);
        }
        else if (buttonValue === 'AC') {
            allButtons[i].addEventListener('click', clearInput);
        }
        else {
            allButtons[i].addEventListener('click', function() {
                mutateInputValue(allButtons[i].innerText)
            });
        }
    }
    
    const lightThemeButton = document.getElementById('light-theme');
    lightThemeButton.addEventListener('click', function() {
        changeTheme('light')
    });
    const darkThemeButton = document.getElementById('dark-theme');
    darkThemeButton.addEventListener('click', function() {
        changeTheme('dark')
    });
}
