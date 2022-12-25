import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
}

refs.startBtn.setAttribute('disabled', true);

let selectDate = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < options.defaultDate) {
    return Notiflix.Notify.failure("Please choose a date in the future");
    }
    refs.startBtn.removeAttribute('disabled');
    selectDate = selectedDates[0].getTime();
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onStartBtn);

let timerId = null;

function onStartBtn() {
  timerId = setInterval(() => {
    const currentDate = new Date();
    const differenceTime = selectDate - currentDate;
    const timeConvertor = convertMs(differenceTime);
    updateTimer(timeConvertor);
  },1000)
}

function updateTimer({days, hours, minutes, seconds}) {
  refs.day.textContent = days;
  refs.hour.textContent = hours;
  refs.minute.textContent = minutes;
  refs.second.textContent = seconds;
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}





