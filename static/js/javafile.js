
let xCord = 50, yCord = 100;
let xPos = 0, yPos = 0;
let cards = {};
let cardsId = [];

for (row = 0; row < 4; row++) {
    for (column = 0; column < 13; column++) {
        xPos += 69;
        xCord += 80;

        let data_value = xPos / 69;

        if(data_value > 10)
        {data_value = 10;}

        if(data_value === 1)
        { data_value = 11;}

        const card = `<div class="card" id="card-${row}-${column}" data-value="${data_value}" style="
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

        let key = `card-${row}-${column}`;
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
            $("#card").flip();
            event.target.style.backgroundPosition = cards[event.target.id];
        } else {
            event.target.style.backgroundPosition = "0px 0px";
        }
    })
}


function stackShuffle(cardsId) {
    let count = cardsId.length;
    while (count) {
        cardsId.push(cardsId.splice(Math.floor(Math.random() * count), 1)[0]);
        count -= 1;
    }

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