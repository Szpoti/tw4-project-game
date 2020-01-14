let xCord = 50, yCord = 100;
let xPos = 0, yPos = 0;
let cards = {};
let cardsId = [];
for (row = 0; row < 4; row++) {
    for (column = 0; column < 13; column++) {
        xPos += 69;
        xCord += 80;
        const card = `<div onclick="this.classList.toggle('flipped')" class="card" id="card-${j}-${i}" data-value="" style="
        border: black solid 2px;
        border-radius: 10px;
        position: absolute;
        cursor: pointer;
        top: ${yCord}px;
        left: ${xCord}px;
    ">
    <div class="side front" style="background-position: -${xPos}px ${yPos}px"></div>
    <div class="side back" style="background-position: 0px 0px;"></div>
</div>`;
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