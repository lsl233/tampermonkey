(function () {
    'use strict'
    
    function request(url, options) {
        options = Object.assign({}, {
            method: 'GET',
            onload(res) {
                return JSON.parse(res.responseText)
            },
            onerror(e) {
                return e
            },
        }, options)
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                url,
                ...options,
                onload: (e) => resolve(options.onload(e)),
                error: (e) => reject(options.onerror(e))
            })
        })
    }

    request.get = (url, options = {}) => {
        options.method = 'GET'
        return request(url, options)
    }

    request.post = (url, options = {}) => {
        options.method = 'POST'
        return request(url, options)
    }


    window.t = {
        request
    }

})();