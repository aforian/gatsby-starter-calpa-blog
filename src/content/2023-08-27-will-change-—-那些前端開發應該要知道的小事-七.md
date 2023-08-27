---
title: will-change — 那些前端開發應該要知道的小事(七)
slug: will-change
date: 2023-08-27T06:14:28.833Z
description: 你有沒有遇過無論如何實作動畫，畫面就是會出現卡頓的情況發生呢？在前端開發中，有一個專門處理這種情境的的屬性：will-change。
tags:
  - 那些前端開發應該要知道的小事
  - will-change
headerImage: ../../static/assets/260px-025pikachu.png
templateKey: blog-post
---
> 你要做動畫你要先說啊

前端開發少不免會需要使用 CSS 實作過渡動畫，不管是使用 transform 搭配 transition 進行簡單的漸變動畫、或是使用 animation 和 keyframes 以應用更為複雜的動畫，動畫的順暢度都對使用者體驗有非常大的影響，因些我們需要處理好動畫的效能；如果處理不慎，輕則導致動畫無法正常呈現，重則影響畫面無法操作，所以處理好動畫效能也是非常重要的技能。不知道你有沒有遇過無論如何實作動畫，畫面就是會出現卡頓的情況發生呢？

在前端開發中，有一個專門處理這種情境的的屬性：**will-change**。

# 什麼是 will-change？要怎麼使用？

will-change 是一個 CSS 屬性，它可以告訴瀏覽器哪些元素將要發生改變，進而優化這些元素的渲染方式。讓瀏覽器可以為該元素的渲染提前進行相關的準備工作，以避免在元素發生改變時出現卡頓或者閃爍等的問題。

以下是 will-change 的寫法：

```
.element {
  will-change: property; /* transform, opacity, etc. */
}
```

其中 `property` 是指將要發生改變的屬性，可以是任何CSS屬性，比如 transform、opacity 等等。

以下是一個使用的例子，頁面有 10000 個會進行動畫的元素，由於在開始各元素並沒有進行過渡效果，當 JS 更新了元素的屬性，瀏覽器根據前面提及的 **Composite** 步驟，讓每個元素建立渲染層，但因為數量眾多，影響了動畫的順暢度；

<iframe src="https://player.vimeo.com/video/858323252?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="608" height="680" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" title="will-change-v-1"></iframe>

這個時候為元素加入 `will-change: transform;` ，讓瀏覽器得到眾多元素即將有動畫產生，進而準備好元素建立渲染層，讓動畫得以更順暢的呈現；

<iframe src="https://player.vimeo.com/video/858323272?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="608" height="680" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" title="will-change-v-2"></iframe>

