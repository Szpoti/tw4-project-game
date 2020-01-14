let xCord = 50, yCord = 100;
let xPos = 0, yPos = 0;
let cards = {};
let cardsId = [];
for (j = 0; j < 4; j++) {
    for (i = 0; i < 13; i++) {
        xPos += 69;
        xCord += 80;
        const card = `<div class="card" id="card-${j}-${i}" data-value="" style="
        width: 69px;
        border: black solid 2px;
        border-radius: 10px;
        height: 94px;
        background-image: url('/static/imgs/cards.png');
        position: absolute;
        cursor: pointer;
        transform: rotate(0deg);
        background-position: -${xPos}px ${yPos}px;
        z-index: 1138;
        top: ${yCord}px;
        left: ${xCord}px;
    "></div>`;
        let key = `card-${j}-${i}`;
        cards[key] = `-${xPos}px ${yPos}px`;
        cardsId.push(key);
        document.getElementById('cards').insertAdjacentHTML('beforeend', card);
    }
    xPos = 0;
    yPos += 94;
    xCord = 50;
    yCord += 100;
}
let allCards = document.querySelectorAll(".card");
for (card of allCards) {
    card.addEventListener('click',function (event) {
        if (event.target.style.backgroundPosition === "0px 0px")
        {
            event.target.style.backgroundPosition = cards[event.target.id];
        } else {
            event.target.style.backgroundPosition = "0px 0px";
        }
    })
}
console.log(cardsId);

function stackShuffle(cardsId) {
    let count = cardsId.length;
    while (count) {
        cardsId.push(cardsId.splice(Math.floor(Math.random() * count), 1)[0]);
        count -= 1;
    }
    console.log(cardsId);
    displayCards(cardsId);
}

function displayCards(cardsId) {
    let xCord = 130, yCord = 100;
    let count = 0;
    for (id of cardsId) {
        let card = document.getElementById(`${id}`);
        card.style.top = `${yCord}px`;
        card.style.left = `${xCord}px`;
        xCord += 80;
        count += 1;
        if (count === 13) {
            xCord = 130;
            yCord += 100;
            count = 0;
        }
        }
    }