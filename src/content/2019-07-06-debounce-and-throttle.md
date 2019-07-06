---
templateKey: blog-post
id: 2019-07-06
title: Debounce & Throttle - 那些前端開發應該要知道的小事(一)
slug: /2019/07/06/debounce&throttle
date: 2019-07-06T12:00:00Z
description: 當開發的應用功能和架構越來越大、越來越複雜的情況下，降低瀏覽網站所消耗的效能就成為開發者的義務，而Debounce和Throttle概念便是降低互動事件頻繁觸發的解答。
headerImage: https://i.imgur.com/b4YSjR4.jpg
publish: true
tags:
  - 那些前端開發應該要知道的小事
---

## 前言

也許一開始接觸前端開發的新手們，都有使用jQuery來處理畫面事件的經驗，也曾認為自己可以使用jQuery一直橫行天下，直到有天要處理偵測繁複的使用者互動事件，發現使用一堆冗長的jQuery事件綁定後，畫面變得卡到不行，你才發現綁定事件的發生太過頻繁，然後你開始懷疑自己的編程人生，是否應該繼續走下去...

當然以上的事件純屬誇大，而且現在瀏覽網頁裝置的效能比數年前好上不少，以上事件發生的機率已是微乎其微，但當開發的應用功能和架構越來越大、越來越複雜的情況下，降低瀏覽網站所消耗的效能就成為開發者的義務，而Debounce和Throttle概念便是降低互動事件頻繁觸發的解答。

## Debounce （去抖動）
所謂 `Debounce`，是讓使用者在觸發相同事件（如卷軸）的情境下，停止觸發綁定事件的效果，直到使用者停止觸發相同事件。
以現實的例子來說，就是排隊搭公車的時候，司機在開門後，會待每一個乘客都上車後，最後才會關上門。

簡單實現的程式碼如下：
```javascript
function debounce(func, delay=250) {
    let timer = null;

    return () => {
        let context = this;
        let args = arguments;

        clearTimeout(timer);
        timer = setTimeout(() => {
        func.apply(context, args);
    }, delay)
    }
}
```

使用方法如下：
```javascript
function handleScroll() {
    console.log(window.scrollY)
}

window.addEventListener('scroll', debounce(handleScroll));
```

簡單來說，就是在函數域加入一個計時器，如果事件一直觸發，便刷新計時器，直至計時器時限內沒有觸發該事件，便執行事件行為。

## Throttle (節閥)
`Throttle` 是另一種減緩事件觸發方法，它與Debounce的差異是，為使用者觸發相同事件時提供間隔，控制特定時間內事件觸發的次數。
以現實例子來說，就像日本庭院常見的那個盛水的竹子裝置（名為鹿威），流水一直下來，但竹子會等水盛滿（時間到），才會把水排出。

![](https://i.imgur.com/1lJ7XQW.gif)
鹿威，圖片來源：https://www.pinterest.ca/pin/101260691599109638/

簡單實現的程式碼如下：
```javascript
function throttle(func, timeout = 250) {
  let last;
  let timer;

  return function () {
    const context = this;
    const args = arguments;
    const now = +new Date();

    if (last && now < last + timeout) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        func.apply(context, args)
      }, timeout)
    } else {
      last = now
      func.apply(context, args)
    }
  }
}
```

使用方法如下：
```javascript
function handleScroll() {
    console.log(window.scrollY, 500)  //500ms才允許再次執行
}
```

Throttle實現方法是在函數域加入一個計時器並記錄最新一次執行的時間點，並把現在的時間點與記錄的時間點再比較，如果差距超過設定時限，便允許再次執行事件任務，並記下新的執行時間點。

##

## 後記，接觸 Debounce & Throttle的時機
說來慚愧，接觸到Debounce的時間點，已經是我成為前端開發者的第三年，在文章開首的故事，可以說是自己開發歷程的體現。在接觸的專案越來越大的情況下，任何會影響效能的部分都要顧慮到，這也是我會開始這個系列的原因，謝謝大家的觀看。