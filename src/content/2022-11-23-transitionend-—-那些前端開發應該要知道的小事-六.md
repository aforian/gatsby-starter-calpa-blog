---
title: transitionend — 那些前端開發應該要知道的小事(六)
date: 2022-10-23T14:11:56.109Z
description: 前端開發，是一個與視覺設計關聯度相當高的程式開發領域，除了排版、串接 API
  呈現內容以外，還有對動畫的處理，都是前端工程師需要掌握的能力；當遇到需要製作過渡動畫配合操作流程的情景，前端可以怎麼處理/執行呢？
headerImage: https://miro.medium.com/max/1400/1*1vhe2Ng2dIYflsmQmvxnjA.webp
templateKey: blog-post
---
## 前言

前端開發，是一個與視覺設計關聯度相當高的程式開發領域，除了排版、串接 API 呈現內容以外，還有對動畫的處理，都是前端工程師需要掌握的能力；當遇到需要製作過渡動畫配合操作流程的情景，前端可以怎麼處理/執行呢？

第一個想到最簡單的方法，是透過計數器 `setTimeout()`，取得動畫會完成的時間，待時間完成後執行。這方法聽起來簡單暴力，但當需要調整時卻十分不便，因為傳入 `setTimeout` 的延遲值，需要分別在 css 和 js 設置，如果其中一邊忘記設定，就會讓動畫的事件產生時間差的 bug；另外，假如在動畫進行到一半被中斷（例如 collapse 元件一直收合的途中被再次打開），就要一直重新建立新的計數器，實作起來非常繁瑣。既然 `setTimeout` 不好用，那有其他更好的解法嗎？有的，就是使用 `transitionend` 事件。

我們先來看一下 `transitionend` 的事件描述（取自 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event)）

> The **`transitionend`** event is fired when a **CSS transition** has completed. In the case where a transition is removed before completion, such as if the `transition-property` is removed or `display` is set to `none`, then the event will not be generated.
> 

也就是說，對元素綁定 `transitionend` 事件，會在過渡動畫完成後，才會被觸發，所以在元素在動渡動畫途中被中止或是修改，都不會因此觸發 `transitionend` ，可以確保動畫完成才執行，讓往後的行為有所保障。

可能有人在思考，我有什麼用到它的情境呢？那麼就以實際案例看看 `transitionend` 的妙用吧！

## `transitionend` 實際應用

假設現在需要實作一個可以開合的區塊，使用 `height` 屬性來實作元素的開合，其區塊的內容高度會根據使用者操作變化，在區塊展開後，因為高度會被目前的 `height` 限制，導致內容無法完整顯示；解決的方法，是在開合動畫結束後，重置 `height` 屬性，這樣區塊的高度就會內容自行調整，而這個時候 `transitionend` 就派上用場了：

![使用 transitionend 前](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0d4b1e12-5d33-4d27-86af-aed2e524fd3e/2022-10-22_23.34.49.gif)

使用 transitionend 前

![使用 transitionend 後](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c286a911-9355-4785-abb0-f540cd3303ba/2022-10-22_23.34.35.gif)

使用 transitionend 後

[https://codepen.io/alexian/pen/GRdVaqG?editors=1011](https://codepen.io/alexian/pen/GRdVaqG?editors=1011)

## `transitionend` 使用的注意事項

在使用 `transitionend` 時，也有需要注意事項，由於 `transitionend` 是在 **任何過渡動畫完成** 後觸發，假如有不同的 CSS 屬性產生動畫，就算是相同的 `transition-duration`，也會讓 `transitionend` 多次觸發，解決辦法可以使用 [transitionEvent.propertyName](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent/propertyName) 判斷，或者 debounce 組合事件（關於 debounce，可以看看 **[Debounce & Throttle - 那些前端開發應該要知道的小事(一)](https://alex-ian.me/2019/07/06/debounce&throttle)** ）。

[https://codepen.io/alexian/pen/yLjmWZJ?editors=1011](https://codepen.io/alexian/pen/yLjmWZJ?editors=1011)

## 所有 transition 監聽事件

雖然 `transitionend` 是最常用的 transition 監聽事件，但認識一下其他事件對過渡動畫的掌握，絕不是壞事，以下就是所有有關 transition 的監聽事件：

- `transitioncancel` ：在過渡動畫完成前被中斷時（例如 transition 屬性被拔除，元素被移除等）觸發
- `transitionend`：在過渡動畫完成時觸發，假如被中斷則不會觸發
- `transitionrun`：在過渡動畫建立時觸發（在 transition-delay 前）
- `transitionstart` ：在過渡動畫開始執行時觸發（在 transition-delay 後）

觸發過渡事件範例：

[https://codepen.io/alexian/pen/eYrqwpE?editors=1010](https://codepen.io/alexian/pen/eYrqwpE?editors=1010)

### 總結

- 當需要在過渡動畫完成時觸發事件，可以考慮使用 `transitionend`
- `transitionend` 會根據不同 CSS 屬性過渡動畫完成而多次觸發

希望大家看完這篇對過渡動畫事件有更好的掌握和理解！

## ****參考資料****

[https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event)