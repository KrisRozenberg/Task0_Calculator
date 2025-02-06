const COLOR_THEMES = {
    light: {
        background: 'rgb(220, 220, 220)',
        font: 'rgb(49, 49, 49)',
        gradientUp: 'white',
        gradientCenter: 'lightgray',
        button: 'hsl(0, 0%, 100%)',
        buttonHover: 'hsl(0, 0%, 95%)',
        buttonActive: 'hsl(0, 0%, 92%)',
        lpoButton: 'hsl(0, 0%, 93%)',
        lpoButtonHover: 'hsl(0, 0%, 88%)',
        lpoButtonActive: 'hsl(0, 0%, 85%)',
        operatorButton: 'hsl(34, 100%, 58%)',
        operatorButtonHover: 'hsl(34, 100%, 53%)',
        operatorButtonActive: 'hsl(34, 100%, 50%)'
    },
    dark: {
        background: 'rgb(97, 97, 97)',
        font: 'white',
        gradientUp: 'black',
        gradientCenter: 'gray',
        button: 'hsl(0, 0%, 62%)',
        buttonHover: 'hsl(0, 0%, 67%)',
        buttonActive: 'hsl(0, 0%, 70%)',
        lpoButton: 'hsl(0, 0%, 47%)',
        lpoButtonHover: 'hsl(0, 0%, 52%)',
        lpoButtonActive: 'hsl(0, 0%, 55%)',
        operatorButton: 'hsl(34, 100%, 58%)',
        operatorButtonHover: 'hsl(34, 100%, 63%)',
        operatorButtonActive: 'hsl(34, 100%, 66%)'
    }
};

export function changeTheme(themeKey) {
    const styles = document.body.style;
    styles.setProperty('--bg-color', COLOR_THEMES[themeKey].background);
    styles.setProperty('--font-color', COLOR_THEMES[themeKey].font);
    styles.setProperty('--gradient-up-color', COLOR_THEMES[themeKey].gradientUp);
    styles.setProperty('--gradient-center-color', COLOR_THEMES[themeKey].gradientCenter);

    styles.setProperty('--button-color', COLOR_THEMES[themeKey].button);
    styles.setProperty('--button-hover-color', COLOR_THEMES[themeKey].buttonHover);
    styles.setProperty('--button-active-color', COLOR_THEMES[themeKey].buttonActive);

    styles.setProperty('--lpo-button-color', COLOR_THEMES[themeKey].lpoButton);
    styles.setProperty('--lpo-button-hover-color', COLOR_THEMES[themeKey].lpoButtonHover);
    styles.setProperty('--lpo-button-active-color', COLOR_THEMES[themeKey].lpoButtonActive);

    styles.setProperty('--operator-button-color', COLOR_THEMES[themeKey].operatorButton);
    styles.setProperty('--operator-button-hover-color', COLOR_THEMES[themeKey].operatorButtonHover);
    styles.setProperty('--operator-button-active-color', COLOR_THEMES[themeKey].operatorButtonActive);
}