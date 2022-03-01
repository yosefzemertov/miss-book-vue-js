export default {
template:`
<section>
    <header>
        <h1>Miss Book</h1>
        <nav class="nav-bar">
            <router-link to="/">home</router-link>
            <router-link to="/book">books</router-link>
            <router-link to="/add">Add books</router-link>
            <router-link to="/about">About</router-link>
        </nav>
    </header>
</section>
`,
data() {
    return {};
},
created(){},
methods:{},
computed:{},
}