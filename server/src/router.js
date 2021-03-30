const express = require('express');
const fetch = require('node-fetch');

const parser = require('./parserMiddleware/newsParser');
const formatter = require('./parserMiddleware/formatter');
const apiError = require('./errorMiddeware/ApiError');

const router = express.Router();

const lentaURL = 'https://lenta.ru/rss/news';
const mosURL = 'https://www.mos.ru/rss';

function fetchNews(sourceURL) {
  return fetch(sourceURL)
    .then((raw) => raw.text());
}

function searcHandler(news, searchText) {
  if (!searchText) return news;
  if (!searchText.length) return news;

  const lowerCaseSearchText = searchText.toLowerCase();
  let res = [];

  if (news.title && news.description) {
    res = news.filter((oneNews) => oneNews.title.toLowerCase().includes(lowerCaseSearchText)
  || oneNews.description.toLowerCase().includes(lowerCaseSearchText));
  } else if (!news.description) {
    res = news.filter((oneNews) => oneNews.title.toLowerCase().includes(lowerCaseSearchText));
  }

  return res;
}

function getNewsOnPage(news, page, newsPerPage) {
  if (news) {
    const index = (page - 1) * newsPerPage;
    return news.slice(index, index + newsPerPage);
  }
  return [];
}

router.post('/news', (req, res, next) => {
  if (req.body) {
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

      const filteredNews = searcHandler(news, options.searchText);
      const pages = Math.ceil(filteredNews.length / options.newsPerPage);
      news = getNewsOnPage(filteredNews, options.page, options.newsPerPage);

      res.send({
        data: news,
        pages,
      });
    })();
  } else {
    next(apiError(404, 'request body is empty'));
  }
});

module.exports = router;
