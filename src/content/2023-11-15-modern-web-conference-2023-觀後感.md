---
title: Modern Web Conference 2023 觀後感
slug: mwc-2023
date: 2023-11-15T16:01:03.550Z
description: Modern Web Conference （MWC）
  作為每年度經典的網頁開發者盛會，去年因疫情停辦後，今年又重新舉辦；而在佛心我司提供少量的公關票下，讓這個自從疫情以來便沒有參與過任何實體的開發者活動的我，得到一個觀摩大神們演講的機會，也順便讓自己跟上時代的洪流。
tags:
  - 前端開發
  - ChatGPT
  - AI
  - Copilot
  - WebAssembly
headerImage: ../../static/assets/mwc-2023-banner.png
templateKey: blog-post
---
> <https://modernweb.tw/>

# 前言

Modern Web Conference （MWC） 作為每年度經典的網頁開發者盛會，去年因疫情停辦後，今年又重新舉辦；而在佛心我司提供少量的公關票下，讓這個自從疫情以來便沒有參與過任何實體的開發者活動的我，得到一個觀摩大神們演講的機會，也順便讓自己跟上時代的洪流。

# 趨勢關鍵字：AI

亳不意外地，去年的 AI 狂潮的出現，不管是在日常生活、或是專業的工作領域，AI 與 ChatGPT 所造成的聲量和影響力都非常強大，它可以做的事非常多，小至文章總結、大至內容發想；甚至可以根據 prompt 產出可執行的程式碼，許多人都喊說工程師要失業了。

在這次 MWC 中，也有不少講者的主題圍繞在 AI 和 ChatGPT 上，但方向明顯並不是說 AI 會取代工程師，而是介紹 AI 是提升工程師開發效率的絕佳工具。以下是我一些對講者分享的總結，或是聽到的一些關鍵字。

## ChatGPT 的正確使用姿勢

