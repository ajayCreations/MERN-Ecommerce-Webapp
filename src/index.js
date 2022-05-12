import {createRoot} from 'react-dom/client';
import App  from './App';
import { Provider } from 'react-redux';
import store from './redux/store'

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
<Provider store={store}>
<App />

</Provider>
)