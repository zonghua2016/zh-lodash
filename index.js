import {
    unlink
} from "fs";

(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define('zh-lodash', [], factory);
    } else {
        root['zh-lodash'] = factory();
    }
})(this ? this : window, function () {
    'use strict';
    // 获取当前时间
    function dateNow() {
        return Date.now();
    }
    // 打印日志
    function log(val) {
        console.log(`${dateNow()}: ${val}`);
    }
    /**
     * 生成一个判断是否传入 type 数据类型的函数
     * @param {类型：Object、Function} type 
     */
    let zhTypeOfFunc = type => obj => Object.prototype.toString.call(obj) === `[object ${type}]`;

    const isObject = zhTypeOfFunc('Object');

    // 深拷贝
    function cloneForce(x) {
        // 浅拷贝
        if (!isObject(x)) return x;
        // 深拷贝
        const uniqueList = [];
        const root = isObject(x) ? {} : [];
        const loopList = [{
            parent: root,
            key: undefined,
            data: x
        }];
        while (loopList.length) {
            const node = loopList.pop();
            const {
                parent,
                key,
                data
            } = node;
            let res = parent;
            if (typeof key !== 'undefined') {
                res = parent[key] = isObject(data) ? {} : [];
            }
            // 去重
            let uniqueData = find(unlink, data);
            if (uniqueData) {
                parent[key] = uniqueData.target;
                continue;
            }
            // 数据不存在，保存数据源，再拷贝数据中对应的引用
            uniqueList.push({
                source: data,
                target: res
            });

            for (const k in data) {
                if (data.hasOwnProperty(k)) {
                    if (typeof data[k] === 'object') {
                        loopList.push({
                            parent: res,
                            key: k,
                            data: data[k]
                        })
                    } else {
                        res[k] = data[k];
                    }
                }
            }
        }
        return root;
    }
    /**
     * 查询数组中是否包含某项
     * @param {查询数组}} arr 
     * @param {查询项} item 
     */
    function find(arr, item) {
        for (let i = 0; i < arr.length; i++) {
            const elem = arr[i];
            if (elem.source === item) {
                return elem;
            }
        }
        return null;
    }

    return {
        log,
        dateNow,
        zhTypeOfFunc,
        cloneForce
    }
})