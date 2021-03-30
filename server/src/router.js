const express = require('express');
const fetch = require('node-fetch');

const parser = require('./newsParser');
const formatter = require('./formatter');

const router = express.Router();

const lentaURL = 'https://lenta.ru/rss/news';
const mosURL = 'https://www.mos.ru/rss';

function fetchNews(sourceURL) {
  return fetch(sourceURL)
    .then((raw) => raw.text());
}

function SearcHandler(news, searchText) {
  if (!searchText.length) {
    return news;
  }
  const lowerCaseSearchText = searchText.toLowerCase();
  const res = news.filter((oneNews) => oneNews.title.toLowerCase().includes(lowerCaseSearchText)
  || oneNews.description.toLowerCase().includes(lowerCaseSearchText));
  return res;
}

function getNewsOnPage(news, page, newsPerPage) {
  if (news) {
    const index = (page - 1) * newsPerPage;
    return news.slice(index, index + newsPerPage);
  }
  return [];
}

router.post('/news', (req, res) => {
  (async () => {
    const options = {
      source: req.body.source,
      searchText: req.body.searchText,
      page: req.body.page,
      newsPerPage: req.body.newsPerPage,
    };

    let news = [];
    let newsRaw = [];
    let jsonNews = [];

    let lentaNewsRaw = [];
    let mosNewsRaw = [];
    let jsonLentaNews = [];
    let jsonMosNews = [];
    let lentaNews = [];
    let mosNews = [];

    switch (options.source) {
      case 'all':
        lentaNewsRaw = await fetchNews(lentaURL);
        jsonLentaNews = parser.parseXmlToJson(lentaNewsRaw);
        lentaNews = formatter.format(jsonLentaNews, 'lenta');

        mosNewsRaw = await fetchNews(mosURL);
        jsonMosNews = parser.parseXmlToJson(mosNewsRaw);
        mosNews = formatter.format(jsonMosNews, 'mos');

        news = lentaNews.concat(mosNews);
        break;
      case 'lenta':
        newsRaw = await fetchNews(lentaURL);
        jsonNews = parser.parseXmlToJson(newsRaw);
        news = formatter.format(jsonNews, 'lenta');
        break;
      case 'mos':
        newsRaw = await fetchNews(mosURL);
        jsonNews = parser.parseXmlToJson(newsRaw);
        news = formatter.format(jsonNews, 'mos');
        break;
      default:
    }

    const filteredNews = SearcHandler(news, options.searchText);
    const pages = Math.ceil(filteredNews.length / options.newsPerPage);
    news = getNewsOnPage(filteredNews, options.page, options.newsPerPage);

    res.send({
      data: news,
      pages,
    });
  })();
});

module.exports = router;
