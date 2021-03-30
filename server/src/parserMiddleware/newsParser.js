const parser = require('xml2json');

function Parse(news) {
  const jsonNews = JSON.parse(parser.toJson(news, { reversible: true }));
  return jsonNews.rss.channel.item;
}

module.exports.parseXmlToJson = Parse;
