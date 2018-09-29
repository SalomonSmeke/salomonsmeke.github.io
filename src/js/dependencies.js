// Styles
import '../styles/main.scss';

// Font
const font = document.createElement('link');
Object.assign(font, {
    'rel': 'stylesheet',
    'href': process.env.FONT_URI,
});
document.head.appendChild(font);
