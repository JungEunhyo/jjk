function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    jureong: parseInt(params.get('jureong') || '0'),
    soba: parseInt(params.get('soba') || '0'),
    parfait: parseInt(params.get('parfait') || '0'),
  };
}

function getResult({ jureong, soba, parfait }) {
  if (jureong === 5) {
    return {
      img: 'geto_bad.png',
      text: '그는 교주가 되었습니다.',
    };
  } else if (soba === 5) {
    return {
      img: 'geto_teacher.png',
      text: '그는 주술고전의 선생님이 되었습니다. 해피엔딩!',
    };
  } else if (parfait === 5) {
    return {
      img: 'gojo.png',
      text: '축하합니다. 고죠 사토루로 진화했습니다!',
    };
  } else if (jureong === 4) {
    return {
      img: 'geto4.png',
      text: '이런, 정병구루가 되어버렸습니다. 빨리 정신과로!!!',
    };
  } else if (jureong === 3) {
    return {
      img: 'geto3.png',
      text: '어라, 토우지와 싸우다 죽어버렸습니다. 안돼~~',
    };
  } else if (jureong === 2) {
    return {
      img: 'geto2.png',
      text: '그는 주술사를 때려치고 하라혼을 결성했습니다!',
    };
  } else if (jureong === 1) {
    return {
      img: 'geto1.png',
      text: '그는 룩업이 되었습니다. 대체 왜?!',
    };
  } else {
    return {
      img: 'geto0.png',
      text: `그는 영원히 청춘 속에서 살아간다.`,
    };
  }
}

const counts = getQueryParams();
const result = getResult(counts);

document.getElementById('result-image').src = result.img;
document.getElementById('result-text').textContent = result.text;

document.getElementById('share-btn').addEventListener('click', () => {
  const shareUrl = window.location.href;
  navigator.clipboard.writeText(shareUrl).then(() => {
    alert("결과 링크가 복사되었습니다! 붙여넣기해 공유하세요.");
  });
});
