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
    let img = '';
    if (news[i].enclosure) {
      if (Array.isArray(news[i].enclosure)) {
        img = news[i].enclosure[0].url;
      } else {
        img = news[i].enclosure.url;
      }
    }

    const formatNews = {
      link: news[i].link.$t,
      title: news[i].title.$t,
      description: news[i].description.$t,
      image: img,
      date: new Date(news[i].pubDate.$t),
      source: 'www.mos.ru',
    };
    formattedArray.push(formatNews);
  }
  return formattedArray;
}

function format(news, source) {
  if (news) {
    switch (source) {
      case 'lenta':
        return FormatNewsFromLenta(news);
      case 'mos':
        return FormatNewsFromMos(news);
      default:
        return [];
    }
  } else return [];
}

module.exports.format = format;
