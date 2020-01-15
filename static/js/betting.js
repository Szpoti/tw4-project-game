let my_bet=0;
let my_bank=1000;
console.log(my_bet);
console.log(my_bank);
let bet10 = document.getElementById('btn10');
let bet20 = document.getElementById('btn20');
let bet50 = document.getElementById('btn50');
let bet100 = document.getElementById('btn100');
let all_in = document.getElementById('all_in');
let reset = document.getElementById('reset');
bet10.addEventListener('click', function () {
   if (my_bet >= my_bank) {
    document.getElementsByClassName('tokens').disabled = true}
    else{
        my_bet+=10;
        display.textContent=my_bet}
});
bet20.addEventListener('click', function () {
    if (my_bet >= my_bank) {
    document.getElementsByClassName('tokens').disabled = true}
    else if (my_bet+20>my_bank){
            document.getElementsByClassName('tokens').disabled = true}
    else{
        my_bet+=20;
        display.textContent=my_bet}
});
bet50.addEventListener('click', function () {
    if (my_bet >= my_bank) {
    document.getElementsByClassName('tokens').disabled = true}
    else if (my_bet+50>my_bank){
            document.getElementsByClassName('tokens').disabled = true}
    else{
        my_bet+=50;
        display.textContent=my_bet}
});
bet100.addEventListener('click', function () {
    if (my_bet >= my_bank) {
    document.getElementsByClassName('tokens').disabled = true}
    else if (my_bet+100>my_bank){
            document.getElementsByClassName('tokens').disabled = true}
    else{
        my_bet+=100;
        display.textContent=my_bet}

});
all_in.addEventListener('click',function () {
    my_bet=my_bank;
    display.textContent=my_bet
});
reset.addEventListener('click',function () {
    my_bet=0;
    display.textContent=my_bet
});

