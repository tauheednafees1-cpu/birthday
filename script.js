const $ = (id) => document.getElementById(id);

let candlesBlown = false;


// BUTTON EVENTS

$('forYouButton').addEventListener('click', openBirthday);

$('complimentButton').addEventListener('click', showCompliment);

$('blowButton').addEventListener('click', blowCandles);

$('giftButton').addEventListener('click', openGift);

$('backButton').addEventListener('click', backToBirthday);


// OPEN BIRTHDAY PAGE

function openBirthday() {

    $('homePage').classList.add('hidden');

    $('birthdayPage').classList.remove('hidden');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

}


// EXTRA COMPLIMENT

function showCompliment() {

    $('compliment').classList.remove('hidden');

}


// BLOW CANDLES

function blowCandles() {

    if (candlesBlown) return;

    candlesBlown = true;

    $('blowButton').disabled = true;

    $('blowButton').textContent = 'Candles are out! 🎂';

    $('micStatus').textContent =
        'Your wish has been sent to the universe! ✨';


    // Turn off candles one by one

    const candles = document.querySelectorAll('.candle');

    candles.forEach((candle, index) => {

        setTimeout(() => {

            candle.classList.add('out');

        }, index * 250);

    });


    // Cake animation

    $('cakeBox').classList.add('party-mode');


    // Screen flash

    const flash = document.createElement('div');

    flash.className = 'celebration-flash';

    document.body.appendChild(flash);

    requestAnimationFrame(() => {

        flash.classList.add('flash');

    });

    setTimeout(() => flash.remove(), 1000);


    // Launch party effects

    launchConfetti(100);

    launchFireworks();

    launchPartyEmojis();

    launchColouredHearts();

    playBirthdaySound();


    // Show birthday message

    setTimeout(() => {

        $('celebration').classList.remove('hidden');

        $('micStatus').textContent =
            'The candles are out! Let the party begin! 🥳';

        launchConfetti(70);

        launchFireworks();

        launchPartyEmojis();

    }, 1250);

}


// BIRTHDAY SOUND EFFECT

function playBirthdaySound() {

    try {

        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        const context = new AudioContextClass();

        const notes = [
            523,
            659,
            784,
            1047,
            784,
            1047,
            1318
        ];

        notes.forEach((frequency, index) => {

            const oscillator = context.createOscillator();

            const gain = context.createGain();

            const startTime =
                context.currentTime + index * 0.14;

            oscillator.type = 'triangle';

            oscillator.frequency.value = frequency;

            gain.gain.setValueAtTime(
                0.001,
                startTime
            );

            gain.gain.exponentialRampToValueAtTime(
                0.10,
                startTime + 0.03
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                startTime + 0.23
            );

            oscillator.connect(gain);

            gain.connect(context.destination);

            oscillator.start(startTime);

            oscillator.stop(startTime + 0.25);

        });

        setTimeout(() => context.close(), 2500);

    } catch (error) {

        console.log('Birthday sound unavailable');

    }

}


// CONFETTI EFFECT

function launchConfetti(count = 100) {

    const colors = [

        '#ff9fbd',
        '#c3a8f2',
        '#ffd77d',
        '#a9dfcf',
        '#f5b5d0',
        '#9bdcff',
        '#ffffff'

    ];

    for (let i = 0; i < count; i++) {

        const piece = document.createElement('span');

        piece.className = 'confetti';

        piece.style.left =
            Math.random() * 100 + 'vw';

        piece.style.background =
            colors[i % colors.length];

        piece.style.setProperty(
            '--drift',
            (Math.random() * 180 - 90) + 'px'
        );

        piece.style.animationDelay =
            Math.random() * 0.8 + 's';

        piece.style.borderRadius =
            Math.random() > 0.5 ? '50%' : '2px';

        document.body.appendChild(piece);

        setTimeout(() => piece.remove(), 4500);

    }

}


// COLOURED HEARTS
// Light blue, yellow and purple only

function launchColouredHearts() {

    const hearts = [

        { symbol: '♥', color: '#8ed9ff' },

        { symbol: '♥', color: '#ffd96e' },

        { symbol: '♥', color: '#bda0ff' }

    ];

    // Only a few hearts, not too many

    for (let i = 0; i < 9; i++) {

        const heart = document.createElement('span');

        const item = hearts[i % hearts.length];

        heart.className = 'heart-effect';

        heart.textContent = item.symbol;

        heart.style.color = item.color;

        heart.style.left =
            (10 + Math.random() * 80) + 'vw';

        heart.style.bottom =
            (5 + Math.random() * 15) + 'vh';

        heart.style.animationDelay =
            Math.random() * 0.8 + 's';

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 4000);

    }

}


// OTHER PARTY EMOJIS

function launchPartyEmojis() {

    const emojis = [

        '🎉',
        '🎊',
        '🦋',
        '⭐',
        '🌸',
        '🎀',
        '✨',
        '🎈',
        '🧁',
        '🌷',
        '🥳',
        '💫'

    ];

    for (let i = 0; i < 12; i++) {

        const item = document.createElement('span');

        item.className = 'party-float';

        item.textContent = emojis[i];

        item.style.left =
            (5 + Math.random() * 90) + 'vw';

        item.style.bottom =
            (5 + Math.random() * 20) + 'vh';

        item.style.animationDelay =
            Math.random() * 0.7 + 's';

        document.body.appendChild(item);

        setTimeout(() => item.remove(), 4000);

    }

}


// FIREWORKS

function launchFireworks() {

    const colors = [

        '#8ed9ff',
        '#ffd96e',
        '#bda0ff',
        '#ff9fbd',
        '#a9dfcf'

    ];

    const centers = [

        { x: 20 + Math.random() * 15, y: 20 + Math.random() * 20 },

        { x: 65 + Math.random() * 15, y: 18 + Math.random() * 20 },

        { x: 40 + Math.random() * 20, y: 12 + Math.random() * 18 }

    ];

    centers.forEach(center => {

        for (let i = 0; i < 18; i++) {

            const spark = document.createElement('span');

            const angle = Math.PI * 2 * i / 18;

            const distance = 45 + Math.random() * 70;

            spark.className = 'firework';

            spark.style.left = center.x + 'vw';

            spark.style.top = center.y + 'vh';

            const color =
                colors[Math.floor(Math.random() * colors.length)];

            spark.style.background = color;

            spark.style.setProperty(
                '--x',
                Math.cos(angle) * distance + 'px'
            );

            spark.style.setProperty(
                '--y',
                Math.sin(angle) * distance + 'px'
            );

            document.body.appendChild(spark);

            setTimeout(() => spark.remove(), 1400);

        }

    });

}


// OPEN GIFT PAGE

function openGift() {

    $('birthdayPage').classList.add('hidden');

    $('giftPage').classList.remove('hidden');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    launchConfetti(100);

    launchPartyEmojis();

}


// BACK TO BIRTHDAY

function backToBirthday() {

    $('giftPage').classList.add('hidden');

    $('birthdayPage').classList.remove('hidden');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

}