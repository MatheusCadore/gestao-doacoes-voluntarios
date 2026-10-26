import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importar o CSS e JS do Bootstrap para estilizar a aplicação
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)

// Registar o router na aplicação
app.use(router)

app.mount('#app')