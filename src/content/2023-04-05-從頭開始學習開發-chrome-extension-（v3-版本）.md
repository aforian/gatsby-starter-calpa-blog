---
slug: 2023-04-05-learn-chrome-extension
title: 從頭開始學習開發 Chrome extension （v3 版本）
date: 2023-04-05T13:56:07.595Z
description: Chrome extension 經歷過 v1, v2 後，來到了 v3，雖然曾小量接觸 v2 的版本，但 Google
  對大版號的更新一向不手軟，既然如此我就從頭來開始學習開發一個 v3 的。
publish: true
tags:
  - JavaScript
  - 前端開發
  - ChromeExtension
headerImage: static/assets/learn-chrome-extensions_00.png
templateKey: blog-post
---
Chrome extension 經歷過 v1, v2 後，來到了 v3，雖然曾小量接觸 v2 的版本，但 Google 對大版號的更新一向不手軟，既然如此我就從頭來開始學習開發一個 v3 的。

## 使用的技術

要開發 Chrome extension，只要你是個前端工程師，一定不會陌生，要使用的基本技術與網頁開發完全相同，就是 HTML、CSS、JavaScript。而且比一般的網頁更好處理，因為必定是使用 Chromium 的瀏覽器來使用（例如：Edge），所以幾乎可以用上最新規範的 ECMA 語法（例如 `<scirpt/>` 標籤的 `type="module"` 屬性），而不用擔心瀏覽器相容性的問題。

## 基本架構

整個 Chrome extension 有許多不同的部分組成，各司其職，以下介紹比較重要的部分。

### 1. manifest.json

整個 Chrome extension 核心的配置檔案，放置擴充功能的重要資訊，諸如：

* 擴充功能名稱 `name`
* 權限 `permissions`
* 圖示 `icons`
* **background**
* **content script**
* **action**

`manifest.json` 必須放在 extension 根目錄

### 2. background

可以說是擴充功能的本體，可以使用絕大部分 Chrome API，使用 Service Worker 註冊，通常會透過 Chrome API 可以監聽使用者對 Chrome 操作事件。

### 3. content script

在擴充功能中唯一能與網頁內容進行互動的部分，也就是可以對 DOM 進行操作；但相對只能取用極少部分的 Chrome API ，例如 `i18n`、`storage`、`runtime.sendMessage` ，且無法取用 window 上的方法。

### 4. action

在 Chrome 工具列中點選擴充功能圖示時，可選擇觸發的行為，除了直接執行某項功能，也可以使用 popup 可以自訂 UI ，提供擴充功能與使用者互動，並且可使用大部分 Chrome API。

### 5. Chrome API

擴充功能與一般網頁最大的差異就是可以使用 Chrome 提供 APIs，可以存取或操作 Chrome 頁籤、書籤、歷史記錄等行為。

比如前面提到的 background、content script、popup action 各個部分，在運行時會在不同的 thread ，它們溝通的方式，就是使用 `chrome.runtime.sendMessage` 與 `chrome.runtime.onMessage` 。

大概知道各個元件的分工後，那就事不宜遲，讓我們直接進行實作環節（畢竟每個老闆都說要做中學）！Go！

## 試做一個 PR review message 產生器

### 零、提起需求

由於我司在 Pull Request 需要兩個 aprove 作為 merge 的條件，所以有一個在 Slack 請別人看 PR 的訊息流程，通常會大致描述 PR 的目前，以及附上 Jira 卡和 PR 的連結：

![](assets/learn-chrome-extensions_01.png)

但複製 PR 連結和卡片連結的步驟太麻煩了，於是打算建立一個 Chrome extension 來實現這件事。大致的需求和部件如下：

1. 提供模板編輯的介面，且可以使用 `{PR_LINK}` 與 `{JIRA_CARD}` 做關鍵字替換連結內容

   * `{JIRA_CARD}`：會替換為 Jira 卡號和連結
   * `{PR_LINK}` ：會替換為 PR 字元並帶有 PR 的連結

   ```jsx
   大家好，請幫我的 review PR，謝謝！
   {JIRA_CARD} | {PR_LINK}
   ```
