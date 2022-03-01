export default {
template:`
<section class="book-filter">
    <label>
        <input @input="setFilter" type="text" v-model="filterBy.name" placeholder="Search">
        <input @input="setFilter" type="range" :title="filterBy.price" v-model="filterBy.price" min="0" max="250" >
    </label>
</section>
`,
data() {
    return {
    filterBy: {
        name: '',
        price:300
    }
    };
},
created(){},
methods:{
    setFilter(){
        this.$emit('filtered', this.filterBy)
    }
},
computed:{},
}