import en_US from './language/en';
import zh_CN from './language/zh';

export function setCurrentLanguageSign(lanSign) {
    switch (lanSign) {
        case 'English':
            window.language = 'English';
            window.languageObj = en_US;
            break;
        case 'Chinese':
            window.language = 'Chinese';
            window.languageObj= zh_CN
            break;
        default:
            window.language = 'English';
            window.languageObj = en_US;
            break;
    }
}

export function getTranslateLanguage(languageKey, category) {

    if (category) {
        let kindObject = window.languageObj[category];
        if (kindObject && languageKey) {
            let languageStr = kindObject[languageKey];
            if (languageStr)
                return languageStr;
        }
    }

    if (languageKey && window.languageObj[languageKey]) {
        return window.languageObj[languageKey];
    }

    console.warn('Can not find language string by KEY ' + languageKey);
    return languageKey;
}
