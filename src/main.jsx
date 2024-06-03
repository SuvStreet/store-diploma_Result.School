import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Store } from './Store.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Store />
	</BrowserRouter>,
)
