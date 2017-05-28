
// Thanks, http://robertpenner.com/easing/
// Time elapsed, start, distance, duration.
const easing = (t, b, c, d) => {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + (c * ((-2 * tc) + (3 * ts)));
};

const scrollTo = (x, y) => {
  window.scrollTo(x, y);
};

export { easing, scrollTo };
