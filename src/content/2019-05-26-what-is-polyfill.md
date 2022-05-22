---
templateKey: blog-post
id: 2019-05-26
title: polyfill是什麼？
slug: /2019/05/26/what-is-polyfill/
date: 2019-05-26
description: polyfill是什麼
headerImage: https://i.imgur.com/SgPSLhm.png
publish: true
tags:
  - JavaScript
---

人在江湖，身不由己，在接案的過程中，總有一些你不想接、但也不得不接的案子，而且客戶的需求總是想要包山包海（卻拿不出摳摳）。而網站的前端開發者最常遇到的難題，絕對是瀏覽器版本相容的問題。

通常這類的案件，我都會避免使用Vue、React等前端框架，畢竟他們還要注意SEO的問題，而且他們更希望能夠支援至IE8的環境，像Vue表明不支援IE8的狀況下，使用傳統的方式是比較穩妥的做法。因此我用上了jQuery，希望避免相容性的問題。想當然，問題還是出現了，這時候，也polyfill也就應運而生。

**polyfill** 這個單詞是由 Remy Sharp 發揚光大的，polyfill代指為舊瀏覽器實現或模擬現有版本已實現之功能的程式碼片段。

例如在ie一直沒有實現`Array.includes()`這個方法，於是我們為了在ie實現這個方法，會引用下面的polyfill(參考自[MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)):
```javascript
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1.
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}
```
加入後便可以在IE的環境下使用`Arrar.includes()`方法了。

而當使用前端框架開發時，它們提供的新手包已經使用babel-polyfill套件來完成這個任務，所以新手在開發時不需要擔心問題，但也因此會忽略這個知識，而我也曾經是當中的一員，故寫了這一篇，幫助自己記憶。

而在polyfill之前，也有一個相類似的名詞--shim，shim同樣也是為舊版環境提供現有功能的程式碼，但polyfill與shim最大的不同，是polyfill實現的功能都是官方正式公怖並實現的規範，shim則是實現原生沒有的功能（例如lowdash），而這也是 Remy Sharp使用polyfill一詞去作具分的原因。

那麼什麼時候才要用polyfill呢？這取決於客戶和使用者瀏覽的環境，如果環境是能夠實現需要的功能，那就避免放入冗長的polyfill，而我平常會使用 https://caniuse.com/ 檢查這原生方法是否有在該環境實現，來決定是否載入該polyfill。而另外也有一些較新的解決方法，例如 https://polyfill.io/v3/ 使用api request查找環境是否需使用polyfill，但由於我還沒有試過，所以不作評論。

![萬惡的IE](https://i.imgur.com/SgPSLhm.png)
> 萬惡的IE

希望大家在遭還瀏覽器Gank時，可以使用polyfill迎刃而解～

**參考**
- https://developer.mozilla.org/en-US/docs/Glossary/Polyfill
- https://remysharp.com/2010/10/08/what-is-a-polyfill