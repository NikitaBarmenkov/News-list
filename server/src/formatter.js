function FormatNewsFromLenta(news) {
  const formattedArray = [];
  for (let i = 0; i < news.length; i += 1) {
    const formatNews = {
      link: news[i].guid.$t,
      title: news[i].title.$t,
      description: news[i].description.$t,
      image: news[i].enclosure.url,
      date: new Date(news[i].pubDate.$t),
      source: 'www.lenta.ru',
    };
    formattedArray.push(formatNews);
  }
  return formattedArray;
}

function FormatNewsFromMos(news) {
  const formattedArray = [];
  for (let i = 0; i < news.length; i += 1) {
    // handle multiple images
    let img = '';
    /* if (Array.isArray(news[i].enclosure)) {
      img = news[i].enclosure[0].url;
    } else img = news[i].enclosure.url; */

    const formatNews = {
      link: news[i].link.$t,
      title: news[i].title.$t,
      description: news[i].description.$t,
      image: '',
      date: new Date(news[i].pubDate.$t),
      source: 'www.mos.ru',
    };
    formattedArray.push(formatNews);
  }
  return formattedArray;
}

function format(news, source) {
  switch (source) {
    case 'lenta':
      return FormatNewsFromLenta(news);
    case 'mos':
      return FormatNewsFromMos(news);
    default:
      return [1, 2];
  }
}

module.exports.format = format;
