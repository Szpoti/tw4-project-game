let xCord = 40, yCord = 100;
let xPos = 0, yPos = 0;
let cards = {};
let cardsId = [];
let deck = [];
let hand = [];
let cnt = 1;
let rnd = 0;
let handCordX = 200;
let handZIndex = 100;
let handValue = 0;
for (row = 0; row < 4; row++) {
    for (column = 0; column < 13; column++) {
        xPos += 103.5;
        xCord += 110;


        let data_value = xPos / 103.5;

        if(data_value > 10)
        {data_value = 10;}

        if(data_value === 1)
        { data_value = 11;}

        const card = `<div onclick="this.classList.toggle('flipped')" data-value="${data_value}" class="card" id="card-${row}-${column}" style="
        border: black solid 0.1px;
        z-index: ${cnt};
        border-radius: 10px;
        cursor: pointer;
        top: ${yCord}px;
        left: ${xCord}px;
    ">
    <div class="side front" style="background-position: -${xPos}px ${yPos}px"></div>
    <div class="side back" style="background-position: 0px 0px;"></div>
</div>`;
        let key = `card-${row}-${column}`;
        cards[key] = `-${xPos}px ${yPos}px`;
        cardsId.push(key);
        deck.push(key);
        document.getElementById('card-table').insertAdjacentHTML('beforeend', card);
    }
    xPos = 0;
    yPos += 141;
    xCord = 40;
    yCord += 140;
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

function displayCards(cardsId) {
    for (card of hand) {
        cardsId.push(card);
    }
    handValue = 0;
    hand = [];
    xCord = 40; yCord = 100;
    let count = 0;
    for (id of cardsId) {
        let card = document.getElementById(`${id}`);
        card.removeEventListener('click',drawFromDeck);
        handZIndex = 100;
        handCordX = 200;
        xCord += 110;
        card.style.top = `${yCord}px`;
        card.style.left = `${xCord}px`;

        count += 1;
        if (count === 13) {
            xCord = 40;
            yCord += 140;
            count = 0;
        }
        }
    }

function intoDeck(cardsId) {
    handCordX = 100;
    console.log(cardsId);
    let xCord = 500, yCord = 250;
    let count = 52;
    for (id of cardsId) {
        rnd = Math.floor(Math.random() * cardsId.length);
        let card = document.getElementById(id);
        card.addEventListener('click', drawFromDeck);
        card.setAttribute('onclick',"this.classList.toggle('flipped')");
        card.style.top = `${yCord}px`;
        card.style.left = `${xCord}px`;
        card.style.zIndex = `${count}`;
        count -= 1;
        xCord += 0.1;
    }
}

function drawFromDeck(event) {
    // alert(event.target.parentNode.id);
    // alert(event.target.className);
    let parent = event.target.parentNode;
    if (parent.id !== 'card-table') {
        hand.push(parent.id);
        console.log(cardsId);
        cardsId.splice(parent.id, 1);
        console.log(cardsId);
        parent.style.left = `${handCordX}px`;
        parent.style.top = '400px';
        parent.style.zIndex = `${handZIndex}`;
        handZIndex += 1;
        handCordX += 40;
        handValue += parseInt(parent.dataset.value);
        parent.removeEventListener('click',drawFromDeck);

    } else {
        event.target.classList.toggle('flipped');
    }
    checkForWin(handValue);
}

async function checkForWin(handValue) {
    if (handValue > 21) {
        await sleep(500);
        alert('Sorry, you lost.\n Your hand\'s value is bigger than 21.')
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function startUpFunctions() {
    await sleep(500);
    flipCards(cardsId);
    await sleep(500);
    stackShuffle(cardsId);
    await sleep(500);
    intoDeck(cardsId);
}


window.onload = startUpFunctions();


