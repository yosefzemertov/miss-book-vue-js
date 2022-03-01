import { bookService } from "../service/book-service.js";
import reviewAdd from "../cmps/review-add.cmp.js";
export default {
  template: `
<section v-if="book" class="book-details">
    <p>id: {{book.id}}</p>
    <h1>name: {{book.title}}</h1>
    <img :src="bookImgUrl">
    <p>subtitle: {{book.subtitle}}</p>
    <p>summery: {{book.description}}</p>
    <p>categories: <span v-for="categorie in book.categories"> {{categorie}} </span></p>
    <p>writer authors books: <span v-for="books in book.authors"> {{books}} </span></p>
    <p>published Date: {{book.publishedDate}}</p>
    <p>language: {{book.language}}</p>
    <p>price: {{getCurrencyIcon}}</p>
    <p v-if="book.listPrice.isOnSale" ><b>IS ON SALE!💥</b></p>
    <p v-if="reviews">reviews:</p>
    <div class="review-box" v-for="review in reviews">
      <p>name:{{review.name}} rate:{{reviews.rate}} date:{{review.date}}</p>
      <p >review:{{review.review}}</p>
      <button class="close-btn" @click="removeReview(review.id ,book.id)">x</button>
    </div>
    <review-add @save="save"></review-add>
    <button @click="closeDetails">return</button>
      
      

</section>
`,
  components: {
    reviewAdd,
  },
  data() {
    return {
      book: null,
      reviews: null,
    };
  },
  created() {
    const id = this.$route.params.bookId;
    bookService.get(id).then((book) => {
      this.book = book;
      this.reviews = book.reviews;
      console.log();
    });
  },
  methods: {
    closeDetails() {
      this.$router.push("/book");
    },
    save(review) {
      bookService.addReview(this.book.id, review).then((book) => {
        this.book = book;
        this.reviews = book.reviews;
      });
    },
    removeReview(reviewId, bookId) {
      bookService.removeReview(reviewId, bookId).then((book) => {
        this.book = book;
        this.reviews = book.reviews;
      });
    },
  },
  computed: {
    bookImgUrl() {
      return this.book.thumbnail;
    },
    getCurrencyIcon() {
      return new Intl.NumberFormat(this.book.language, {
        style: "currency",
        currency: this.book.listPrice.currencyCode,
      }).format(this.book.listPrice.amount);
    },
  },
};
