


  // Firebase SDKのインポート
import firebase from 'firebase/app';
import 'firebase/database';

// Firebaseの設定
const firebaseConfig = {
  // ここにFirebaseの設定情報を入力
};

// Firebaseの初期化
firebase.initializeApp(firebaseConfig);

// Realtime Databaseへの参照を作成
const database = firebase.database();

// メッセージ送信処理
function sendMessage(message) {
  const messagesRef = database.ref('messages');
  const newMessageRef = messagesRef.push();
  newMessageRef.set(message);
}

// メッセージ受信処理
function receiveMessage(callback) {
  const messagesRef = database.ref('messages');
  messagesRef.on('child_added', (snapshot) => {
    const message = snapshot.val();
    callback(message);
  });
}

// メッセージ削除処理
function deleteMessage(messageId) {
  const messageRef = database.ref(`messages/${messageId}`);
  messageRef.remove();
}

// HTML要素の取得
const messageForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const messageList = document.getElementById('chat-messages');

// メッセージ送信フォームの送信イベントリスナー
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  if (message !== '') {
    sendMessage({ text: message });
    messageInput.value = '';
  }
});

// メッセージ削除のクリックイベントリスナー
messageList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-button')) {
    const messageId = e.target.dataset.messageId;
    deleteMessage(messageId);
  }
});

// メッセージ受信時のコールバック関数
function handleNewMessage(message) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <span class="message-text">${message.text}</span>
    <button class="delete-button" data-message-id="${message.messageId}">削除</button>
  `;
  messageList.appendChild(listItem);
}

// メッセージ受信のリスナー登録
receiveMessage(handleNewMessage);


// メッセージ受信時のコールバック関数
function handleNewMessage(message) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <span class="message-text">${message.text}</span>
    <button class="delete-button" data-message-id="${message.messageId}">削除</button>
  `;
  messageList.appendChild(listItem);

  // メッセージ表示領域をスクロールする
  messageList.scrollTop = messageList.scrollHeight;
}
