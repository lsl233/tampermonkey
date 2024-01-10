// ==UserScript==
// @name         uway 详情 git
// @namespace    http://tampermonkey.net/
// @version      2024-01-10
// @description  try to take over the world!
// @author       You
// @match        http://uway.youedata.com/uway/issues/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youedata.com
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==

;(function () {
    'use strict'

    GM_addStyle(`
        #sidebar {
            width: 8%;
        }

        #content {
            width: 90%;
        }

    `)

    const issueStatusChangeSidebarDOM = document.querySelector('.issue-status-change-sidebar')
    const title = document.querySelector('#content h2').innerText
    const issuesID = title.split('#')[1]
    const subject = document.querySelector('#TitleInput input').value

    function appendBtn (txt, handler) {
        const li = document.createElement('li')
        li.innerHTML = `
        <a class="status-switch status-15"><span aria-hidden="true" class="far fa-caret-square-left"></span> git-${txt}</a>
        `
        li.onclick = handler
        issueStatusChangeSidebarDOM.appendChild(li)
    }

    appendBtn('进行中', () => {
        GM_setClipboard(`:construction: #${issuesID} ${subject}`)
    })

    if (title.indexOf('需求卡') > -1) {
        appendBtn('完成', () => {
            GM_setClipboard(`:sparkles: ${issuesID} ${subject}`)
        })
    }
    if (title.indexOf('缺陷') > -1) {

        appendBtn('完成', () => {
            GM_setClipboard(`:bug: ${issuesID} ${subject}`)
        })
    }

}());