2. 在 PR 頁面的大標題下方加入 **複製** 按鈕，按下按鈕後會先取得樣板，並替換換連結內容，然後將內容複製到剪貼簿內
3. 在擴充功能安裝時，要有預設的模板
4. 只要求最基本的 UI ，美感可忽略

需求確認後，便一步步來實現吧！

### 一、 使用最低限度的建立 Chrome extension

1. 建立專案目錄，並新建最基礎的配置檔 `manifest.json` 於專案目錄上。它有三個必須的屬性：

   * `manifest_version` ：使用的 Chrome extension 版本，目前最新版本為 3，且填 3 以外的都會被警告
   * `name` ：Chrome extension 的名稱，最長不超過 45 個字符
   * `version` ：Chrome extension 的版號，建議從 0.0.1 開始標，因為版號只能升不能降

```jsx
{
  "manifest_version": 3,
  "name": "Bitbucket PR review",
  "version": "0.0.1",
}
```

1. 打開 Chrome，點擊工具列上的擴充功能圖示 → 前往管理擴充功能頁面

   ![](assets/learn-chrome-extensions_02.png)
2. 右上角啟用 **開發人員模式** 後，會顯示操作列，再點擊 **載入未封裝項目**，選擇剛建立的專案目錄

   ![](assets/learn-chrome-extensions_03.png)
3. 可以看到我們剛剛建立的擴充功能

   ![截圖 2023-01-25 下午8.23.25.png](assets/learn-chrome-extensions_04.png)

登愣！你已經成功能建立好第一個有樣子的 Chrome extension。~~我們可以收工了。~~ 不過我們尚未實作做任何功能，所以目前這個擴充功能只是一具空殻，接下來我們會使用一步步實現功能。

### 二、建立 popup 內容

