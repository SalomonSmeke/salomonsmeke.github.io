export const SECRETS_WIP_MESSAGE = '⏳ no secrets yet ⏳';

export const SPECIAL_KEYS = ['Secret'];

export const COLOR_BY_KEYS = {
    'Rd/Gr': [
        [[255, 0, 0], 55],
        [[0, 255, 0], 45],
    ],
    'Vi/Cy': [
        [[250, 107, 255], 55],
        [[116, 255, 230], 45],
    ],
    'Pr/Yw': [
        [[174, 60, 215], 55],
        [[249, 222, 14], 45],
    ],
    'None': [
        [[255, 255, 250], 100],
        [[255, 255, 250], 0],
    ],
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
