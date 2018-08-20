export const SECRETS_WIP_MESSAGE = '⏳ no secrets yet ⏳';

export const SPECIAL_KEYS = ['Secret'];

export const COLOR_BY_KEYS = {
    'Rd/Gr': {
        'left-duochrome': [255, 0, 0, 1],
        'right-duochrome': [0, 255, 0, 1],
    },
    'Vi/Cy': {
        'left-duochrome': [250, 107, 255, 1],
        'right-duochrome': [116, 255, 230, 1],
    },
    'Pr/Yw': {
        'left-duochrome': [174, 60, 215, 1],
        'right-duochrome': [249, 222, 14, 1],
    },
    'None': {
        'left-duochrome': [0, 0, 0, 0],
        'right-duochrome': [0, 0, 0, 0],
    },
};

export const BUTTON_IDS = [
    ...Object.keys(COLOR_BY_KEYS).filter((key) => key !== 'None'),
    'Secret',
];

export const INITIAL_STATE = {
    setKey: 'None',
    lock: false,
    specialState: {},
};
