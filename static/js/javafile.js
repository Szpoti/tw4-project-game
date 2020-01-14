let xCord = 50, yCord = 100;
let xPos = 0, yPos = 0;
let cards = {};
for (row = 0; row < 4; row++) {
    for (column = 0; column < 13; column++) {
        xPos += 69;
        xCord += 80;
        const card = `<div class="card" id="card-${row}-${column}" data-value="" style="
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
        alert(event.target.style.backgroundPosition);
        if (event.target.style.backgroundPosition === "0px 0px")
        {
            event.target.style.backgroundPosition = cards[event.target.id];
        } else {
            event.target.style.backgroundPosition = "0px 0px";
        }
    })
}
console.log(cards);


