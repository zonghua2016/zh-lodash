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
    /**
     * 获取当前时间
     */
    function dateNow() {
        return Date.now();
    }

    /**
     * 打印日志
     * @param { String } val 日志内容
     */
    function log(val) {
        console.info(`${dateNow()}: ${val}`);
    }

    /**
     * 生成一个判断是否传入 type 数据类型的函数
     * @param {Object、Function} type 类型
     */
    let zhtypeof = type => obj => Object.prototype.toString.call(obj) === `[object ${type}]`;

    const isObject = zhtypeof('Object');

    /**
     * 根据范围生成随机数
     * @param { Number } min 最小值
     * @param { Number } max 最大值
     */
    function random(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    /**
     * 深拷贝
     * @param { Object } x 拷贝对象
     */
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
     * @param { Array } arr 查询数组
     * @param { String | Number ... } item 查询项
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
    /**
     * 给传入值补充字符到 len 长度
     * @param { Number | String } n 传入值
     * @param { Number } len 需要返回字符串的总长度
     * @param { Number | String } ch 填充的字符，默认 0
     * @param { String } dir 调用补充字符的方法，默认 '' (即 padStart)；(dir = 'l')：padStart (dir = 'r'):padEnd; 
     */
    function charPad(n, len, ch = 0, dir = '') {
        switch (dir) {
            case 'l':
                dir = 'left'
                break;
            case 'r':
                dir = 'right'
                break;
            default:
                dir = 'left';
                break;
        }
        let padFunc = dir === 'left' ? 'padStart' : 'padEnd';
        return (String(n))[padFunc](len, ch);
    }
    return {
        log,
        dateNow,
        zhTypeOfFunc,
        cloneForce,
        random,
        charPad
    }
})