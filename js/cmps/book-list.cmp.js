import bookPreview from "./book-preview.cmp.js";

export default {
  props: ["books"],
  template: `
    <section class="book-list">
        <ul>
            <li v-for="book in books" :key="book.id"  class="book-preview-container">
                <book-preview :book="book"></book-preview>
                <router-link :to="'/book/'+book.id">Details</router-link>
                <!-- <button @click="setSelectedBook(book)">Details</button> -->
                <hr>
                <button @click="removebook(book.id)">remove</button>
            </li>
        </ul>
    </section>

`,
  components: {
    bookPreview,
  },
  data() {
    return {};
  },
  created() {
  },
  methods: {
    // setSelectedBook(book){
        // this.$emit('selected',book)
    // },
    removebook(bookId){
        this.$emit('remove' , bookId)
    }    
  },
  computed: {},
  mounted(){

  }
};
