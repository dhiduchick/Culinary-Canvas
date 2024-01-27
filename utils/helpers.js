//Exporting an object with a method to generate random emoji
module.exports = {
  //Function to get a random emoji
    get_emoji: () => {
        const randomNum = Math.random();
//Check the range of the random number to determine the emoji
        if(randomNum > 0.7) {
          //Return a woman cooking eomji if the randomNum is greater than 0.7
            return '`<span for="img" aria-label="womanCook">👩🏻‍🍳</span>`;'
        } else if (randomNum > 0.4) {
          //Return a bacon eomji if the randomNum is between 0.4 and 0.7
            return `<span for="img" aria-label="bacon">🥓</span>`;
          } else {
            //Return an egg emoji if randomNum is less than or equal to 0.4
            return `<span for="img" aria-label="egg">🥚</span>`;
          }
    }
}