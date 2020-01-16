let my_bet = 0;
let my_bank = 1000;
let status = null;
let xCord = 40, yCord = 100;
let xPos = 0, yPos = 0;
let cards = {};
let cardsId = [];
let deck = [];
let hand = []; let dealerHand = [];
let cnt = 1;
let rnd = 0;
let handCordX = 55;
let dealerCordX = 55;
let handZIndex = 100;
let handValue = 0; let dealerHandValue = 0 ;
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
    for (card of dealerHand) {
        cardsId.push(card);
    }
    dealerCordX = 55;
    dealerHandValue = 0;
    dealerHand = [];
    handCordX = 55;
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
    let xCord = 9.5, yCord = 32;
    let count = 52;
    for (id of cardsId) {
        rnd = Math.floor(Math.random() * cardsId.length);
        let card = document.getElementById(id);
        card.addEventListener('click', drawFromDeck);
        card.setAttribute('onclick',"this.classList.toggle('flipped')");
        card.style.top = `${yCord}vh`;
        card.style.left = `${xCord}vh`;
        card.style.zIndex = `${count}`;
        count -= 1;
        xCord += 0.01;
    }
}

async function dealStartingHand(){
    for (i=0;i <= 1;i++) {
        dealerDraw(i);
        await sleep(200);
        playerDraw();
        await sleep(200);
    }
}

function playerDraw() {
    let topCard = document.getElementById(`${cardsId[0]}`);
    hand.push(topCard.id);
    cardsId.splice(topCard.id, 1);
    topCard.classList.toggle('flipped');
    topCard.style.top = `55.5vh`;
    topCard.style.left = `${handCordX}vh`;
    topCard.style.zIndex = `${handZIndex}`;
    handZIndex += 1;
    handCordX += 13;
    handValue += Math.ceil(parseFloat(topCard.dataset.value));
    topCard.removeEventListener('click', drawFromDeck);
}

function dealerDraw(cnt) {
    let topCard = document.getElementById(`${cardsId[0]}`);
    dealerHand.push(topCard.id);
    cardsId.splice(topCard.id, 1);
    if (cnt === 1) {
        topCard.classList.toggle('flipped');
    }
    topCard.style.top = `13.5vh`;
    topCard.style.left = `${dealerCordX}vh`;
    topCard.style.zIndex = `${handZIndex}`;
    handZIndex += 1;
    dealerCordX += 13;
    dealerHandValue += Math.ceil(parseFloat(topCard.dataset.value));
    topCard.removeEventListener('click', drawFromDeck);
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
        parent.style.left = `${handCordX}vh`;
        parent.style.top = '55.5vh';
        parent.style.zIndex = `${handZIndex}`;
        handZIndex += 1;
        handCordX += 13;
        handValue += Math.ceil(parseFloat(parent.dataset.value));
        parent.removeEventListener('click',drawFromDeck);
        checkForLose(handValue);

    } else {
        event.target.classList.toggle('flipped');
    }
}

function flipDown(cards) {
    for (id of cards) {
        let card = document.getElementById(`${id}`);
        if (card.className !== 'card flipped') {
            card.classList.toggle('flipped')
        }
    }
}

function standButton() {
    checkForLose(handValue);
    if (handValue < 21) {
        alert("Your score is: " + handValue)
    }
}

async function checkForLose(handValue) {
    if (handValue > 21) {
        await sleep(500);
        alert('Sorry, you lost.\n Your hand\'s value is bigger than 21.');
        status = false;
        dealPrize();
        buttonReset();
    }
    else if (handValue === 21) {
        await sleep(500);
        alert('You WON!');
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function newGame() {

    if (my_bet > 0) {
        let tokens = document.querySelectorAll('.tokens');
        for (token of tokens){
            token.removeEventListener('click', tokenHandler)
        }
        await sleep(100);
        flipDown(hand);
        flipDown(dealerHand);
        await sleep(500);
        displayCards(cardsId);
        await sleep(500);
        stackShuffle(cardsId);
        await sleep(500);
        intoDeck(cardsId);
        await sleep(500);
        dealStartingHand();
    }
}

function tokenHandler(event) {
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
        }
}

function buttonReset() {
    let tokens = document.querySelectorAll('.tokens');
    for (token of tokens) {
        token.addEventListener('click', tokenHandler)
    }
}

function dealPrize(){
    if (status === false) {
        my_bank -= my_bet;
    } else if (status === true) {
        my_bank = my_bet*2;
    }
}

window.onload = function () {flipCards(cardsId); intoDeck(cardsId); buttonReset()};


