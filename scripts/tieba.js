// ==UserScript==
// @name         贴吧自动关闭弹窗
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  自动关闭贴吧中的弹窗（通过.close-btn元素）
// @author       zsw
// @match        *://*.tieba.baidu.com/*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  console.log('贴吧自动关闭弹窗脚本已加载')

  // 关闭弹窗函数
  function closePopups() {
    try {
      const closeButtons = document.querySelectorAll('.close-btn')
      if (closeButtons.length > 0) {
        console.log(`找到 ${closeButtons.length} 个弹窗，尝试关闭...`)
        closeButtons.forEach(btn => {
          btn.click()
          console.log('已点击关闭按钮')
        })
      }
    } catch (e) {
      console.error('关闭弹窗时出错:', e)
    }
  }

  // 页面加载完成后执行关闭
  window.addEventListener('load', function () {
    closePopups()
  })

  // 立即尝试关闭一次
  closePopups()

  // 使用MutationObserver监听DOM变化
  const observer = new MutationObserver(function (mutations) {
    // 当DOM发生变化时，检查并关闭弹窗
    closePopups()
  })

  // 开始观察document.body的变化，包括子节点和属性
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
})()