[Codepen 範例在此](https://codepen.io/alexian/pen/LYMpqgv?editors=0110)（建議使用 safari 更能看出差異）

# will-change 實際做了什麼？

雖然 will-change 的使用很直覺，但 will-change 在瀏覽器底層實際做了什麼呢？在瞭解它做了什麼之前。我們先來看看瀏覽器是怎麼渲染畫面的。

## 瀏覽器是怎麼渲染畫面的？

我們知道每個 HTML 標籤都會產出 Document Object Model （俗稱 DOM），而瀏覽器會根據 HTML 產生 DOM tree；除此以外，還會根據載入的 CSS ，產出 CSS Object Model （俗稱 CSSOM）tree；最後瀏覽器會配對 DOM 與 CSSOM，產出 rendering tree，也就是我們最終可以在瀏覽器視窗看到的內容。

而 rendering tree 產出後，會透過三個主要步驟，渲染出內容：

1. **Reflow**：為 DOM 進行佈局/形狀的步驟，例如根據 CSS 的 width, height 屬性製作尺寸、或是根據 top, left 屬性定位
2. **Repaint**：為 DOM 進行外觀或色彩變化的步驟，例如根據 color, background 繪製顏色內容。
3. **Composite**：瀏覽器會根據 CSS 最佳化成不同的渲染層進行 Reflow 與 Repaint 步驟，生成的渲染層將會送至 GPU 進行合成，最終成為我們在瀏覽器看到的畫面

![Chrome devTools 的 layer panel 可以檢查目前畫面上的渲染層](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4d88276d-60f3-4bce-b73d-9b01bdebb0d1/%E6%88%AA%E5%9C%96_2023-08-27_%E4%B8%8A%E5%8D%882.26.43.png)

Chrome devTools 的 layer panel 可以檢查目前畫面上的渲染層

這邊我們著重看的部分是 **Composite**，瀏覽器生成渲染層考量的因素有很多，比如元素的 CSS 包含 opacity, transform 或是 z-index，或是是否在進行過渡效果等。透過建立渲染層進行畫面的合成，後續渲染畫面時可以減少 Reflow 和 Repaint 的次數，以達到提升效能的效果。

瞭解過這些基礎原理後，我們再來看看 will-change 可以做些什麼。

## will-change 的真面目

我們用一個比較簡單的例子，搭配 Chrome devtools 中的 layer panel 來看；一般來說，瀏覽器會根據畫面中的元素的狀態而建立渲染層，會建立渲染層的原因包含 z-index、position 等，其中包含元素使用 transform 進行動畫（[codepen 範例](https://codepen.io/alexian/pen/dywGyLO?editors=0110)）：

![2023-08-27 01.41.25.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2531d39d-e924-48d9-b223-76d08b6044e0/2023-08-27_01.41.25.gif)

可以看到在未加上 will-change 屬性的狀態，在動畫進行時，會為 .block 建立單獨的渲染層，在結束後，該渲染層便會移除。這樣的好處是可以有效的運用系統資源，避免浪費；

而為 .block 加上 will-change 後的狀況（[codepen 範例](https://www.notion.so/will-change-112a763570f8404d9711db69c22bcdb1?pvs=21)） ：

![2023-08-27 01.46.29.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3a052085-c954-46a6-932c-07a7e00dedee/2023-08-27_01.46.29.gif)

可以看到在一般情況下有動畫才出現的渲染層，變成長駐的出現；這是瀏覽器在接受到 will-change 屬性的內容，預先得知 .block 會有 transform 動態的變化，所以讓渲染層維持，以利動畫可以隨時的呈現，代價則是需要更多系統資源去維持。

不知道大家以往有沒有使用過 `transform: translate3d(0,0,0)` 這個 hack 來優化動畫，其原理和 will-change 是相同的喔！

# 使用 will-change 的注意事項

從我前述兩個範例可以看出，will-change 其實不應該任意使用，在使用前需要考量使用的情境，以下是使用 will-change 的注意事項：

## 1. 請把 will-change 當作最終手段

一般情況下瀏覽器會為你的網頁應用做資源的最佳化處理，而且使用時需要系統資源作為代價；will-change 應該在真正遭遇到效能瓶頸的時候再做補充。如果以藥物作比喻，will-change 更像是腎上腺素或止痛藥；我們不會在還沒遇到危險之前就先做緊急處理。

## 2. 使用 javascript 動態加入/移除

由於 will-change 的行為會在瀏覽器接受到屬性變化後進行最佳化，情境許可的狀況下，可以考慮知道動畫需要出現前一段時間，再為元素加入該屬性。並在動畫效果完成後，為其進行移除（比如使用 `transitionend` 事件監聽）

## 3. 產生的渲染層可能會影響現有排版

由於 will-change 屬性可能會為元素建立單獨的渲染層，層疊的順序就有可能影響到原有畫面的排版，因此必須注意使用的地方

# 總結

會使用 will-change 的情境其實寥寥可數，通常是你發現畫面的動畫太卡頓，或是因為某些複雜的動畫而產生 bug 時，才會考慮使用 will-change 進行優化；該屬性也並非什麼新鮮事，除了 IE 家族外其他瀏覽器也已經悉數支援，因此可以放心的使用。

回過頭來說，假如遇到動畫卡頓的問題，你更應該先想想原有的程式碼邏輯是否有優化的可能，直到真的想不到更優解，will-change 才是你最後的殺手鐧。

## 參考來源

* [一篇文章說清瀏覽器解析和CSS（GPU）動畫優化](https://segmentfault.com/a/1190000008015671)
* <https://developer.mozilla.org/en-US/docs/Web/CSS/will-change>