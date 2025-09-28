// ==UserScript==
// @name         掘金内容屏蔽
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  屏蔽掘金沸点中刷经验、理财交流圈、以及AI机器人相关内容
// @author       zsw
// @match        https://juejin.cn/*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  // 更宽松的正则，允许exp和+、数字之间有空格
  // 例如：exp + 8, 经验+8
  const EXP_REGEX = /(exp|经验)\s*\+\s*\d+/i

  // 屏蔽条件数组，每个条件是函数，参数为 item，返回 true 表示需要屏蔽
  const blockRules = [
    // 理财交流圈
    item => {
      const circlePins = item.querySelector('.pin-club-box')
      return circlePins && circlePins.textContent.trim() === '理财交流圈'
    },
    // 刷经验
    item => {
      const contentSpan = item.querySelector('.content')
      return contentSpan && EXP_REGEX.test(contentSpan.textContent)
    },
    // 以 @ 开头的AI机器人
    item => {
      const contentSpan = item.querySelector('.content')
      const robotSpan = item.querySelector('span[data-node="robot"]')
      return contentSpan && contentSpan.textContent.startsWith(' @') && robotSpan
    },
    // 新增条件可直接在此添加
  ]

  function hideBlockedItems() {
    const pinItems = document.querySelectorAll('li.item.shadow')
    pinItems.forEach(item => {
      for (const rule of blockRules) {
        if (rule(item)) {
          item.style.display = 'none'
          return
        }
      }
    })
  }

  hideBlockedItems()

  const observer = new MutationObserver(hideBlockedItems)
  observer.observe(document.body, { childList: true, subtree: true })
})()
