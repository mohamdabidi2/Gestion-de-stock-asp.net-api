
import './App.css';
import Login from './components/connections/connection';
import Facture from './components/Dashbords/Factures/facture';
import Home from './components/Dashbords/home';
import Devis from './components/Dashbords/Devis/devis';
import ListeOfClients from './components/Data/ListeOfClients';
import ListedeProduit from './components/Data/ListeOfProduits';
import Routing from './components/routers/router';

function App() {
  return (
    <div className="App">
<Routing/>
    </div>
  );
}

export default App;
