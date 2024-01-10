(function () {
    'use strict'
    
    function clearRawData(txt) {
        return `{${txt.replace(/\ +/g, "").replace(/[\r\n]/g, "")}}`
    }

    function checkJS(txt) {
        return txt
    }

    function insertDOM() {
        const css = `
            .box {
                position: fixed;
                top: 200px;
                right: 20px;
                z-index: 999;
            }

            .txt {
                height: 200px;
                border-radius: 0;
                border: 1px solid var(--workbench-theme-toolbar-border-without-drawer, transparent);
                background-color: var(--workbench-theme-toolbar-background, #f9fafb);
            }

            .export {
                display: inline-block;
                vertical-align: top;
                width: 56px;
                height: 28px;
                font-size: 12px;
                line-height: 1;
                text-align: center;
                color: #fff;
                border: 0;
                border-radius: 4px;
                font-weight: 500;
                padding: 0;
                cursor: default;
                background: var(--accent-default,#1e6fff);
            }
        `

        const html = `
            <textarea id="txt" class="txt"></textarea>
            <button id="export" class="export">导出</button>
        
        `

        const el = document.createElement('div')
        el.setAttribute('id', 'box')
        el.setAttribute('class', 'box')
        el.innerHTML = html
        GM_addStyle(css)
        document.body.append(el)
    }

    insertDOM()

    document.getElementById('export').onclick = function () {
        const value = document.getElementById('txt').value
        checkJS(clearRawData(value))
    }
})();