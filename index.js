
var superagent = require('superagent');
var charset = require('superagent-charset');
charset(superagent);
var cheerio = require('cheerio');

const baseUrl = "https://www.qqtn.com/"
let route = "tx/weixintx_1.html"

function getData() {
    return new Promise(function (resolve, reject) {
        superagent.get(baseUrl + route).charset('gb2312').end(function (err, res) {
            var items = [];
            if (err) {
                console.log(err);
                return;
            }
            var $ = cheerio.load(res.text);
            $('div.g-main-bg ul.g-gxlist-imgbox li a').each(function (idx, element) {
                var $element = $(element);
                var $subElement = $element.find('img');
                var thumbImgSrc = $subElement.attr('src');
                items.push({
                    title: $(element).attr('title'),
                    href: $element.attr('href'),
                    thumbSrc: thumbImgSrc
                });
            });
            resolve(items)
        });
    })
}

getData().then(function (res) {
    console.log(res);
})