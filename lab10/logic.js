const curtain = document.getElementById('curtain');
const stage = document.getElementById('stage');
const lamp = document.getElementById('lamp');
const light = document.getElementById('light');
const rabbit = document.getElementById('rabbit');
const bird = document.getElementById('bird');
const hat = document.getElementById('hat');

curtain.addEventListener('click', () => {
    curtain.classList.add('is-open');
    setTimeout(() => {
        stage.classList.remove('hidden');
        stage.classList.add('dark');           // изначально света нет
    }, 1000);
});

function syncDark() {
    const on = light.classList.contains('on');
    stage.classList.toggle('dark', !on);
}

lamp.addEventListener('click', () => {
    light.classList.toggle('on');
    syncDark();
});

['mousedown', 'touchstart'].forEach(e =>
    lamp.addEventListener(e, () => lamp.classList.add('pressed'))
);
['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(e =>
    lamp.addEventListener(e, () => lamp.classList.remove('pressed'))
);

/* кролик ↔ голубь */
rabbit.addEventListener('click', () => {
    rabbit.classList.add('is-hidden');
    setTimeout(() => { bird.classList.add('is-shown'); }, 500);
});

bird.addEventListener('click', () => {
    bird.classList.remove('is-shown');
    setTimeout(() => { rabbit.classList.remove('is-hidden'); }, 500);
});

hat.addEventListener('click', () => {
    if (rabbit.classList.contains('is-hidden')) bird.classList.add('is-shown');
});
