import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

import './assets/css/main.scss'
import 'primeicons/primeicons.css'

//theme
import 'primevue/resources/themes/lara-light-indigo/theme.css'

//core
import 'primevue/resources/primevue.min.css'

const app = createApp(App)

import InputText from 'primevue/inputtext'
import Sidebar from 'primevue/sidebar'
import Menu from 'primevue/menu'
import Breadcrumb from 'primevue/breadcrumb'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import Paginator from 'primevue/paginator'
import Image from 'primevue/image'
import InputNumber from 'primevue/inputnumber'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Fieldset from 'primevue/fieldset'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'

app.component('InputText', InputText)
app.component('Sidebar', Sidebar)
app.component('Menu', Menu)
app.component('Toast', Toast)
app.component('Breadcrumb', Breadcrumb)
app.component('Dropdown', Dropdown)
app.component('Button', Button)
app.component('Textarea', Textarea)
app.component('Paginator', Paginator)
app.component('Image', Image)
app.component('InputNumber', InputNumber)
app.component('Fieldset', Fieldset)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Checkbox', Checkbox)

app.use(PrimeVue)
app.use(ToastService)
app.use(createPinia())
app.use(router)

app.mount('#app')
