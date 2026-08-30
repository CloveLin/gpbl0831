const 註冊視窗 = document.querySelector('#註冊視窗');
const 提示 = document.querySelector('.提示');
let 剩餘喜歡次數 = 5;
const 剩餘額度 = document.querySelector('#剩餘額度');
const 左側地區選擇 = document.querySelector('#左側地區選擇');
const 尋找地區 = document.querySelector('#尋找地區');

左側地區選擇.addEventListener('change', () => {
  尋找地區.value = 左側地區選擇.value;
  顯示提示(`已設定希望地區：${左側地區選擇.value === '不限' ? '不限地區' : 左側地區選擇.value}`);
});

尋找地區.addEventListener('change', () => {
  左側地區選擇.value = 尋找地區.value;
});

document.querySelectorAll('[data-註冊]').forEach((按鈕) => {
  按鈕.addEventListener('click', () => 註冊視窗.showModal());
});

document.querySelector('.關閉').addEventListener('click', () => 註冊視窗.close());

document.querySelectorAll('[data-訊息]').forEach((按鈕) => {
  按鈕.addEventListener('click', () => 顯示提示(按鈕.dataset.訊息));
});

document.querySelectorAll('.愛心').forEach((按鈕) => {
  按鈕.addEventListener('click', () => {
    if (!按鈕.classList.contains('已喜歡') && 剩餘喜歡次數 === 0) {
      顯示提示('今日 5 次免費按讚已用完，明天再回來看看吧！');
      return;
    }
    按鈕.classList.toggle('已喜歡');
    按鈕.textContent = 按鈕.classList.contains('已喜歡') ? '♥' : '♡';
    剩餘喜歡次數 += 按鈕.classList.contains('已喜歡') ? -1 : 1;
    剩餘額度.textContent = `今天還有 ${剩餘喜歡次數} 次`;
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

const 問題們 = [...document.querySelectorAll('.問題')];
const 配對結果 = document.querySelector('.配對結果');
const 選擇結果 = [];
const 推薦資料 = {
  '吃一頓好料': ['諸祥', '你們都相信，美食是最自然的破冰方式。'],
  '一起動一動': ['汶軒', '你們都喜歡在流汗與笑聲中拉近距離。'],
  '散步聊聊天': ['煒家', '你們都享受輕鬆散步，慢慢分享生活。'],
};

問題們.forEach((問題, 索引) => {
  問題.querySelectorAll('[data-選擇]').forEach((按鈕) => {
    按鈕.addEventListener('click', () => {
      選擇結果[索引] = 按鈕.dataset.選擇;
      問題.querySelectorAll('[data-選擇]').forEach((項目) => 項目.classList.remove('已選'));
      按鈕.classList.add('已選');
      window.setTimeout(() => 顯示下一題(索引), 280);
    });
  });
});

function 顯示下一題(索引) {
  問題們[索引].hidden = true;
  if (問題們[索引 + 1]) {
    問題們[索引 + 1].hidden = false;
    document.querySelectorAll('.配對步驟 span')[索引 + 1].classList.add('目前');
  } else {
    const 推薦 = 推薦資料[選擇結果[1]] || ['峻辰', '你們的個性與相處節奏很有默契。'];
    document.querySelector('#推薦名字').textContent = 推薦[0];
    document.querySelector('#推薦說明').textContent = 推薦[1];
    const 地區 = document.querySelector('#尋找地區').value;
    const 距離 = document.querySelector('#希望距離').value;
    const 地區文字 = 地區 === '不限' ? '不限地區' : 地區;
    document.querySelector('#距離說明').textContent = `篩選條件：${地區文字}・${距離}`;
    配對結果.hidden = false;
  }
}

document.querySelector('#重新配對').addEventListener('click', () => {
  選擇結果.length = 0;
  配對結果.hidden = true;
  問題們.forEach((問題, 索引) => {
    問題.hidden = 索引 !== 0;
    問題.querySelectorAll('[data-選擇]').forEach((按鈕) => 按鈕.classList.remove('已選'));
  });
  document.querySelectorAll('.配對步驟 span').forEach((步驟, 索引) => 步驟.classList.toggle('目前', 索引 === 0));
});

document.querySelector('#查看推薦').addEventListener('click', () => {
  document.querySelector('#探索').scrollIntoView({ behavior: 'smooth' });
  顯示提示('已帶你前往探索區，看看更多關於他的介紹！');
});