相信大家都稍微試用過 [ChatGPT](https://chat.openai.com/)，雖然說他是以對話的方式進行溝通，但大家應該都有遇過明明問 A 但它卻回覆 B 這種牛頭不對馬嘴的情況發生；因為要發揮它的最大能力，需要一些正確的方式打開，俗稱 prompt 詠唱力，以下是三個基本的概念：

1. 你的 prompt 要足夠的具體明確

   * 不要：`請給我一段算健康度的程式碼` （什麼健康度，什麼樣的程式碼）
   * 應該：`請用 javascript 寫給我一段算 BMI 的程式碼` 透過
2. 如果要問專業領域的問題，可加入 role 以及使用 markdown 格式進行輸入

   ```jsx
   # role
   - IT teacher

   # context
   - 一步一步教我如何開發 LINE 聊天機器人
   ```
3. 詢問時要按部就班，如果遇到大型的問題要處理，要把大問題切成一個個小任務，GPT 才能精準的回覆（付費的 GPT-4 效果會好點）

   * 假如你遇到不知怎麼拆解的小問題，可以再丟給 chatGPT 請它拆（遞迴的概念）
4. 如果上下文過多，會導致 GPT 記憶負載，建議不同領域的問題要開啟新的對話進行詢問

除了基本的使用方式外，活動中還有其他的講座，介紹其它一些關於 ChatGPT 與 大型語言模型（LLM）的開發者應用，例如可以根據 changes 寫 git commit message 的 **[CodeGPT](https://github.com/appleboy/CodeGPT)** 、或是為使用者 prompt 進行加工優化、整合的工具 [\*\*Semantic Kernel](https://learn.microsoft.com/en-us/semantic-kernel/overview/)\*\* 、以及透過 **[LangChain](https://github.com/langchain-ai/langchain)** 和 **[Flowise](https://github.com/FlowiseAI/Flowise#flowise---build-llm-apps-easily)** 建立屬於自己的語言模型和應用，AI 在開發者工具中已是百花齊放的狀態了

## AI 輔助程式碼開發工具 - Copilot

另外一個在開發者之者非常熱門的工具 - [Copilot](https://github.com/features/copilot)，透過在 IDE （通常是 VSCode）中安裝擴充功能，讓它可以透過之前在大量程式碼訓練以及你的 codebase 學習並即時提供你開發輔助，例如透過註解內容生成程式碼，或是為你的程式碼除錯。或是以人類語義化的方式解釋程式碼運作。講者透過簡單 Vue2 專案做例子，實現了 Vue2 轉 Vue3，註解產出函式程式碼等技巧。

小弟當晚回去卡刷下去體驗摸索一輪後，可以感受到以後 Copilot 絕對是軟體開發者的必備工具，使用後絕對讓你的開發效率大大提升。

### 關於 AI 的議程

* [利用AI來增加你的開發效率吧！ by 林正祥](https://modernweb.tw/2023/session-page/2410)
* [langchain 起手式 by 段喬智](https://modernweb.tw/2023/session-page/2409)
* [生成式 AI CodeGPT 開發經驗談 by 吳柏毅](https://modernweb.tw/2023/session-page/2428)
* [《運用Semantic Kernel SDK 駕馭生成式AI應用的提示工程(Prompt Engineering)》 by 陳葵懋](https://modernweb.tw/2023/session-page/2413)
* [詠唱(prompt)協同程式開發工作坊 by 林建宏](https://modernweb.tw/2023/workshop-page/2442)

# 次要關鍵字：WebAssembly

在 AI 一時無兩的風頭下，默默有另一個關鍵字冒出頭來，它是 **[WebAssembly](https://webassembly.org/)**。WebAssembly (WASM) 技術是透過建立一個可以通用格式的二進制的指令集，讓其在任何網頁瀏覽器上執行，因此你可以使用任何效能更好的程式語言進行開發，最後生成的二進制指令集更可以與 JavaScript 互相溝通，實現漸進式的更新。

這次的活動中，就有數場關於 WASM 內容講座。比如使用 Rust 語言製作一個讓瀏覽器可以壓縮圖片的 WASM，也有講者介者一個使用 C# 開發並運用 WASM 技術新前端框架 **[Blazor](https://learn.microsoft.com/zh-tw/aspnet/core/blazor/?view=aspnetcore-7.0)**，足見 WASM 在網站開發上的潛力，並且也可以預見往後更多不同語語透過 WASM 踄足前端開發的情況發生。

這項技術出現之初，許多開發者表示 JavaScript 已死，因為以往網頁前端語言被侷限在 JavaScript 的限制被打開，任何效能更好的程式語言將會取而代之；實際上我認為這條件路還很久，一是 JavaScript 仍然具有操作 DOM 的優勢，以及龐大前端開發生態圈，而且最重要的一點是，JavaScript 自己也可以編譯成 WASM 執行，所以我認為這個擔心還早。而且與其擔心語言被取代，倒不如增進自己的開發概念與知識來迎接挑戰吧（拿著公司給的票的我內心OS）。

### 關於 WebAssembly 的議程

* [以Rust為湯頭的軟體系統開發實踐 by 徐紹銘 (三米克)](https://modernweb.tw/2023/workshop-page/2443)
* [Blazor寫一次就討好Web＆App開發](https://modernweb.tw/2023/session-page/2420)

# 後記 & 其他高手們

除了以上兩個關鍵字外，活動中當然還有囊括前後端、DevOps、UIUX、PM、工程師的自我修養等主題分享；另外也有活動金主爸爸的工商時間、豐盛的午餐便當、沁爽冰涼的 18 天啤酒吧，礙於篇幅實在無法把活動都講完。

對於久未參與這個盛會的我，這次參與的收穫實在太多了，也謝謝我司 [Shopline](https://shopline.tw/?utm_source=google&utm_medium=cpc&utm_campaign=B:Trial:leads:Shopline_2&utm_content=B:shopline_2&gad_source=1&gclid=EAIaIQobChMInoqurrHGggMVzHWLCh2_YA-EEAAYASAAEgLWpvD_BwE) 讓我有機會參與，希望明年也有機會拿到公關票嘻。

### 資料來源

* <https://github.com/features/copilot>
* <https://developer.mozilla.org/zh-TW/docs/WebAssembly>
* <https://modernweb.tw/>