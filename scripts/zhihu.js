// ==UserScript==
// @name         知乎优化
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  知乎页面优化
// @author       zsw
// @match        https://www.zhihu.com/question/*
// @match        https://www.zhihu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhihu.com
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  const hideTitleAndCloseModal = () => {
    const el = document.querySelector('.QuestionHeader-title')
    const titles = document.querySelectorAll('.ContentItem-title')
    if (el) {
      el.style.display = 'none'
    }
    titles.forEach(item => {
      item.style.fontSize = '14px !important'
      item.style.fontWeight = '600 !important'
    })
  }

  const tryCloseModal = () => {
    const closeBtn = document.querySelector('.Button.Modal-closeButton.Button--plain')
    if (closeBtn) {
      closeBtn.click()
    }
  }

  const init = () => {
    hideTitleAndCloseModal()
    tryCloseModal()
  }
  window.addEventListener('load', function () {
    init()
  })

  init()

  const observer = new MutationObserver(init)

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
})()
