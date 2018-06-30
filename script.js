let crypto = [];
var url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,DASH,LSK,SHLD,XRP,BCH,LTC,NEO,XMR,BTG,WAVES,ZEC,NANO,DCR,MDS,INS,RDD,TIX,ENG,LUN,AION,STEEM,REP,GAS,IOT,TRX,ADA,XLM,ETHOS,ARN,EOS,QTUM,OMG,ONT,HSR&tsyms=USD';
fetch(url).then(function(blob) {
    return blob.json();
}).then(function(data) {
    crypto = Object.values(data.RAW);
});

function findMatches(wordToMatch, crypto) {
    return crypto.filter(coin => {
        const regex = new RegExp(wordToMatch, 'gi');
        return coin.USD.FROMSYMBOL.match(regex) || coin.USD.FROMSYMBOL.match(regex); 
    })
}
function displayMatches() {
    const matchArray = findMatches(this.value, crypto);
    const html = matchArray.map(COIN => {
        const reg = new RegExp(this.value, 'gi');
        const symbol = COIN.USD.FROMSYMBOL.replace(`<span class="hl">${this.value}</span>`);
        let  price = COIN.USD.PRICE.toString().replace(`<span class="hl">${this.value}</span>`);
		price=price.substr(0, 7)
        return `
		<li>
		<span class="name symbol">${symbol}</span>
		<span class="name price">💵${price}$</span>
		</li>`;
    }).join('');
    suggestions.innerHTML = html;
}
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
