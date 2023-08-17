/*
  jQuery codes for smooth scrolling. The following code is from
  https://css-tricks.com/snippets/jquery/smooth-scrolling/
*/
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 700);
        return false;
      }
    }
  });
});

/* Auto UPDATE year */
document.getElementById("year").innerHTML = new Date().getFullYear();

/*  currency live */

$(function() {
  getMarketData();
  setInterval(getMarketData, 10000);
});

function getMarketData() {
  getCryptoCompare();
}

function getCryptoCompare() {
  $.when(
    $.get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,DOGE,XRP,SHIB&tsyms=USD")
  ).done(function (data) {
    $("#btcLogo").html('<img src="https://cryptocompare.com' + data.RAW.BTC.USD.IMAGEURL + '">');
    $("#btcSymbol").text((data.RAW.BTC.USD.FROMSYMBOL).toLocaleString());
    $("#btcPrice").text((data.RAW.BTC.USD.PRICE).toLocaleString("en-US", {style: "currency", currency: "USD"}));
    $("#btcChange").text((data.RAW.BTC.USD.CHANGEPCT24HOUR).toFixed(2) + "%");
    $("#btcVol").text((data.RAW.BTC.USD.VOLUME24HOUR).toLocaleString("en-US", {style: "currency", currency: "USD"}));
    $("#btcCap").text((data.RAW.BTC.USD.MKTCAP).toLocaleString("en-US", {style: "currency", currency: "USD"}));
    $("#btcTime").text( (new Date(data.RAW.BTC.USD.LASTUPDATE * 1000) ).toLocaleString());

    $("#ethLogo").html('<img src="https://cryptocompare.com' + data.RAW.ETH.USD.IMAGEURL + '">');
    $("#ethSymbol").text((data.RAW.ETH.USD.FROMSYMBOL).toLocaleString());
    $("#ethPrice").text((data.RAW.ETH.USD.PRICE).toLocaleString("en-US", {style: "currency", currency: "USD"}));
    $("#ethChange").text((data.RAW.ETH.USD.CHANGEPCT24HOUR).toFixed(2) + "%");
    $("#ethVol").text((data.RAW.ETH.USD.VOLUME24HOUR).toLocaleString("en-US", {style: "currency", currency: "USD"}));
    $("#ethCap").text((data.RAW.ETH.USD.MKTCAP).toLocaleString("en-US", {style: "currency", currency: "USD"}));
    $("#ethTime").text( (new Date(data.RAW.ETH.USD.LASTUPDATE * 1000) ).toLocaleString());
    
    $("#dogeLogo").html('<img src="https://cryptocompare.com' + data.RAW.DOGE.USD.IMAGEURL + '">'); 
    $("#dogeSymbol").text((data.RAW.DOGE.USD.FROMSYMBOL).toLocaleString());
    $("#dogePrice").text((data.RAW.DOGE.USD.PRICE).toLocaleString("en-US", {style: "currency", currency: "USD"}));
    $("#dogeChange").text((data.RAW.DOGE.USD.CHANGEPCT24HOUR).toFixed(2) + "%");
    $("#dogeVol").text((data.RAW.DOGE.USD.VOLUME24HOUR).toLocaleString("en-US", {style: "currency", currency: "USD"}));
    $("#dogeCap").text((data.RAW.DOGE.USD.MKTCAP).toLocaleString("en-US", {style: "currency", currency: "USD"}));
    $("#dogeTime").text( (new Date(data.RAW.DOGE.USD.LASTUPDATE * 1000) ).toLocaleString());
    
    $("#xrpLogo").html('<img src="https://cryptocompare.com' + data.RAW.XRP.USD.IMAGEURL + '">');    
    $("#xrpSymbol").text((data.RAW.XRP.USD.FROMSYMBOL).toLocaleString());
    $("#xrpPrice").text((data.RAW.XRP.USD.PRICE).toLocaleString("en-US", {style: "currency", currency: "USD"}));
    $("#xrpChange").text((data.RAW.XRP.USD.CHANGEPCT24HOUR).toFixed(2) + "%");
    $("#xrpVol").text((data.RAW.XRP.USD.VOLUME24HOUR).toLocaleString("en-US", {style: "currency", currency: "USD"}));
    $("#xrpCap").text((data.RAW.XRP.USD.MKTCAP).toLocaleString("en-US", {style: "currency", currency: "USD"}));
    $("#xrpTime").text( (new Date(data.RAW.XRP.USD.LASTUPDATE * 1000) ).toLocaleString());
    
    $("#shibLogo").html('<img src="https://cryptocompare.com' + data.RAW.SHIB.USD.IMAGEURL + '">');
    $("#shibSymbol").text((data.RAW.SHIB.USD.FROMSYMBOL).toLocaleString());
    $("#shibPrice").text("$" + (data.RAW.SHIB.USD.PRICE).toFixed(6));
    $("#shibChange").text((data.RAW.SHIB.USD.CHANGEPCT24HOUR).toFixed(2) + "%");
    $("#shibVol").text((data.RAW.SHIB.USD.VOLUME24HOUR).toLocaleString("en-US", {style: "currency", currency: "USD"}));
    $("#shibCap").text((data.RAW.SHIB.USD.MKTCAP).toLocaleString("en-US", {style: "currency", currency: "USD"}));
    $("#shibTime").text( (new Date(data.RAW.SHIB.USD.LASTUPDATE * 1000) ).toLocaleString());
  });
}



$("#btcChange, #ethChange, #dogeChange, #xrpChange, #shibChange").bind("DOMSubtreeModified", function(){
  if($(this).is(":contains('-')")) {
    $(this).removeClass("positive").addClass("negative");
  } else {
    $(this).removeClass("negative").addClass("positive");
  }
});

/* carousel */

(function () {
  'use strict';
  var options = ['far-left', 'left', 'center', 'right', 'far-right'];
  var cards = document.querySelectorAll('.carousel-card');
  addCardListeners();
  
  function addCardListeners () {
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      card.addEventListener('click', cardEventListener);
      
    }
  }
  
  function cardEventListener (e) {
    var parent = getParents(e.target, '.carousel-card')[0];
    var parentIndex = options.indexOf(parent.id);
    
    cards.forEach(function(card) {
      var index = options.indexOf(card.id);
      if (parentIndex > 2) {
        var previousIndex = index - 1 < 0 ? cards.length -1 : index - 1;
        card.id = options[previousIndex];
      } else if (parentIndex < 2) {
        var nextIndex = index + 1 > cards.length - 1 ? 0 : index + 1;
        card.id = options[nextIndex];
      }
    });
  }
  
  function getParents(elem, selector) {
	// Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }

    // Setup parents array
    var parents = [];

    // Get matching parent elements
    for ( ; elem && elem !== document; elem = elem.parentNode ) {

      // Add matching parents to array
      if ( selector ) {
        if ( elem.matches( selector ) ) {
          parents.push( elem );
        }
      } else {
        parents.push( elem );
      }
    }

    return parents;
  };
})();