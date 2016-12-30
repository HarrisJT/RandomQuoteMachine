let currentQuote = 'A people that values its privileges above its principles soon loses both.';
let currentAuthor = 'Dwight D. Eisenhower';
const quoteElement = document.querySelector('.quote-box__quote');
const authorElement = document.querySelector('.quote-box__author');
const newQuoteElement = document.querySelector('.button-group__new-quote');
const twitterElement = document.querySelector('.button-group__twitter');
const tumblrElement = document.querySelector('.button-group__tumblr');
const googleElement = document.querySelector('.button-group__google');

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

function openURL(url, width, height) {
  window.open(url, 'Share', `width=${width}, height=${height}, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0`);
}

function getQuote() {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=', true);
  request.setRequestHeader('X-Mashape-Key', 'OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V');
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      const resp = JSON.parse(this.response);
      currentQuote = resp.quote;
      currentAuthor = resp.author;
      quoteElement.textContent = `${currentQuote}`;
      authorElement.textContent = `-${currentAuthor}`;
    } else {
      quoteElement.textContent = `${currentQuote}`;
      authorElement.textContent = `-${currentAuthor}`;
    }
  };

  request.onerror = function () {
    quoteElement.textContent = `${currentQuote}`;
    authorElement.textContent = `-${currentAuthor}`;
  };

  request.send();
}

newQuoteElement.addEventListener('click', getQuote);

document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    getQuote();
  }
};

twitterElement.addEventListener('click', function () {
  if (!inIframe()) {
    openURL('https://twitter.com/intent/tweet?hashtags=quotes&text='
        + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor), 640, 300);
  }
});

tumblrElement.addEventListener('click', function () {
  if (!inIframe()) {
    openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=' + encodeURIComponent(currentAuthor) + '&content=' + encodeURIComponent(currentQuote) + '&canonicalUrl=' + encodeURIComponent(window.location.href), 640, 600);
  }
});

googleElement.addEventListener('click', function () {
  if (!inIframe()) {
    openURL('https://www.google.com/#q=' + encodeURIComponent(currentQuote), 1000, 800);
  }
});
