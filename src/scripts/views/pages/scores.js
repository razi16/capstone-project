/* eslint-disable no-restricted-syntax */
const STORAGE_KEY = 'QUIZ_APPS';

const Scores = {
  async render() {
    return `
      <section id="score-container"></section>
    `;
  },

  async afterRender() {
    const scoreContainer = document.getElementById('score-container');
    scoreContainer.innerHTML = '<p>The last 5 scores will be displayed here</p>';
    const serializedData = localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(serializedData);

    if (data !== null) {
      for (const score of data) {
        const scoreElement = document.createElement('p');
        scoreElement.innerText = `${score.score} (${score.time})`;
        scoreContainer.append(scoreElement);
      }
    }
  },
};

export default Scores;
