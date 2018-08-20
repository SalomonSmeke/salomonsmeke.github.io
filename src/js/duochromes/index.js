import {
    COLOR_BY_KEYS,
    BUTTON_IDS,
    SPECIAL_KEYS,
    INITIAL_STATE,
    SECRETS_WIP_MESSAGE,
} from './constants';

/**
 * Get module state from the global state.
 * @return {dict} key - The module state.
 */
function getState() {
    return window.state['duochromes'];
}

/**
 * Uses a key to set a color palate for a duochrome.
 * @param {string} key - The duochrome key.
 */
function setDuochromeByKey(key) {
    const state = getState();

    key = [...Object.keys(COLOR_BY_KEYS), ...SPECIAL_KEYS].includes(key) ? key : 'None';
    key = state.setKey !== key ? key : 'None';

    if (state.lock) return;
    state.lock = true;

    if (SPECIAL_KEYS.includes(key)) {
        alert(SECRETS_WIP_MESSAGE);
        state.lock = false;
        return;
    }

    const colors = COLOR_BY_KEYS[key];

    Object.keys(colors).forEach((_class) => {
        [...document.getElementsByClassName(_class)].forEach((element) => {
            element.style.backgroundColor = `rgba(${colors[_class].join(',')})`;
        });
    });

    state.lock = false;
    state.setKey = key;
}

/**
 * Initialize module by adding state to browser storage
 * and setting up click listeners.
 */
function init() {
    window.state['duochromes'] = {...INITIAL_STATE};
    BUTTON_IDS.forEach((_id) => document.getElementById(_id).onclick = () => setDuochromeByKey(_id));
}

window.addEventListener('load', init);
