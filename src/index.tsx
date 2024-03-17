import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.scss';
import { store } from './state/store';

const rootElement: HTMLElement | null = document.getElementById("root");

if (rootElement != null)
{
  const root: ReactDOM.Root = ReactDOM.createRoot(rootElement);

  root.render(
      <Provider store={store}>
        <App />
      </Provider>
  );
}
