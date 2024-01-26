module.exports = {
    get_emoji: () => {
        const randomNum = Math.random();

        if(randomNum > 0.7) {
            return '`<span for="img" aria-label="womanCook">👩🏻‍🍳</span>`;'
        } else if (randomNum > 0.4) {
            return `<span for="img" aria-label="bacon">🥓</span>`;
          } else {
            return `<span for="img" aria-label="egg">🥚</span>`;
          }
    }
}