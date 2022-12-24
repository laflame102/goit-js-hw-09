const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
}
const VALUE = 1000;
let timerId = null;

refs.start.addEventListener('click', onStartBtn);
refs.stop.addEventListener('click', onStopBtn);

function onStartBtn() {
    refs.start.setAttribute('disabled', true);
   timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, VALUE)
}

function onStopBtn() {
    refs.start.removeAttribute('disabled');
    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}