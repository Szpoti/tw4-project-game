let my_bet = 0;
let my_bank = 1000;
console.log(my_bet);
console.log(my_bank);
let bet10 = document.getElementById('btn10');
let bet20 = document.getElementById('btn20');
let bet50 = document.getElementById('btn50');
let bet100 = document.getElementById('btn100');

function myBets(betName, betAmount) {
    betName.addEventListener('click', function () {
        if (my_bet >= my_bank) {
        document.getElementsByClassName('tokens').disabled = true}
        else if (my_bet + betAmount > my_bank){
            document.getElementsByClassName('tokens').disabled = true}
        else{
            my_bet += betAmount;
            display.textContent = my_bet}
    });
}

myBets(bet10, 10);
myBets(bet20, 20);
myBets(bet50, 50);
myBets(bet100, 100);