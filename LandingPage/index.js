const app = Vue.createApp({
  data () {
    return {
      pages: null,
      selectedPage: null,
      charactersList: [],
      characters: [],
      buyedCards: [],
      cardsToShow: [],
      isLandPage: false,
      isCollecion: false,
      isPurchases: false,
      isPayCredits: false,
      currentUser: JSON.parse(localStorage.getItem('userLogin')),
      launchAlert: false
    }
  },
  methods: {
    onLoadPage () {
      this.syncLocalStorage()
      this.fetchData()
      this.isLandPage = true
      console.log('CURRENT', this.currentUser[0])
    },
    syncLocalStorage () {
      if (
        localStorage.getItem('buyedCards') === null ||
        localStorage.getItem('buyedCards') === undefined
      ) {
        localStorage.setItem('buyedCards', JSON.stringify(this.buyedCards))
      } else {
        localStorage.setItem('buyedCards', localStorage.getItem('buyedCards'))
        const toUpdateBuyedCards = JSON.parse(
          localStorage.getItem('buyedCards')
        )
        this.buyedCards = toUpdateBuyedCards
      }
    },
    async fetchData () {
      let page = this.assignRandomPage()
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        )
        const chars = await response.json()

        this.characters = chars.results

        this.charactersList = characters.results
      } catch (error) {
        console.log(error)
      }

      this.characters.map(char => {
        this.charactersList.push({
          name: char.name,
          image: char.image,
          species: char.species,
          status: char.status,
          price: this.assignRandomPrice(),
          cardStatus: this.assignRandomCardStatus()
        })
      })

      console.log('charasedit', this.charactersList)

      localStorage.setItem('cards', JSON.stringify(this.charactersList))
    },
    addToCart (char) {
      alert(char.name + char.id)
      let date = new Date()
      let formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
      console.log('formattedDate', formattedDate)
      this.buyedCards.push({
        user: this.currentUser[0].username,
        card: char,
        date: formattedDate
      })
      console.log('buyedCards', this.buyedCards)
      localStorage.setItem('buyedCards', JSON.stringify(this.buyedCards))
    },
    assignCardsToCurrentUser () {
      this.isLandPage = false
      this.isPurchases = true
      console.log('aca')
      this.cardsToShow = this.buyedCards.filter(card => {
        return card.user === this.currentUser[0].username
      })

      console.log('cardsToShow', this.cardsToShow.length)

      if (this.cardsToShow.length === 0) {
        Swal.fire({
          title: `Parece que aún no cuentas con ningún NFT!`,
          text: '¿Que tal si adquieres algunos MortyCoins?',
          width: 600,
          padding: '3em',
          color: 'white',
          background: '#272B33 url("./images/back.png")',

          backdrop: `
            rgba(0,176,200,0.4)
            left top
            no-repeat
          `
        })
      }
    },

    assignRandomPage () {
      let randPage = Math.round(Math.random() * 42)
      return randPage
    },
    assignRandomPrice () {
      let minPrice = 20
      let maxPrice = 500
      let randPrice = Math.floor(
        Math.random() * (maxPrice - minPrice + 1) + minPrice
      )

      return randPrice
    },
    assignRandomCardStatus () {
      const cardStatus = ['inAuction', 'forSale']
      let randStatus = cardStatus[Math.floor(Math.random() * cardStatus.length)]
      return randStatus
    },
    generatePayment () {
      alert('pago egenrado')
    },
    logout () {
      this.isLandPage = false
      localStorage.removeItem('userLogin')
      window.location.href = '../index.html'
    }
  },

  created () {
    this.onLoadPage()
  }
})

app.mount('#app')
