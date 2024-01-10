// chrome-extension://dhdgffkkebhmkfjojejmpbldmpobfkfo/options.html#nav=b9522ed3-f65d-437f-b896-4908e158345a+editor


(function () {
    'use strict'

    const localhost =' http://127.0.0.1'
    const testhost = 'http://172.16.24.41'

    function setInputValue (el, val) {
        el.value = val
        el.dispatchEvent(new Event('input'))
    }

    function monitorNode(condition, callback) {
        const observer = new MutationObserver(() => {
            if (condition()) {
                callback()
                observer.disconnect()
            }
        })
        observer.observe(document.body, { attributes: true, childList: true, subtree: true })
    }

    function autoLogin() {
        const signBtn = document.getElementsByClassName('sign-in')[0]
        setInputValue(document.getElementsByClassName('inp-login')[0], 'lishilei')
        setInputValue(document.getElementsByClassName('inp-login')[1], 'DataOS123456')
        signBtn.removeAttribute('disabled')
        signBtn.click()
    }
    
    function openDataDirServer () {
        const dataOSDesktopTokenJsonString = localStorage.getItem('DataOSDesktopTokenJson')
        if (!dataOSDesktopTokenJsonString) return false
        const d = JSON.parse(dataOSDesktopTokenJsonString)
        
        const urls = [
            { name: '动态分析-dev', url: `${localhost}:5173/#/welcome?accountToken=${d.accessToken}&accountId=${d.accountId}` },
            { name: '投诉与举报-dev', url: `${localhost}:7806/#/welcome?accountToken=${d.accessToken}&accountId=${d.accountId}` },
            { name: '投诉与举报-test', url: `http://172.16.24.41:9981/#/welcome?accountToken=${d.accessToken}&accountId=${d.accountId}` },
            { name: '数据资源目录-dev', url: `http://localhost:8080/api/dataOslogin/validate?accountToken=${d.accessToken}` },
            { name: '数据资源目录-test', url: `http://192.168.100.24:8080/#/welcome?accountToken=${d.accessToken}&accountId=${d.accountId}` },
            { name: '数据资源目录前后分离-dev', url: `http://localhost:7807/#/welcome?accountToken=${d.accessToken}&accountId=${d.accountId}` },
            { name: '数据资源目录前后分离-test', url: `http://172.16.24.41:338179/#/welcome?accountToken=${d.accessToken}&accountId=${d.accountId}` },
            { name: '统一认证系统-test', url: `http://172.16.24.41:28184/#/welcome?accountToken=${d.accessToken}&accountId=${d.accountId}` },
            { name: '统一认证系统-dev', url: `http://localhost:8084/#/welcome?accountToken=${d.accessToken}&accountId=${d.accountId}` },
            { name: '统一认证系统-用户页面', url: `http://localhost:8084/#/user?accountToken=${d.accessToken}&accountId=${d.accountId}` },
            { name: '共享接口管理', url: `http://localhost:8000/#/welcome?accountToken=${d.accessToken}&accountId=${d.accountId}` },
            { name: '共享交换管理-dev', url: `${localhost}:7805/#/welcome?accountToken=${d.accessToken}&accountId=${d.accountId}` },
            { name: '共享交换管理-test', url: `http://172.16.25.113:29093/#/welcome?accountToken=${d.accessToken}&accountId=${d.accountId}` },
        ]
        // http://172.16.25.113:29093/
        const defaultURL = urls[2]
        
        console.log(`/#/welcome?accountToken=${d.accessToken}&accountId=${d.accountId}`)

        for (const item of urls) {
            console.log(item.name, item.url)
        }

        GM_setClipboard(defaultURL.url)
        // window.open(defaultURL.url, '__banck')

        insertDevOperate(urls)
        return true
    }

    function insertDevOperate(data) {
        const css = `
            .dev-operate {
                position: fixed;
                bottom: 10px;
                right: 10px;
                padding: 8px;
                z-index: 9999;
                background-color: #fff;
                box-shadow: 0 1px 4px rgba(0,0,0,.3), 0px 0 20px rgba(0,0,0,.1) inset;
            }

            .dev-operate > .row {
                display: flex;
                align-item: top;
                padding: 8px 12px;
                border-bottom: 1px solid rgba(56,61,66,.1);
            }

            .dev-operate > .row:last-child {
                border-bottom: none;
            }

            .dev-operate > .row > .rank-1 {
                width: 200px;
            }
            .dev-operate > .row > .rank-2 {
                width: 60px;
                text-align: center;
            }

            .go {
                display: block;
                width: 100%;
                height: 100%;
            }
        `
        const html = data.map(item => `<div class="row"><div class="rank-1">${item.name}</div><div class="rank-2"><a class="go" href="${item.url}" target="__blank">go</a></div></div>`).join('')
        const box = document.createElement('div')
        box.setAttribute('id', 'devOperate')
        box.setAttribute('class', 'dev-operate')
        box.innerHTML = html
        GM_addStyle(css)
        document.body.append(box)
    }

    
    if (!openDataDirServer()) {
        monitorNode(() => document.getElementsByClassName('inp-login').length, () => {
            // autoLogin()
            monitorNode(() => !document.getElementsByClassName('inp-login').length, openDataDirServer)
        })
    }

    
})();

