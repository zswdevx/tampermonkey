// ==UserScript==
// @name         V2EX
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  V2EX 页面内的链接替换为 global.v2ex.co 和 cdn.v2ex.co
// @author       zsw
// @match        https://www.sov2ex.com/?q=*
// @match        https://global.v2ex.co/t/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sov2ex.com
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  /**
   * 替换所有 a 标签 href
   * 替换所有 img 标签 src
   */
  function replaceV2exLinks(root = document) {
    const links = root.querySelectorAll('a[href^="https://www.v2ex.com"]')
    links.forEach(link => {
      link.href = link.href.replace('https://www.v2ex.com', 'https://global.v2ex.co')
    })
    // 替换 img 标签 src
    const images = root.querySelectorAll('img[src^="https://cdn.v2ex.com"]')
    images.forEach(img => {
      img.src = img.src.replace('https://cdn.v2ex.com', 'https://cdn.v2ex.co')
    })
  }

  // 初始替换
  replaceV2exLinks()

  // 监听 DOM 变化
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          if (node.matches && node.matches('a[href^="https://www.v2ex.com"]')) {
            node.href = node.href.replace('https://www.v2ex.com', 'https://global.v2ex.co')
          }
          // 新增：处理 img 节点本身
          if (node.matches && node.matches('img[src^="https://cdn.v2ex.com"]')) {
            node.src = node.src.replace('https://cdn.v2ex.com', 'https://cdn.v2ex.co')
          }
          // 递归处理子节点
          replaceV2exLinks(node)
        }
      })
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })
})()
