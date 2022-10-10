---
id: 2022-10-10
slug: /2022/10/10/raycast
title: Raycast — Mac 提升工作效率的啟動工具
date: 2022-10-10T09:56:19.758Z
description: Mac 的使用者，應該對 Spotlight 這個系統預設的啟動工具不陌生，Command + 空白鍵
  的快速搜尋工具，讓使用者可以快速找到電腦中的檔案、應用程式，也可以做簡單的數學運算、貨幣轉換等，非常的方便。但啟動工具能否有更進一步呢？有的，答案是Raycast。
tags:
  - raycast
  - toolRecommend
  - productivity
headerImage: ../../static/assets/raycast-01.png
templateKey: blog-post
publish: true
---
Mac 的使用者，應該對 Spotlight 這個系統預設的啟動工具不陌生，Command + 空白鍵 的快速搜尋工具，讓使用者可以快速找到電腦中的檔案、應用程式，也可以做簡單的數學運算、貨幣轉換等，非常的方便。但啟動工具能否有更進一步呢？有的，答案是 [Raycast](https://www.raycast.com/) 。

Raycast 作為啟動工具，可以完美取代 Mac 原生的 Spotlight，幾乎所有 Spotlight 能做的事，他都能做，舉凡檔案搜尋、執行捷徑等，都難不到它；而它比 Spotlight 優勝的地方，是它具有以下的幾個功能/特色：

## 1. 實用的輔助工具

1. Quicklinks：透過 Quicklinks 可以建立類似 chrome 書籤的連結；更進一步的，Quicklinks 可以留空關鍵字延後填入，最多可留空三個空位。比如我在工作上要前往不同測試機，就可以留空測試機的號碼。
    
    ![留空 port 前往指定 port 的 localhost 頁面](/assets/raycast-01.gif)
    
2. Snippets：和 Mac 自己的快速輸入非常類似，記錄一些常用的文字片段，更進一步的，Snippets 可以傳入額外的內容，比如當前日期、鼠標位置、剪貼簿內容等進階應用。
    
    ![快速鍵入，並將鼠標移至指定位置](/assets/raycast-02.gif)
    
3. Commands：Raycast 提供的快速指令功能，像是配置視窗的 window management，調整音量等等實用的指令；如果你是一位開發者，還可以建立屬於自己的 Commands。
    
    ![預設視窗最大化指令](/assets/raycast-03.gif)
    

## 2. 團隊分享資源

如果你們是一個團隊，Raycast 提供團隊的共享功能（有限額度內免費），以上的工具都可以在團隊中共用，非常方便。

假如你有多台電腦想要同步環境，使用團隊來存放資源也是一個好方法。

## 3. 不斷增加的 extension

Raycast 對 extension 有很大的擴充性，對常用的商業軟體都有對應的 extension 可供安裝，比如：Slack、Jira、Github 等，可以快速搜尋 repo 、issue、對話等，對提升工作效率有很大的幫助。

假設你是一名開發者，[Raycast API](https://developers.raycast.com/) 的提供 extension 開發 API，其使用 React 與 TypeScript 作為 tech stack，前端開發者能夠快速上手，開發屬於自己的 extension / command。

## 總結

這個工具起初是我的好同事推薦，不試不知道，一試嚇一跳，作為一名前端開發者，以往常常使用一些 cli (command line tool) 工具提升自己的開發效率，但 cli 有其 UI/UX 的限制，比起 cli，Raycast 上開發的 extension 有一個統一、好看且實用的 UI/UX，對非軟體開發人員的接受度也更高，而我在使用 Raycast 後，對工作的效率提升非常有感，在此推薦大家使用看看。