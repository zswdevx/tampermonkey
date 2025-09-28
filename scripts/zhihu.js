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
    const side = document.querySelectorAll('.Topstory-container > div')[1]
    const container = document.querySelector('.Topstory-container')
    const shares = document.querySelectorAll('.Popover.ShareMenu')
    const titles = document.querySelectorAll('.ContentItem-title')
    const btns = document.querySelectorAll('.Button.VoteButton')
    if (el) {
      el.style.display = 'none'
    }
    if (side) {
      side.style.display = 'none'
    }
    if (container) {
      container.style.width = '694px'
    }
    if (shares) {
      shares.forEach(item => {
        item.style.display = 'none'
      })
    }
    if (titles) {
      titles.forEach(item => {
        item.style.fontSize = '14px'
        item.style.fontWeight = 500
      })
    }
    if (btns) {
      btns.forEach(item => {
        item.style.background = 'none'
        item.style.color = 'initial'
      })
    }
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
