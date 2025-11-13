// 💰 현재 ETH → USD 환율 (원하는 값으로 수정 가능)
const ETH_TO_USD = 4000; // 1 ETH = 4000 USD 기준 예시

// NFT 데이터 예시
const nfts = [
  { name: "Autoglyphs", image: "images/Autoglyphs.png", price: 68.00},
  { name: "Doodle", image: "images/Doodle1.png", price: 0.63 },
  { name: "cryptopunk", image: "images/cryptopunk1.png", price: 34.85 },
  { name: "pudgypenguins", image: "images/pudgypenguins.png", price: 5.87 },
  { name: "Sappy Seal", image: "images/Sappy Seal1.png", price: 0.22 },
  { name: "Infinex Patron", image: "images/InfinexPatronl1.png", price: 1.63 },
  { name: "Ringers", image: "images/Ringers.png", price: 15.00 }, 
  { name: "Moonbirds", image: "images/Moonbirds.png", price: 1.98 },
  { name: "Chromie Squiggle", image: "images/Chromie Squiggle.png", price: 111.00 },
];

// 랜덤 NFT 선택
const nft = nfts[Math.floor(Math.random() * nfts.length)];
document.getElementById("nft-image").src = nft.image;

function generateFakePrices(correctPrice) {
  const prices = new Set([correctPrice]);
  while (prices.size < 4) {
    const fake = (correctPrice + (Math.random() * 2 - 1)).toFixed(2);
    prices.add(parseFloat(fake));
  }
  return Array.from(prices).sort(() => Math.random() - 0.5);
}

const optionsDiv = document.getElementById("options");
const resultText = document.getElementById("result");
const retryBtn = document.getElementById("retry-btn");

const prices = generateFakePrices(nft.price);
prices.forEach(price => {
  const btn = document.createElement("button");
  btn.textContent = `${price} ETH`;
  btn.onclick = () => checkAnswer(price);
  optionsDiv.appendChild(btn);
});

function checkAnswer(selected) {
  const isCorrect = selected === nft.price;
  const usdValue = (nft.price * ETH_TO_USD).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  
  if (isCorrect) {
    resultText.innerHTML = `
      🎉 정답! 실제 가격은 ${nft.price} ETH 💎<br>
      💵 (${usdValue} 상당)
    `;
  } else {
    resultText.innerHTML = `
    ❌정답! 실제 가격은 ${nft.price} ETH <br>💵 (${usdValue} 상당)
    `;
  }

  document.querySelectorAll("#options button").forEach(b => (b.disabled = true));
  retryBtn.style.display = "block";
}

retryBtn.onclick = () => window.location.reload();

