const 註冊視窗 = document.querySelector('#註冊視窗');
const 提示 = document.querySelector('.提示');

document.querySelectorAll('[data-註冊]').forEach((按鈕) => {
  按鈕.addEventListener('click', () => 註冊視窗.showModal());
});

document.querySelector('.關閉').addEventListener('click', () => 註冊視窗.close());

document.querySelectorAll('[data-訊息]').forEach((按鈕) => {
  按鈕.addEventListener('click', () => 顯示提示(按鈕.dataset.訊息));
});

document.querySelectorAll('.愛心').forEach((按鈕) => {
  按鈕.addEventListener('click', () => {
    按鈕.classList.toggle('已喜歡');
    按鈕.textContent = 按鈕.classList.contains('已喜歡') ? '♥' : '♡';
    顯示提示(按鈕.classList.contains('已喜歡') ? '已加入你的喜歡清單！' : '已從喜歡清單移除。');
  });
});

document.querySelector('#註冊表單').addEventListener('submit', (事件) => {
  事件.preventDefault();
  註冊視窗.close();
  顯示提示('歡迎加入！你的個人頁面已準備完成。');
});

function 顯示提示(文字) {
  提示.textContent = 文字;
  提示.classList.add('顯示');
  window.clearTimeout(window.提示計時器);
  window.提示計時器 = window.setTimeout(() => 提示.classList.remove('顯示'), 2600);
}
