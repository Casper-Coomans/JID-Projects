//generate a deck of 52 cards
const generateDeck = () =>{

let hearts = ["Hearts", [2,3,4,5,6,7,8,9,10, "Jack", "Queen", "King", "Ace"]];
let clubs = ["Clubs", [2,3,4,5,6,7,8,9,10, "Jack", "Queen", "King", "Ace"]];
let diamonds = ["Diamonds", [2,3,4,5,6,7,8,9,10, "Jack", "Queen", "King", "Ace"]];
let spades = ["Spades", [2,3,4,5,6,7,8,9,10, "Jack", "Queen", "King", "Ace"]];

let suits = [hearts, clubs, diamonds, spades];

return suits;
};

//deal a card out
const dealCard = (deck) =>{
    
const givenCard = {
    suit: "unknown",
    card: "unknown"
}
//to grab a random element from an array -> Math.floor(Math.random()* arr.lenght)
//we grab one of the 4 random arrays *suits*
const randomSuitId = Math.floor(Math.random()* deck.length);
const suit = deck[randomSuitId][0];
//using that suit id we dive into the subarray with all the card numbers and pick a random card
const randomCardId = Math.floor(Math.random()* deck[randomSuitId][1].length);
const card = deck[randomSuitId][1][randomCardId]
//delete the given card BUT NOT THE SUIT OBVIOUSLY
deck[randomSuitId][1].splice(randomCardId, 1);

if(deck[randomSuitId][1].length == 0){
    deck.splice(randomSuitId,1);
}


givenCard.suit = suit;
givenCard.card = card;

return givenCard;
};

//score tellen van de gegeven hand
const scoreCheck = (hand) =>{
    let score = 0;
    for(const card of hand){
        if(card.card == "Jack" || card.card == "Queen" || card.card == "King"){
            score += 10;
        }
        else if(card.card == "Ace"){
            score += 1;
        }
        else{
            score += card.card
        }
    }
    return score;

};

//we maken een deck en maken 2 legen speelhanden
const deck = generateDeck();
const playerHand = [];
const dealerHand = [];

playerHand.push(dealCard(deck));
playerHand.push(dealCard(deck));
dealerHand.push(dealCard(deck));
dealerHand.push(dealCard(deck));

console.log(playerHand);
console.log(dealerHand);
scoreCheck(playerHand);
scoreCheck(dealerHand);

while(true){
    playerHand.push(dealCard(deck));
    if(scoreCheck(playerHand) < 21){
        dealerHand.push(dealCard(deck));
        if(scoreCheck(dealerHand) > 21){
            console.log("de dealer heeft gewonnen");
            break;
        }
        else if(scoreCheck(dealerHand) == 21){
            console.log("de speler heeft gewonnen");
            break;        
        }
    }
    else if(scoreCheck(playerHand) == 21){
        console.log("de speler heeft gewonnen");
        break;        
    }
    else{
        console.log("de dealer heeft gewonnen");
        break;
    };
}

console.log(playerHand);
console.log(dealerHand);
scoreCheck(playerHand);
scoreCheck(dealerHand);