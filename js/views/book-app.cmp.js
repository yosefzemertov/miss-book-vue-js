import { bookService } from "../service/book-service.js";
import bookList from "../cmps/book-list.cmp.js";
import bookFilter from "../cmps/book-filter.cmp.js";
import bookDetails from "../views/book-details.cmp.js";

export default {
  template: `
        <section class="book-app">
       
            <book-filter  @filtered="setFilter" ></book-filter>
            <book-list :books="booksForDisplay"  @remove="removeBook"></book-list>
        
        </section>  

`,
  components: {
    bookList,
    bookFilter,
    bookDetails,
  },
  data() {
    return {
      books: null,
      // selectedBook: null,
      filterBy: null,
      // isDetailsOn: false,
    };
  },
  created() {
    bookService.query()
    .then(books => this.books = books)
  },
  methods: {
    // selectBook(book) {
    //   this.selectedBook = book;
    // },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    removeBook(bookId) {
      bookService.remove(bookId)
      .then(()=>{
        const idx = this.books.findIndex((book) => book.id === bookId);
        this.books.splice(idx, 1);
      })
      
    },
  },
  computed: {
    booksForDisplay() {
      if (!this.filterBy) return this.books;
      const regex = new RegExp(this.filterBy.name, "i");
      return this.books.filter(
        (book) =>
          regex.test(book.title) && book.listPrice.amount < this.filterBy.price
      );
    },

  },
};
