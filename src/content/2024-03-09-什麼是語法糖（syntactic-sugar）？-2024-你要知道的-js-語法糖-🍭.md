---
title: 什麼是語法糖（Syntactic sugar）？ - 2024 你要知道的 JS 語法糖 🍭
slug: js-syntactic-sugar-2024
date: 2024-03-09T07:21:51.396Z
description: 有程式語言的開發者，會根據使用者的反饋，實現一些能減省步驟的語法，這些語法稱為「語法糖」（Syntactic Sugar）。
tags:
  - JavaScript
  - 前端開發
headerImage: ../../static/assets/js-syntactic-sugar-2024-00-banner.png
templateKey: blog-post
---
> 語法糖能吃嗎？

在算數學時，不知道你什麼時候開始有次方（乘方）的概念呢？在 2 的 4 次方這種概念出現之前，我們會用 2 x 2 x 2 x 2 的方式去表達，而自從有了次方的概念，我們因此可以用更簡潔的書寫方式來表達相同的概念，在之後其他的數學計算，也能更簡潔的表達和得到共識。

在寫程式時也有類似的狀況，我們在進行開發時，都會力求寫出簡潔而高效的程式碼，但有時候會礙於程式碼語法的限制，導致需要用較繁瑣的寫法，去實現實際概念很簡單的過程；有程式語言的開發者，會根據使用者的反饋，實現一些能減省步驟的語法，這些語法稱為「語法糖」（Syntactic Sugar）。**語法糖** 一種使程式語言中的某些操作更加容易閱讀和寫作的語法，它並不會改變原本程式運作的邏輯，這個名詞是由 [Peter John Landin](https://zh.wikipedia.org/wiki/%E5%BD%BC%E5%BE%97%C2%B7%E5%85%B0%E4%B8%81) ，意指就像糖把食物變得美味一樣，這些方便的語法也讓程式碼變得美味容易入口（閱讀），因而得到語法糖之名。

JavaScript 有著 ECMAScript 這樣的實作規範，而 ECMAScript 的更新頻率之高，讓 JavaScript 一直有實現新的語法糖，因為在這裡介紹一下個人認為在 2024 開發者必須要知道 4 + 1 組 JavaScript 語法糖

# 1. async / await

第一個必須要提及的，是終結了 JavaScript 中請求回調地獄和 Promise 鏈式地獄的重量級語法，[async](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/async_function) / [await](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/await) 組合拳。假如你是古早的 JavaScript 的開發者，對於回調地獄（Callback Hell）這個名詞可能不會感到陌生，在當時假如多個請求之間有順序關係，必須不斷對請求事件傳回調函式，並在完成後呼叫。

例如我有以下需求：

要先請求 `user`，再使用 `user.page_id` 發出請求取得 page 資訊，最後使用 `page.blog_post_id` 發出請求最得 `blog_post` 資訊，並使用 `console.log` 印出：

## Promise 出現前，使用 callback 的實現：

```tsx
// getRequest 封裝 GET 邏輯
function getRequest(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(null, xhr.responseText);
    } else {
      callback(new Error('Request failed: ' + xhr.statusText));
    }
  };
  xhr.onerror = function() {
    callback(new Error('Network error'));
  };
  xhr.send();
}

// 使用回調函式來實現具順序的非同步請求
function getBlogPost () {
	getRequest('/user/1', function(error, user) {
	  getRequest('/page/' + user.page_id, function(error, page) {
	    getRequest('/blog_post' + page.blog_post_id, function(error, blog_post) {
	      console.log('blog_post: ', blog_post);
	    });
	  });
	});
}
getBlogPost();
```

## 使用 Promise.then 進行鏈式呼叫：

Promise 是 ES6 加入的語法，可以透過 `.then` `.catch` 方法對非同步事件進行鏈式呼叫，能夠一定程度減少回調地獄造成的可讀性災難；但仔細看每個 .then 方法被調用時，其實也需要傳入一個具回傳值的回調函式，實際上回調函式並沒有因為 Promise 的出現而消失：

```tsx
function getRequestPromise(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(new Error('Request failed: ' + xhr.statusText));
      }
    };
    xhr.onerror = function() {
      reject(new Error('Network error'));
    };
    xhr.send();
  });
}

// 使用 Promise.then 鏈式方法來實現具順序的非同步請求
// 每個 then 方法中，仍然需要接受一個具回傳值的回調函式
function getBlogPost () {
	getRequestPromise('/user/1')
	  .then(user => getRequestPromise('/page/' + user.page_id))
	  .then(page => getRequestPromise('/blog_post' + page.blog_post_id))
	  .then(blog_post => console.log('blog_post:', blog_post));
}
getBlogPost();
```

## async / await 達成無巢狀 / 無回調寫法：

但在 async / await 出現在則可以把回調函式完全消除：

```tsx
// 使用 async / await 語法糖實現具順序的非同步請求
// 每個 then 方法中，仍然需要接受一個具回傳值的回調函式
const getBlogPost = async () => {
	const user = await makeRequest('/user/1');
	const page = await makeRequest('/page/' + user.page_id);
	const user = await makeRequest('/blog_post' + page.blog_post_id));

	console.log('blog_post:', blog_post)
};
getBlogPost();
```

而 async / await 在需要條件性請求的情境上更為實用，例如後面在請求 blog post 時，需要判斷是否有本地使用者的資訊，如果有可直接使用，否則要透過 API 取得遠端 user 資訊；再透過 user 進行前面的步驟：

**Promise.then 版本：**

```tsx
const conditionalGetBlogPost = async (localeUser) => {
  // 把得到 user 後做的行為建立一回調函式
	const showBlogPostByUser = (user) => {
		makeRequest('/page/' + user.page_id))
			.then(page => makeRequest('/blog_post' + page.blog_post_id))
		  .then(blog_post => console.log('blog_post:', blog_post));
  }

  // 條件判斷
	if (isEmpty(localeUser)) {
    // 進行 user 請求後調用回調函式
		makeRequest('/user/1').then(user => showBlogPostByUser(user));
  } else {
    // 直接用 localeUser 調用回調函式
		showBlogPostByUser(localeUser);
  }	  
}
```

**async / await 版本：**

```tsx
// async await 版本
const conditionalGetBlogPost = async (localeUser) => {
  // 直接用三元運算子最賦值 user
	const user = isEmpty(localeUser)
    ? await makeRequest('/user/1')
    : localeUser;

	const page = await makeRequest('/page/' + user.page_id);
	const user = await makeRequest('/blog_post' + page.blog_post_id));
	
	console.log('blog_post:', blog_post);
};
```

# 2. 解構賦值

[解構賦值](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 是極為一個方便的語法糖，可以從陣列或物件中提取值並賦值給變數。這樣可以讓我們以更簡潔的方式處理數據，同時減少冗長的程式碼。解構賦值對於陣列與物件兩種資料類型有不同的解構方式：

## 陣列的解構賦值

陣列的解構依據原陣列順序進行，可順序為第 1 ~ n 個的陣列項目進行變數宣告，減省了不少操作步驟；假如要把陣列剩餘項目賦值至新變數中，也可以使用 `...` 來實現：

```tsx
// 以往要從陣列取值並宣告變數的寫法
let arr = [1, 2, 3, 4, 5];
let first = arr[0];
let second = arr[1];
let rest = arr.slice(2);

// 解構賦值寫法，效果等同於上面
let arr = [1, 2, 3, 4, 5];
let [first, second, ...rest] = arr;
```

最常的應用例子，是 React 的 useState，其好處是能快速且直觀對 getter 和 setter 進行命名，或是只使用 getter：

```tsx
const App = () => {
  // 同時對 getter, setter 宣告變數
  const [value, setValue] = useState();
  const [state, setState] = useState();

  // 我只使用第一個項目，後面則可以省略
  const [valueOnly] = useState();
}
```

## 物件的解構賦值

物件的解構賦值則是以物件屬性名稱來進行，

```tsx
// 以往要從物件取值並宣告變數的寫法
let user = {
	name: 'alex',
  age: 30,
  gender: 'male',
  nationality: 'Macao',
};
let name = user.name;
let age = user.age;
let rest = Object.keys(user).reduce((result, key) => {
	if (key !== 'name' && key !== 'age') {
    result[key] = user[key];
  }
  return result;
}, {});

// 解構賦值寫法，效果等同於上面
let user = {
	name: 'alex',
  age: 30,
  gender: 'male',
  nationality: 'Macao',
};
let { name, age, ...rest } = user;
```

物件的解構賦值，常見於函式參數的宣告，透過解構賦值可以避免在函式內部進行冗長的宣告，也使得程式碼更加清晰。

例如以下是一個解構賦值的範例：

```jsx
function getUserInfo({ name, age, gender }) {
  console.log(`名字: ${name}, 年齡: ${age}, 性別: ${gender}`);
}
const user = {
  name: 'alex',
  age: 30,
  gender: 'male'
};
getUserInfo(user); // 輸出: 名字: alex, 年齡: 30, 性別: male
```

在上述範例中，我們從 `user` 物件中解構出 `name`、`age` 和 `gender` 三個屬性，並將其賦值給相同名稱的變數，這樣在 `getUserInfo` 函式內部，我們可以直接使用 `name`、`age` 和 `gender` 這三個變數，而不需要另外進行賦值操作。

# 3. 空值運算符 Nullish Coalescing Operator (`??`) 與 可選串連 Optional Chaining（`?.`）

[空值運算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) 和 [可選串連](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) 都是用於處理為 null 或 undefined 的值的語法糖。以往由於 JS 判斷 falsy 的詭異特性，因此要把一個變數從數字 `0` 或空字串 `'’` ，與 `null` 或 `undefined` 具分開來時，常常要用上 `x === null || x === undefined` 這種較繁瑣的寫法，或是依賴外部 util（例如：lodash 的 `isNil()` ）來達成；空值運算符和可選串連的出現，讓這些判斷變得更輕。

**空值運算符（Nullish Coalescing Operator）**的使用方式與 `||` 相似，作用於兩個變數之間，假如其左側的項目為 `null` 或 `undefined` 時，會回傳和其右側的內容，反之則回傳左側內容，對於需要根據傳入值來決定給預設值的變數非常有用：

```jsx
const width1 = null;
const width2 = 0;
const DEFAULT_WIDTH = 10;

const result1 = width1 ?? DEFAULT_WIDTH; // 10
const result2 = width2 ?? DEFAULT_WIDTH; // 0

// 假設用 || 會無法判斷 0 值
const result3 = width2 || DEFAULT_WIDTH; // 10
```

**可選串連（Optional Chaining）**使用上與一般的鏈式呼叫屬性/方法很相似，但它會讓你在嘗試訪問一個可能不存在的物件屬性或方法時不會產生錯誤，原本需要一層層檢查巢狀物件的判斷，透過可選串連只需要一個鏈式形式來表達：

```tsx
const user = {
  name: 'alex',
  age: 30,
  gender: 'male'
  sayHello: function() { console.log(`hello! I'm ${this.name}`) }
};

user?.name              // 'alex'
user?.last_name         // undefined
user?.sayHello?.();     // "hello! I'm alex"
user?.sayBye?.();       // undefined
```

**空值運算符** 和 **可選串連** 一同使用可以大量減少巢狀判斷條件，提高程式碼的可讀性：

```tsx
// 傳統寫法
function getUserCartItemIds(user) {
	if (user && user.cart && user.cart.item) {
	  return user.cart.items.map(item => item.id);
	}
	return [];
}

// 使用空值運算符和可選串連寫法
function getUserCartItemIds(user) {
  return (user?.cart?.items ?? []).map(item => item.id);
}
```

# 4. 邏輯賦值運算符家族 Logical Assignment Operators（**Logical OR assignment** `||=` 、 **Logical AND assignment** `&&=` 、 **Nullish coalescing assignment `??=`**）

**[或賦值運算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment)（Logical OR assignment）** `||=` 、 **[與賦值運算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment)（Logical AND assignment）** `&&=` 和 **[空值賦值運算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment)（Nullish coalescing assignment）** `??=`，是 JavaScript 中的新語法糖。這些操作符結合了邏輯運算（OR `||` 和 AND `&&`）和賦值運算符 `=`。

`||=` **或賦值運算符** 只在左邊的變數為 falsy（即為 `null`、`undefined`、`false`、`0`、`NaN` 或空字串時） 時，才會將右邊的值賦值給左邊的變數：

```jsx
let userName = '';

// 傳統寫法
userName = userName || 'Alex';  // 'Alex'

// 使用 ||= 運算符
userName ||= 'Alex';            // 'Alex'
```

相對地，`&&=` **與賦值運算符** 只在左邊的變數為 truly（即非 `null`、`undefined`、`false`、`0`、`NaN` 或空字串）時，才會將右邊的值賦值給左邊的變數：

```jsx
let userHeight = 0;

// 傳統寫法
userHeight = userHeight && 100;

// 使用 &&= 運算符
userHeight &&= 100;
```

還有 [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment)**空值賦值運算符 Nullish coalescing assignment**，作用與以上兩個運算符類近，空值賦值運算符只在左邊的變數為 `null`、`undefined` 時，才會將右邊的值賦值給左邊的變數：

```jsx
let userName1 = '';
let userName2 = null;

// 單純使用 ??
userName1 = userName1 ?? 'Alex';  // ''
userName2 = userName2 ?? 'Alex';  // 'Alex'

// 使用 ??= 運算符
userName1 ??= 'Alex';  // ''
userName2 ??= 'Alex';  // 'Alex'
```

透過邏輯賦值運算符家族作為語法糖，可以同時進行邏輯判斷與賦值，大大提高了程式碼的可讀性。

# 同場加映 - 箭頭函式 Arrow function （`=>`）

**[箭頭函式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) （Arrow function）**是 ES6 引入的語法，透過簡潔的語法來表達函式的宣告，以下是一個箭頭函式的範例：

```tsx
// 傳統的宣告方式 1
function add(a, b) { return a + b; }
// 傳統的宣告方式 2
const add = function (a, b) { return a + b; }

// 箭頭函式的宣告方式
const add = (a, b) => a + b;
```

假如不是習慣 OOP 開發模式的 JavaScript 開發者，會認為箭頭函式僅僅是宣告函式的語法糖，實際上箭頭函式與傳統函式具有不同的作用。箭頭函式有幾個特點：它們沒有自己的 `this`、`arguments`、`super` 或 `new.target`，並且不能用作建構函數。以下是一個表達箭頭函式差異的範例：

```tsx
// 傳統函式 
const fn1 = function (num1) {
		try {
      console.log(`arguments.length: ${arguments.length}`);
    } catch (e) {
      console.log(e)
    }; 

    return num1 + this.num2;
}

// 箭頭函式
const fn2 = (num1) => {
    try {
      console.log(`arguments.length: ${arguments.length}`);
    } catch (e) {
      console.log(e)
    }; 

    return num1 + this.num2;
}

const obj = {
  num2: 2,
  fn1,
  fn2,
}

obj.fn1(1) // 印出： arguments.length: 1, 回傳 2
obj.fn2(1) // 印出： ReferenceError: arguments is not defined, 回傳 NaN
```

## 總結

程式碼的最終目的，是將人寫出來的內容編譯成機器能運行的內容，讓程式碼的可讀性必然是越高越好，語法糖也因應程式的發展不斷增加；但不必因此而焦慮會跟不上，畢竟我們在以往就有使用不少的語法糖，說一個大家可能都知道如何使用，但沒有意識到是語法糖的寫法。

我們除了會使用 `&&` 和 `||` 的符號來進行條件判斷，也會利用其短路效果實現賦值，例如：

```tsx
const DEFAULT_COLOR = 'black'; 
const color1 = 'red' || DEFAULT_COLOR;             // 'red'
const color2 = '' || DEFAULT_COLOR;                // 'black'

const DEFAULT_HEIGHT = 100;
const hasContent = true;
const height1 = hasContent && DEFAULT_HEIGHT;       // 100
const height2 = !hasContent && DEFAULT_HEIGHT;      // false
```

實際上以上的這些寫法都是替代三元運算符的語法糖寫法，透過三元運算符重新表達後會長這樣：

```tsx
const DEFAULT_COLOR = 'black'; 
const color1 = 'red' ? 'red' : DEFAULT_COLOR;                // 'red'
const color2 = '' ? '' : DEFAULT_COLOR;                      // 'black'

const DEFAULT_HEIGHT = 100;
const hasContent = true;
const height1 = hasContent ? DEFAULT_HEIGHT : hasContent;    // 100
const height2 = !hasContent ? DEFAULT_HEIGHT : !hasContent;  // false
```

其實我們不知不覺中就在使用語法糖來改善我們程式碼的可讀性，因此透過這篇文章分享給大家有用的語法糖，一起提升程式碼的可讀性吧。

### 參考資料：

* [](https://sourceacademy.org/sicpjs/1.3.3)<https://sourceacademy.org/sicpjs>
* <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements>
* <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators>