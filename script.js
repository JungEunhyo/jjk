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

  food.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    food.dataset.touching = 'true';
    food.dataset.startX = touch.clientX;
    food.dataset.startY = touch.clientY;
  });

  food.addEventListener('touchend', (e) => {
    if (food.dataset.touching !== 'true') return;

    const dropTarget = document.elementFromPoint(
      food.dataset.startX,
      food.dataset.startY
    );

    if (dropTarget && dropTarget.id === 'geto') {
      if (feedCount >= 5) return;

      const foodType = food.dataset.food;
      foodLog.push(foodType);
      feedCount++;
      feedCounter.textContent = feedCount;

      if (feedCount === 5) {
        resultBtn.style.display = 'block';
      }
    }

    food.dataset.touching = 'false';
  });
});


getoArea.addEventListener('dragover', (e) => {
  e.preventDefault();
});

getoArea.addEventListener('drop', (e) => {
  e.preventDefault();
  if (feedCount >= 5) return;

  const foodType = e.dataTransfer.getData("text/plain");
  foodLog.push(foodType);
  feedCount++;
  feedCounter.textContent = feedCount;

  if (feedCount === 5) {
    resultBtn.style.display = 'block';
  }
});

resultBtn.addEventListener('click', () => {
  const counts = { jureong: 0, soba: 0, parfait: 0 };
  foodLog.forEach(food => counts[food]++);

  const query = `jureong=${counts.jureong}&soba=${counts.soba}&parfait=${counts.parfait}`;
  window.location.href = `result.html?${query}`;
});