這次 popup 目的是提供使用者自訂 review message 的 UI，並且存起來供往後使用。由於需要儲存的功能，所以會使用 **[chrome.storage](https://developer.chrome.com/docs/extensions/reference/storage/)** API 實作。

1. 先新增 `popup` 資料夾，並在資料夾中新增 `index.html` *和* `popup.js`

   ```jsx
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <link rel="stylesheet" href="./style.css" />
     </head>
     <body>
       <div class="container">
         <h1>Bitbucket PR review</h1>
         <label for="review-template">模板內容：</label>
         <textarea name="review-template" id="review-template" rows="5"></textarea>
       </div>
       <script src="./popup.js" type="module"></script>
     </body>
   </html>
   ```

   `popup.js` 的內容：

   ```jsx
   const $templateInput = document.querySelector('#review-template');

   // 處理使用者輸入並儲存模板
   $templateInput.addEventListener('input', (e) => {
     const { value } = e.currentTarget;

     // 使用 chrome.storage 同步設定
     chrome.storage.sync.set({ reviewTemplate: value });
   });

   // 取得 storage 中的模板
   async function fetchData() {
     let { reviewTemplate } = await chrome.storage.sync.get(['reviewTemplate']);

     $templateInput.value = reviewTemplate;
   }

   // 由於每次重新打開 popup，就等同打開新視窗，所以使用 onload 重新取得資料
   window.onload = () => {
     fetchData();
   }
   ```

   `style.css` 稍微加個樣式：

   ```jsx
   * {
     box-sizing: border-box;
   }
   .container {
     width: 300px;
   }
   label {
     display: block;
   }
   textarea {
     width: 100%;
     margin: 0;
     resize: none;
   }
   ```
2. 更新 `manifest.json`，讓其新增 popup 內容，並加入 `storage` 權限

   ```jsx
   {
     // ...
     "permissions": [
       "storage"
     ],
   	"action": {
       "default_popup": "popup/index.html"
     },
   }
   ```
3. 到 Chrome 點擊工具列上的擴充功能圖示 → 找到我們的擴充功能，點擊右側的圖釘讓圖示固定到工具列上；在工具列點擊圖示，便會顯示剛剛加入的 popup，輸入內容後重新打開，可以看到模板有被記錄下來。

   ![截圖 2023-02-03 上午12.09.59.png](assets/learn-chrome-extensions_05.png)

   ![2023-02-03 00.23.46.gif](assets/learn-chrome-extensions_06.gif)

### 三、在 PR 頁面加入複製按鈕

要取得頁面的內容，或是要對頁面內容進行更動，便需要加入 **content script** 來實現。

1. 首先建立 content 資料夾，並在內建立 `content_script.js` ，我們預計把複製的按鈕放在 PR 標題的下方，由於 Bitbucket 的內容會非同步方式重新渲染，所以我們要使用 MutationObserver 隨時檢測內容的變動（關於 MutationObserver 的介紹，可以看我之前的文章： ***\*[MutationObserver — DOM 宇宙的觀察者](https://medium.com/@alexian853/mutationobserver-dom-%E5%AE%87%E5%AE%99%E7%9A%84%E8%A7%80%E5%AF%9F%E8%80%85-3c2e8d503b1c)\*\***）：

   ```jsx
   async function addCopyBtn () {
   	// 由於 Bitbucket 使用前端路由，故每次變動都要檢查頁面是否為 PR 頁面
     if (!location.href.includes('pull-requests')) {
       return;
     }

     const btnClassName = 'pr-review-message__btn';
     const btnText = '📋 Copy review message';
     const header1 = document.querySelector('[data-qa="pr-header-page-header-wrapper"] h1');
     const currentCopyBtn = document.querySelector(`.${btnClassName}`);

   	// 有 Header 且未建立按鈕才要建立
     if (header1 && !currentCopyBtn) {
       const copyBtn = document.createElement('button');
       copyBtn.classList.add(btnClassName);
       copyBtn.textContent = btnText;

       copyBtn.addEventListener('click', async () => {

   			// 複製訊息內容到剪貼簿，我們等等會實現
         await copyMessageToClipboard();

   			// 回應成功 UI 
         copyBtn.textContent = '✅ Message copied!';
         copyBtn.setAttribute('disabled', '');

   			// 3 秒後還原基本步
         setTimeout(() => {
           copyBtn.textContent = btnText;
           copyBtn.removeAttribute('disabled');
         }, 3000);
       });

   		// 將按鈕加到標題下方
       header1.insertAdjacentElement('afterend', copyBtn);
     }
   }

   // 使用 MutationObserver 觀察只要 document.body 有子節點的變動，就檢查看看有沒有需要加按鈕
   const observer = new MutationObserver((mutations) => {
     const isChildListChanged = mutations.some((mutation) =>
       mutation.type === 'childList' && mutation.addedNodes.length > 0
     );

     if (isChildListChanged) {
       observer.disconnect();

   		// 等等在下面實作
       addCopyBtn();

       observer.observe(document.body, {
         childList: true,
         subtree: true,
       });
     }
   });

   observer.observe(document.body, {
     childList: true,
     subtree: true,
   });
   ```

   另外複製內容會從標籤內取得，其方法 `copyMessageToClipboard` 我們使用 Clipboard API 實作（關於 Clipboard API，可以看我另一篇的文章 **[Clipboard API - 你複製貼上了什麼？](https://alex-ian.me/2023-03-19-clipboard)**）：

```jsx
// 複製按鈕實作
async function copyMessageToClipboard() {
  const { reviewTemplate } = await chrome.storage.sync.get(['reviewTemplate']);
  const prLinkSymbol = /{PR_LINK}/;
  const jiraLinkSymbol = /{JIRA_CARD}/;
  // 一個 PR 可能會關聯多張 JIRA 卡片，故用 Array 包裝
  const jiraLinks = [...document.querySelectorAll('h1 [data-link-key="dvcs-connector-issue-key-linker"]')];
  const jiraLinkPlainText = jiraLinks.map((link) => link.innerHTML).join('|');
  const jiraLinkHtmlText = jiraLinks.map((link) =>
    `<a href="${link.href}">${link.innerHTML}</a>`).join(' | ');

  // 使用 ClipboardItem 建立可複製的內容，使用 .replace 方法替換要複製的內容
  const clipboardItem = new ClipboardItem({
    "text/plain": new Blob(
      [
        reviewTemplate
          .replace(prLinkSymbol, 'PR')
          .replace(jiraLinkSymbol, jiraLinkPlainText)
      ],
      { type: "text/plain" }
    ),
    "text/html": new Blob(
      [
        reviewTemplate
          .replace(/\n/g, '<br>')
          .replace(prLinkSymbol, `<a href="${location.href}">PR</a>`)
          .replace(jiraLinkSymbol, jiraLinkHtmlText)
      ],
      { type: "text/html" }
    ),
  });

	// 將複製內容寫入剪貼簿
  return navigator.clipboard.write([clipboardItem]);
}
```

1. 稍微加個樣式 `content/style.css` 

```jsx
.pr-review-message__btn {
  padding: 4px 0 0;
  color: #172B4D;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.pr-review-message__btn:hover {
  text-decoration: underline;
}
.pr-review-message__btn:disabled {
  text-decoration: none;
  cursor: default;
  opacity: .8;
}
```

1. 最後要記得更新 `manifest.json`，讓其新增 content script 內容：

```jsx
{
  // ...
	"content_scripts": [
    {
      "js": ["content/content_script.js"],
      "css": ["content/style.css"],
			// 將 host 加入 matches 可以取得 cookies, web request 的權限（目前沒用到）
      "matches": [
        "https://bitbucket.org/*"
      ]
    }
  ]
}
```

基本的複製功能就實現了！

![2023-04-03 16.21.14.gif](assets/learn-chrome-extensions_07.gif)

### 四、使用 background 來加個預設的模板

前面所述已經把最基本的功能建立好，但當你滿心歡喜完成功能，想要交給你的好同事試用，但他安裝後卻發現沒有預設的模板，這件事太讓人沮喪了吧。

![截圖 2023-04-05 上午1.10.59.png](assets/learn-chrome-extensions_08.png)

![2023-04-05 01.08.04.gif](assets/learn-chrome-extensions_09.gif)

為了在同事面前保存顏面，我們需要在安裝時加入預設的模板，這時可以用上 background 以及 [Chrome.runtime.onInstalled](https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled) 來實現：

1. 建立 `background.js` ，並加入內容：

```jsx
const defaultReviewTemplate = `Hi Team! Change for {PR_HEADER}. Please review my pull request. Thank you! 🙏
{PR_LINK} | {JIRA_CARD}`;

// 當套件安裝或更新時執行（當 chrome 更新時也會）
chrome.runtime.onInstalled.addListener(async () => {
  const { reviewTemplate } = await chrome.storage.sync.get(['reviewTemplate']);

	// 當現有模板為空時，寫入預設模板
  if (!reviewTemplate) {
    chrome.storage.sync.set({ reviewTemplate: defaultReviewTemplate });
  }
});
```

1. 更新 `manifest.json`，讓其新增 background 內容：

```jsx
{
	// ...
	"background": {
    "service_worker": "background.js"
  }
}
```

再重新安裝一次，可以在 popup 中看到預設的模板內容：

![](assets/learn-chrome-extensions_10.png)

## 完成！

登愣！這次你真的完成一個有完整功能的 Chrome extension，回顧一下我們使用上的部件和對應的功能：

* 建立 `manifest.json` 作 extension 設定
* 使用 `action.default_popup` 建立「模板編輯」介面
* 使用 `content_scripts` 存取內容製作訊息並複製到剪貼簿
* 使用 `background.service_worker` 安裝預設模板

如果你字上談兵了一整篇文章，只想要參考原始碼的話，[在這裡](https://github.com/aforian/bitbucket-pr-review-message/tree/daf7ff633f5ecd9cea6f0db70153a22c9115d26a)。

建立完 extension ，還有最後一步：上架到 Chrome Store，礙於這篇的篇幅有點長了，我們留到下一篇來介紹！

### 參考資料

* <https://developer.chrome.com/docs/extensions/>
* <https://developer.chrome.com/docs/extensions/mv3/manifest/>