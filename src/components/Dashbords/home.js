import Header from "./header";
import { useNavigate } from "react-router-dom";
import './home.css'
const Home = () => {
    let navigate = useNavigate();
    return (
        <div style={{width:'100vw',height:'80vh'}}>
            <Header />
            <section id="menu-home">
                <div className="menu-home-item" onClick={()=>navigate(`/produits`)}>
                    <h1 className="menu-home-title">Liste des produits</h1>
                </div>
                <div className="menu-home-item"  onClick={()=>navigate(`/clients`)}>
                    <h1 className="menu-home-title">liste des Clients</h1>
                </div>
                <div className="menu-home-item"  onClick={()=>navigate(`/devis`)}>
                    <h1 className="menu-home-title">Les devis</h1>
                </div>
                <div className="menu-home-item"  onClick={()=>navigate(`/factures`)}>
                    <h1 className="menu-home-title">les Factures</h1>
                </div>
            </section>
        </div>
    );
}

export default Home;