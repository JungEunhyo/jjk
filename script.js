let feedCount = 0;
let foodLog = [];

const foods = document.querySelectorAll('.food');
const getoArea = document.getElementById('geto');
const feedCounter = document.getElementById('feed-count');
const resultBtn = document.getElementById('result-btn');

foods.forEach(food => {
  food.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData("text/plain", food.dataset.food);
  });
});

getoArea.addEventListener('dragover', (e) => {
  e.preventDefault();
});

getoArea.addEventListener('drop', (e) => {
  e.preventDefault();
  if (feedCount >= 5) return;

  const foodType = e.dataTransfer.getData("text/plain");
  handleFeed(foodType);
});

foods.forEach(food => {
  food.addEventListener('touchstart', (e) => {
    food.dataset.touching = 'true';
  });

  food.addEventListener('touchend', (e) => {
    if (food.dataset.touching !== 'true') return;

    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

    if (dropTarget && (dropTarget.id === 'geto' || dropTarget.closest('#geto'))) {
      if (feedCount >= 5) return;

      const foodType = food.dataset.food;
      handleFeed(foodType);
    }

    food.dataset.touching = 'false';
  });
});

function handleFeed(foodType) {
  foodLog.push(foodType);
  feedCount++;
  feedCounter.textContent = feedCount;

  if (feedCount === 5) {
    resultBtn.style.display = 'block';
  }
}

resultBtn.addEventListener('click', () => {
  const counts = { jureong: 0, soba: 0, parfait: 0 };
  foodLog.forEach(food => counts[food]++);
  const query = `jureong=${counts.jureong}&soba=${counts.soba}&parfait=${counts.parfait}`;
  window.location.href = `result.html?${query}`;
});
