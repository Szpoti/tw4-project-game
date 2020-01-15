let xCord = 50, yCord = 100;
let xPos = 0, yPos = 0;
let cards = {};
let cardsId = [];
let cnt = 1;
let rnd = 0;
for (row = 0; row < 4; row++) {
    for (column = 0; column < 13; column++) {
        xPos += 69;
        xCord += 50;


        let data_value = xPos / 69;

        if(data_value > 10)
        {data_value = 10;}

        if(data_value === 1)
        { data_value = 11;}

        const card = `<div onclick="this.classList.toggle('flipped')" class="card" id="card-${row}-${column}" style="
        border: black solid 2px;
        z-index: ${cnt};
        border-radius: 10px;
        position: absolute;
        cursor: pointer;
        top: ${yCord}px;
        left: ${xCord}px;
    ">
    <div class="side front" data-value="${data_value}" style="background-position: -${xPos}px ${yPos}px"></div>
    <div class="side back"  data-value="${data_value}" style="background-position: 0px 0px;"></div>
</div>`;
        let key = `card-${row}-${column}`;
        cards[key] = `-${xPos}px ${yPos}px`;
        cardsId.push(key);
        document.getElementById('card-table').insertAdjacentHTML('beforeend', card);
    }
    xPos = 0;
    yPos += 94;
    xCord = 50;
    yCord += 100;
}

function stackShuffle(cardsId) {
    let count = cardsId.length;
    while (count) {
        cardsId.push(cardsId.splice(Math.floor(Math.random() * count), 1)[0]);
        count -= 1;

    }
    console.log(cardsId);
    displayCards(cardsId);
}

function flipCards(cardsId) {
    console.log(cardsId);
    for (card of cardsId) {
        document.getElementById(card).classList.toggle('flipped')
    }
}

function intoDeck(cardsId) {
        console.log(cardsId);
        let xCord = 500, yCord = 250;
        let count = 52;
        for (id of cardsId) {
            rnd = Math.floor(Math.random() * cardsId.length);
            let card = document.getElementById(id);
            card.style.top = `${yCord}px`;
            card.style.left = `${xCord}px`;
            card.style.zIndex = `${count}`;
            count -= 1;
        }
    }

function displayCards(cardsId) {
    let xCord = 130, yCord = 100;
    let count = 0;
    for (id of cardsId) {
        let card = document.getElementById(`${id}`);
        card.style.top = `${yCord}px`;
        card.style.left = `${xCord}px`;
        xCord += 50;
        count += 1;
        if (count === 13) {
            xCord = 130;
            yCord += 100;
            count = 0;
        }
        }
    }

allCards = document.querySelectorAll('.card');
for (card of allCards) {
    card.addEventListener('click', alertValue);
}

function alertValue(event) {
    let value = event.target.dataset.value;
    alert(`${value}`);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function delayFunctions() {
    await sleep(500);
    flipCards(cardsId);
    await sleep(500);
    stackShuffle(cardsId);
    await sleep(500);
    intoDeck(cardsId);
}

delayFunctions();


