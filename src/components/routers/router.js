
import Home from './../Dashbords/home';
import ListedeProduit from './../Data/ListeOfProduits';
import ListeOfClients from './../Data/ListeOfClients';
import ListeDeDevis from './../Data/ListeDeDevis';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ListeDesFactures from './../Data/listdesfacture';
import Facture from './../Dashbords/Factures/facture';
import Login from './../connections/connection';
const Routing = () => {
    return (
      
            <BrowserRouter>
            <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/produits" element={<ListedeProduit />}/>
            <Route exact path="/clients" element={<ListeOfClients />}/>
            <Route exact path="/devis" element={<ListeDeDevis />}/>
            <Route exact path="/factures" element={<ListeDesFactures />}/>
            <Route exact path="/fac" element={<Facture />}/>
            <Route exact path="/log" element={<Login />}/>
         
           </Routes> 
           </BrowserRouter>
      
    );
}

export default Routing;