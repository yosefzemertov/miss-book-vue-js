export default {
    template: `
<section class="review-add">
    <form @submit.prevent="save">
        <span>Enter your name </span>
        <input ref="input" v-model="review.name" type="text"  >
        <span>rate </span>
        <select v-model="review.rate" name="rate">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select><br>
            <span>Read at </span>
            <input v-model="review.date" type="date"><br>
            <p>Your review</p>
            <textarea v-model="review.review" cols="30" rows="5"></textarea>
            <br><button class="submit-btn">submit</button>
    </form>
</section>
`,
    data() {
        return {
            review: {
                id:new Date()%122220,
                name:'book reader',
                rate:1,
                date:new Date().toISOString().slice(0,10),
                review:''
            },
        };
    },
    created() {
    return {
        
    };
    },
    mounted() {
        this.$refs.input.focus()
    },
    methods: {
         
        save(){
            if(this.review.review===''){
                return
            }else {
                this.$emit('save',this.review)
            }
        }
    },
    computed: {
        
    },
};
