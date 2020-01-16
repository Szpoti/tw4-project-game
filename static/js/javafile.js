let my_bet = 0;
let my_bank = 1000;

let xCord = 40, yCord = 100;
let xPos = 0, yPos = 0;
let cards = {};
let cardsId = [];
let deck = [];
let hand = [];
let cnt = 1;
let rnd = 0;
let handCordX = 450;
let handZIndex = 100;
let handValue = 0;
for (row = 0; row < 4; row++) {
    for (column = 0; column < 13; column++) {
        xPos += 7.69;
        xCord += 110;


        let data_value = xPos / 7.69;

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
    <div class="side front" style="background-position: ${xPos}% ${yPos}%; background-size: 1400%"></div>
    <div class="side back" style="background-size: 1400%""></div>
</div>`;
        let key = `card-${row}-${column}`;
        cards[key] = `-${xPos}px ${yPos}px`;
        cardsId.push(key);
        deck.push(key);
        document.getElementById('card-table').insertAdjacentHTML('beforeend', card);
    }
    xPos = 0;
    yPos += 33.3;
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
    handCordX = 450;
    handValue = 0;
    hand = [];
    xCord = 40; yCord = 100;
    let count = 0;
    for (id of cardsId) {
        let card = document.getElementById(`${id}`);
        card.removeEventListener('click',drawFromDeck);
        handZIndex = 100;
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
    console.log(cardsId);
    let xCord = 40, yCord = 390;
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
        //console.log(cardsId);
        cardsId.splice(parent.id, 1);
        //console.log(cardsId);
        parent.style.left = `${handCordX}px`;
        parent.style.top = '645px';
        parent.style.zIndex = `${handZIndex}`;
        handZIndex += 1;
        handCordX += 120;
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

let tokens = document.querySelectorAll('.tokens');

for (token of tokens) {
    token.addEventListener('click', function (event) {
        if (event.target.id === 'reset') {
            my_bet = 0;
        }
        if (my_bet >= my_bank) { console.log('off') }
        else {
            if (event.target.id === 'btn10') {
                my_bet += 10;
            }
            else if (event.target.id === 'btn20') {
                if (my_bet+20>my_bank){console.log('off')}
                else {
                    my_bet += 20;
                }
            }
            else if (event.target.id === 'btn50') {
                if (my_bet+50>my_bank){console.log('off')}
                else {
                    my_bet += 50;
                }
            }
            else if (event.target.id === 'btn100') {
                if (my_bet+100>my_bank){console.log('off')}
                else {
                    my_bet += 100;
                }
            }
            else if (event.target.id === 'all_in') {
                my_bet = my_bank;
                }
            display.textContent=`Your bet is ${my_bet}$`;
        }})}


window.onload = startUpFunctions();


