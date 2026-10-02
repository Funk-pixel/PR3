// ============================================
// ОБ'ЄКТ №1 - PIKACHU
// ============================================

const pikachu = {

    name: 'Pikachu',

    hp: {
        current: 100,
        total: 100
    },

    elHP:
        document.getElementById(
            'health-character'
        ),

    elProgressbar:
        document.getElementById(
            'progressbar-character'
        ),

    elPokemon:
        document.querySelector(
            '.pokemon.character'
        )
};


// ============================================
// ОБ'ЄКТ №2 - CHARMANDER
// ============================================

const charmander = {

    name: 'Charmander',

    hp: {
        current: 100,
        total: 100
    },

    elHP:
        document.getElementById(
            'health-enemy'
        ),

    elProgressbar:
        document.getElementById(
            'progressbar-enemy'
        ),

    elPokemon:
        document.querySelector(
            '.pokemon.enemy'
        )
};


// ============================================
// ОТРИМУЄМО ЕЛЕМЕНТИ HTML
// ============================================

const btnThunder =
    document.getElementById(
        'btn-kick'
    );


const btnElectro =
    document.getElementById(
        'btn-kick-strong'
    );


const battleInfo =
    document.getElementById(
        'battle-info'
    );


const logo =
    document.getElementById(
        'logo'
    );


// ============================================
// ФУНКЦІЯ ВИПАДКОВОГО ЧИСЛА
// ============================================

function random(max) {

    return Math.ceil(
        Math.random() * max
    );
}


// ============================================
// ВІДОБРАЖЕННЯ HP
// ============================================

function renderHP(pokemon) {

    // Змінюємо текст HP

    pokemon.elHP.innerText =
        pokemon.hp.current +
        ' / ' +
        pokemon.hp.total;


    // Вираховуємо HP у відсотках

    const percent =
        (
            pokemon.hp.current /
            pokemon.hp.total
        ) * 100;


    // Змінюємо ширину progressbar

    pokemon.elProgressbar.style.width =
        percent + '%';


    // Видаляємо старі класи кольору

    pokemon.elProgressbar
        .classList
        .remove(
            'low',
            'critical'
        );


    // Якщо HP 30% або менше

    if (percent <= 30) {

        pokemon.elProgressbar
            .classList
            .add(
                'critical'
            );
    }


    // Якщо HP від 31% до 60%

    else if (percent <= 60) {

        pokemon.elProgressbar
            .classList
            .add(
                'low'
            );
    }
}


// ============================================
// АНІМАЦІЯ УДАРУ
// ============================================

function hitAnimation(pokemon) {

    pokemon.elPokemon
        .classList
        .add('hit');


    setTimeout(
        function () {

            pokemon.elPokemon
                .classList
                .remove('hit');

        },
        300
    );
}


// ============================================
// ФУНКЦІЯ ЗМІНИ HP
// ============================================

function changeHP(
    pokemon,
    damage
) {

    pokemon.hp.current =
        pokemon.hp.current -
        damage;


    // HP не може бути менше нуля

    if (
        pokemon.hp.current < 0
    ) {

        pokemon.hp.current = 0;
    }


    // Перемальовуємо HP

    renderHP(pokemon);


    // Анімація

    hitAnimation(pokemon);
}


// ============================================
// ВИМКНЕННЯ КНОПОК
// ============================================

function disableButtons() {

    btnThunder.disabled = true;

    btnElectro.disabled = true;
}


// ============================================
// ПЕРЕВІРКА ПЕРЕМОЖЦЯ
// ============================================

function checkWinner() {

    // Charmander програв

    if (
        charmander.hp.current <= 0
    ) {

        battleInfo.innerText =
            'Pikachu переміг!';

        disableButtons();

        return true;
    }


    // Pikachu програв

    if (
        pikachu.hp.current <= 0
    ) {

        battleInfo.innerText =
            'Charmander переміг!';

        disableButtons();

        return true;
    }


    return false;
}


// ============================================
// ГОЛОВНА ФУНКЦІЯ БОЮ
// ============================================
//
// Ця функція використовується для обох атак.
// Завдяки цьому ми не повторюємо однаковий код.
//
// attackName - назва атаки
// maxDamage - максимальна шкода
//
// ============================================

function fight(
    attackName,
    maxDamage
) {

    // ----------------------------------------
    // PIKACHU АТАКУЄ CHARMANDER
    // ----------------------------------------

    const pikachuDamage =
        random(maxDamage);


    changeHP(
        charmander,
        pikachuDamage
    );


    battleInfo.innerText =
        'Pikachu використав ' +
        attackName +
        ' та завдав ' +
        pikachuDamage +
        ' шкоди';


    // Перевіряємо перемогу

    if (
        checkWinner()
    ) {

        return;
    }


    // ----------------------------------------
    // CHARMANDER АТАКУЄ PIKACHU
    // ----------------------------------------

    const charmanderDamage =
        random(15);


    changeHP(
        pikachu,
        charmanderDamage
    );


    battleInfo.innerText =
        'Pikachu: -' +
        charmanderDamage +
        ' HP | ' +
        'Charmander: -' +
        pikachuDamage +
        ' HP';


    // Ще раз перевіряємо переможця

    checkWinner();
}


// ============================================
// КНОПКА №1
// THUNDER JOLT
//
// Випадкова шкода від 1 до 20
// ============================================

btnThunder.addEventListener(
    'click',

    function () {

        fight(
            'Thunder Jolt',
            20
        );
    }
);


// ============================================
// КНОПКА №2
// ELECTRO BALL
//
// Випадкова шкода від 1 до 35
// ============================================

btnElectro.addEventListener(
    'click',

    function () {

        fight(
            'Electro Ball',
            35
        );
    }
);


// ============================================
// СКИДАННЯ ГРИ
// ============================================

function resetGame() {

    // Повертаємо HP Pikachu

    pikachu.hp.current = 100;


    // Повертаємо HP Charmander

    charmander.hp.current = 100;


    // Перемальовуємо HP

    renderHP(pikachu);

    renderHP(charmander);


    // Вмикаємо кнопки

    btnThunder.disabled = false;

    btnElectro.disabled = false;


    // Початковий напис

    battleInfo.innerText =
        'Оберіть атаку';
}


// ============================================
// НАТИСКАННЯ НА ЛОГОТИП
// ПЕРЕЗАПУСКАЄ ГРУ
// ============================================

logo.addEventListener(
    'click',
    resetGame
);


// ============================================
// ПЕРШЕ ВІДОБРАЖЕННЯ
// ============================================

renderHP(pikachu);

renderHP(charmander);