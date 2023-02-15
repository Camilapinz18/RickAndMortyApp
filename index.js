const app = Vue.createApp({
  data () {
    return {
      pages: null,
      selectedPage: null,
      charactersList: []
    }
  },
  methods: {
    onLoadPage () {
      this.fetchData()
    },
    async fetchData () {
      let page = this.assignRandomPage()
      console.log("Page",page)
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        )
        const characters = await response.json()
        this.charactersList = characters.results
        this.pages = characters.info.pages
      } catch (error) {
        console.log(error)
      }
    },
    addToCart (char) {
      console.log(char)
      alert(char.name + char.id)
    },
    assignRandomPage () {
      let randPage = Math.round(Math.random() * 42)
      return randPage
    }
  },

  created () {
    this.onLoadPage()
  }
})

app.mount('#app')
