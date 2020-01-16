let my_bet = 0;
let my_bank = 1000;
let status = null;
let xCord = 40, yCord = 100;
let xPos = 0, yPos = 0;
let cards = {};
let cardsId = [];
let deck = [];
let hand = []; let dealerHand = [];
let valuesInHand = [];
let cnt = 1;
let rnd = 0;
let handCordX = 55;
let dealerCordX = 55;
let handZIndex = 100;
let handValue = 0; let dealerHandValue = 0;
let bankDisplay = document.getElementById('bank');
let betDisplay = document.getElementById('display');
let aces = 0; let dealerAces = 0;
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
        document.getElementsByClassName('welcome')
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
    let value = Math.ceil(parseFloat(topCard.dataset.value));
    dealerHand.push(topCard.id);
    cardsId.splice(topCard.id, 1);
    if (cnt === 1) {
        topCard.classList.toggle('flipped');
    }
    topCard.style.top = `13.5vh`;
    topCard.style.left = `${dealerCordX}vh`;
    topCard.style.zIndex = `${handZIndex}`;
    if (value === 11){
            dealerAces += 1;
            if (dealerHandValue + value > 21){
                value -= 10;
                dealerAces -= 1;
            }
        }
        if (dealerHandValue + value > 21 && dealerAces > 0){
            dealerHandValue -= 10;
            dealerHandValue += value;
            dealerAces -= 1;
        } else {
            dealerHandValue += value;
        }
    handZIndex += 1;
    dealerCordX += 13;
    topCard.removeEventListener('click', drawFromDeck);
}

function drawFromDeck(event) {
    // alert(event.target.parentNode.id);
    // alert(event.target.className);
    let parent = event.target.parentNode;
    if (parent.id !== 'card-table') {
        let value = Math.ceil(parseFloat(parent.dataset.value));
        hand.push(parent.id);
        //console.log(cardsId);
        cardsId.splice(parent.id, 1);
        //console.log(cardsId);
        parent.style.left = `${handCordX}vh`;
        parent.style.top = '55.5vh';
        parent.style.zIndex = `${handZIndex}`;
        handZIndex += 1;
        handCordX += 13;
        if (value === 11){
            aces += 1;
            if (handValue + value > 21){
                value -= 10;
                aces -= 1;
            }
        }
        if (handValue + value > 21 && aces > 0){
            handValue -= 10;
            handValue += value;
            aces -= 1;
        } else {
            handValue += value;
        }
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

async function standButton() {
    document.getElementById(`${dealerHand[0]}`).classList.toggle('flipped');
    while (status === null) {
        await sleep(1000);
        if (dealerHandValue >= 17) {
            status = checkForWin();
        } else {
            dealerDraw(cnt = 1);
        }
    }
    dealPrize(status);
    buttonReset();
    betDisplay.textContent=`Place your bets.`;
    bankDisplay.textContent=`Bank: ${my_bank}$`;
}

async function newGame() {
    if (my_bet > 0) {
        status = null;
        aces = 0;
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
            my_bank += my_bet;
            my_bet = 0;
        }
        if (my_bet >= my_bank) { console.log('off') }
        else {
            if (event.target.id === 'btn10') {
                my_bank -= 10;
                my_bet += 10;
            }
            else if (event.target.id === 'btn20') {
                if (my_bet+20>my_bank){console.log('off')}
                else {
                    my_bank -= 20;
                    my_bet += 20;
                }
            }
            else if (event.target.id === 'btn50') {
                if (my_bet+50>my_bank){console.log('off')}
                else {
                    my_bank -= 50;
                    my_bet += 50;
                }
            }
            else if (event.target.id === 'btn100') {
                if (my_bet+100>my_bank){console.log('off')}
                else {
                    my_bank -= 100;
                    my_bet += 100;
                }
            }
            else if (event.target.id === 'all_in') {
                my_bet += my_bank;
                my_bank = 0;
                }
            display.textContent=`Your bet is ${my_bet}$`;
            bankDisplay.textContent=`Bank: ${my_bank}$`
        }
}

function buttonReset() {
    let tokens = document.querySelectorAll('.tokens');
    for (token of tokens) {
        token.addEventListener('click', tokenHandler)
    }
}

function dealPrize(status){
    if (status === false) {
        alert('Sorry, you lost!');
        my_bet = 0;
    } else if (status === true) {
        alert('You win!');
        my_bank += my_bet*2;
        my_bet = 0;
    } else {
        alert('Draw')
        my_bank += my_bet;
        my_bet = 0;
    }
    bankDisplay.textContent=`Bank: ${my_bank}$`;
    if (my_bank === 0) {alert ('Sorry, you are bankrupt...RIP')}
}

function checkForWin(){
    if (dealerHandValue > 21) {
        return true;
    }
    if (handValue > dealerHandValue){
        return true;
    } else if (handValue < dealerHandValue){
        return false;
    } else {
        if (hand.length < dealerHand.length){
            return true;
        } else if (hand.length > dealerHand.length){
            return false;
        } else {
            return 'draw';
        }
    }
}

async function checkForLose(handValue) {
    if (handValue > 21) {
        await sleep(500);
        alert('Your hand\'s value is bigger than 21.');
        dealPrize(status = false);
        buttonReset();
        status = null;
        display.textContent=`Place your bets.`;

    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

window.onload = function () {flipCards(cardsId); intoDeck(cardsId); buttonReset(); bankDisplay.textContent=`Bank: ${my_bank}$`};


