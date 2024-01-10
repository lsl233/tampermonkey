;(async function () {
    'use strict'

    async function getAPIDocs() {
        return t.request.get('/v2/api-docs')
    }


    GM_addStyle(`
        .opblock {
            position: relative;
        }
        .copy-btn {
            position: absolute;
            right: -70px;
            top: 0;
        }
    `)

    function monitorNode(query, callback) {
        const observer = new MutationObserver(() => {
            const result = document.querySelectorAll(query)
            if (result.length) {
                callback(result)
                // debugger
                observer.disconnect()
            }
        })
        observer.observe(document.body, { attributes: true, childList: false, subtree: true })
    }


    monitorNode('.opblock-tag-section', nodes => {
        console.log(nodes)
        for (const category of nodes) {
            category.addEventListener('click', handleClickTagSection, false)
        }
        // const items = node.querySelectorAll('.opblock')
        // for (const item of items) {
        //     // debugger
        //     if (item.getElementsByClassName('copy-btn').length) continue
        //     const btn = document.createElement('button')
        //     btn.setAttribute('clsss', 'copy-btn')
        //     btn.innerText = '复制'
        //     item.append(btn)
        // }
    })


    function handleClickTagSection(e) {
        const element = e.currentTarget
        setTimeout(() => {
            const items = element.querySelectorAll('.opblock')
            for (const item of items) {
                // debugger
                if (item.getElementsByClassName('copy-btn').length) continue
                const btn = document.createElement('button')
                btn.setAttribute('class', 'copy-btn')
                btn.innerText = '复制'
                btn.addEventListener('click', () => handleCopy(item), false)
                item.append(btn)
            }
        }, 0);
    }

    function handleCopy(element) {
        const method = element.querySelector('.opblock-summary-method').innerText
        let path = element.querySelector('.opblock-summary-path').innerText
        const description = element.querySelector('.opblock-summary-description').innerText
        let funcName = path.split('/')[path.split('/').length - 1]

        if (path.split('{').length > 1) {
            funcName = path.split('/')[path.split('/').length - 2]
            const match = path.match('\\{(.+?)\\}')
            const key = match[1]
            path = path.replace(/\{(\w*[:]*[=]*\w+)\}(?!})/g, () => {
                return `\$\{${key}\}`
            })

            GM_setClipboard(`// ${description}
                    export const ${funcName} = ${key} => axios({
                        url: \`${path}\`,
                        method: '${method}',
                    })
                `)
            return
        }

        if (method === 'POST') {
            GM_setClipboard(`// ${description}
                export const ${funcName} = data => axios({
                    url: '${path}',
                    method: '${method}',
                    data
                })
                `)
            return
        }


        GM_setClipboard(`// ${description}
                export const ${funcName} = params => axios({
                    url: '${path}',
                    method: '${method}',
                    params
                })
            `)

    }



})();