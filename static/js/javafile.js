let xCord = 50, yCord = 100;
let xPos = 0, yPos = 0;
let cards = {};
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
const cardElementHTML = createCard(
    'Card title',
    'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    'https://cdn-images-1.medium.com/max/653/1*wMZnVAEei1xbY1v6sAbYxQ.png');

