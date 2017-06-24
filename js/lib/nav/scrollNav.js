import { easing, scrollTo } from '../animation';

const WHITE = '#fff';
const COLORS = [
  '#f00',
  '#0f0',
  '#00f'
];
const COLOR_MODE = 'difference';
const ELEMENT_ID = 'scroll-nav';
const DIMS = {
  height: 384,
  width: 128,
};

function draw(ts) {
  ts /= 10;
  const canvas_ctx = document.getElementById(ELEMENT_ID).getContext(
    '2d',
    { alpha: false }
  );
  canvas_ctx.clearRect(0, 0, DIMS.width, DIMS.height);
  canvas_ctx.restore();
  canvas_ctx.fillRect(0, 0, DIMS.width, DIMS.height);
  [
    {
      magnitude: 0.019,
      color: COLORS[0]
    },
    {
      magnitude: 0.0189,
      color: COLORS[1]
    },
    {
      magnitude: 0.0188,
      color: COLORS[2]
    }
  ].forEach((props) => {
    canvas_ctx.strokeStyle = props.color;
    canvas_ctx.beginPath();
    canvas_ctx.arc(
      DIMS.x,
      Math.floor((DIMS.motion * Math.cos(ts * props.magnitude)) + DIMS.y_offset),
      DIMS.radius,
      0,
      Math.PI * 2
    );
    canvas_ctx.stroke();
  });
  canvas_ctx.save();
  window.requestAnimationFrame(draw);
}

function start() {
  const pdim = DIMS.height / 5;
  const sep = pdim / 8;
  DIMS.stroke = pdim / 5;
  DIMS.radius = (pdim - DIMS.stroke) / 2;
  DIMS.x = DIMS.width / 2;
  DIMS.y_offset = DIMS.height / 2;
  DIMS.range = {
    min: sep + pdim,
    max: DIMS.height - (sep + (pdim / 2))
  };
  DIMS.motion = (DIMS.range.max - DIMS.range.min) / 2;
  const canvas_ctx = document.getElementById(ELEMENT_ID).getContext(
    '2d',
    { alpha: false }
  );
  canvas_ctx.lineWidth = DIMS.stroke;
  canvas_ctx.globalCompositeOperation = COLOR_MODE;
  canvas_ctx.fillStyle = WHITE;
  canvas_ctx.save();
  window.requestAnimationFrame(draw);
}

// TODO: Move this to the module.
function scrollListener(local_ctx) {
  if (local_ctx.props.running) return;
  local_ctx.props.running = true;
  function scrollFrame(time) {
    const props = local_ctx.props;
    const timeElapsed = time - props.timeStart;
    scrollTo(0, easing(timeElapsed, props.start, props.distance, props.duration));
    if (timeElapsed < props.duration) {
      window.requestAnimationFrame(scrollFrame);
    } else {
      scrollTo(0, props.start + props.distance);
      props.running = false;
    }
  }
  local_ctx.props.start = window.pageYOffset;
  local_ctx.props.distance = window.innerHeight / 2 > local_ctx.props.start ?
  document.getElementById('content-wrapper').getBoundingClientRect().top :
  document.getElementById('spread').getBoundingClientRect().top;

  window.requestAnimationFrame((time) => {
    local_ctx.props.timeStart = time;
    scrollFrame(time);
  });
}

export { start, scrollListener };
