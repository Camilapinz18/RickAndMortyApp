const app = Vue.createApp({
  data () {
    return {
      pages: null,
      selectedPage: null,
      charactersList: [],
      characters: [],
      buyedCards: [],
      isLandPage: false,
      isCollecion: false,
      isPurchases: false,
      isPayCredits: false
    }
  },
  methods: {
    onLoadPage () {
      this.syncLocalStorage()
      this.fetchData()
      this.isLandPage = true
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
      console.log('Page', page)
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
      this.buyedCards.push({
        card: char,
        date: new Date()
      })
      console.log('buyedCards', this.buyedCards)
      localStorage.setItem('buyedCards', JSON.stringify(this.buyedCards))
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
    }
  },

  created () {
    this.onLoadPage()
  }
})

app.mount('#app')
