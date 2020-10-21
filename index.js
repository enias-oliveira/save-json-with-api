const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

// É possivel tirar até 52 cartas por baralho
const getRandomIntTo52 = () => {
  return Math.floor(Math.random() * Math.floor(52))
}

// Solicita um baralho embaralhado
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(resp => resp.json())
    .then(data => getCards(data))
    .then(cards => saveCards(cards))

// Seleciona quantidade aleatória de cartas do baralho retornado
const getCards = (deck) => {
    let cardQuantity = getRandomIntTo52()
    let cardRequest = `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=${cardQuantity}`
    return fetch(cardRequest)
        .then(resp => resp.json())
}

// Salva cartas no aquivo dados.json
const saveCards = (cards) => {
    let filePath = path.join(__dirname,'dados.json')
    let jsonData = JSON.stringify(cards)

    fs.writeFile(filePath,jsonData, (err) => {if(err) throw(err)})
}
