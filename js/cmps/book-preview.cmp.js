

export default {
    props: ['book'],
template:`
<section class="book-preview">
    <p>{{book.title}}</p>
    <p>{{getCurrencyIcon}}</p>
    <img :src="bookImgUrl">
</section>
`,
data() {
    return {};
},
created(){},
methods:{},
computed:{
    bookImgUrl(){
        return this.book.thumbnail
    },
    getCurrencyIcon(){
        if(typeof (this.book.listPrice.amount) !== 'number') return this.book.listPrice.amount
        return new Intl.NumberFormat(this.book.language, { style: 'currency', currency: this.book.listPrice.currencyCode}).format(this.book.listPrice.amount)
    }
},
}