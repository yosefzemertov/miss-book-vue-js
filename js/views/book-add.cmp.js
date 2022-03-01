import { bookService } from "../service/book-service.js";

export default {
  template: `
<section class="book-add">
    <template v-if="!isResult">
        <h1>Let me search for you</h1>
        <input v-model="searchWord" type="text" placeholder="search key word"><br><br>
        <button @click="findBook">search</button>
    </template>
        <div class="list">
            <ul>
                <li v-if="searchResult" v-for="(result,idx) in searchResult">{{result.volumeInfo.title}} <br> <img :src="bookImgUrl(idx)" ><br><button @click="addBook(result)">+</button></li>
            </ul>
        </div>
</section>
`,
  data() {
    return {
      searchWord: "",
      searchResult: "",
      isResult:false
    };
  },
  created() {},
  methods: {
    findBook() {
      if (this.searchWord.trim() === "") return;
      console.log(this.searchWord);
      bookService.getBooks(this.searchWord).then(books =>{
          console.log(books.items[0].volumeInfo.imageLinks.thumbnail);
          this.isResult = true
          return (this.searchResult = books.items)
      }) 
      this.searchWord = "";
    },
    addBook(book){
        bookService.addBook(book)
        this.$router.push('/book')
    },
    bookImgUrl(idx){
        return this.searchResult[idx].volumeInfo.imageLinks?.thumbnail
    },
  },
  computed: {},
};
