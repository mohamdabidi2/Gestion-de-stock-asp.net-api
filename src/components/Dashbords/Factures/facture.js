import logo from '../../connections/images/logo.png'
import './facture.css'
import { useState, useEffect,useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import  axios  from 'axios';
const Facture = (props) => {
    const printer = useRef()
    const printPage=useReactToPrint({
        content:()=>printer.current,
    })
    const [Factures, setFactures] = useState([])



    const [Fac, setFac] = useState({})
    const [dev, setDev] = useState([])
    const [TotalHt, setTotalHt] = useState(0)
    const [TotalTVA, setTotalTVA] = useState(0)

    useEffect(() => {
        
        axios.get("http://localhost:40374/api/facture").then(async res => {

           await setFac(...res.data.filter(el => el.Fact_Id == props.id))
            let Fact_Produits =await  JSON.parse(res.data.filter(el => el.Fact_Id == props.id)[0].Fact_Produits)
            await setFactures( Fact_Produits )

            for (var i = 0; i < Fact_Produits.length; i++) {
                setTotalHt(TotalHt + (Fact_Produits[i].Qtn * Fact_Produits[i].PU))
        
            }
            console.log(Factures)

        }
        )

    }, [])
    return (<div className='facture'>
           <div className="btn-abs">
                     <button className="btn-candprint" onClick={printPage}>Print</button>
                    <button className="btn-candprint" onClick={()=>props.tgg()}>Close</button>
                   
                </div>
       <div className='fac-container'  ref={printer}>
    
       <div className="facture-container">
            <div className="facture-intro-part">
                <img src={logo} alt="" className="logo-entreprise" />
                <p className="corrdo">Adresse</p>
                <p className="corrdo">Ville province code postal</p>
                <p className="corrdo">Télephone : 20 000 000</p>
            <br /><br />
                <p className="title-fact">Facturé à</p>
                <p className="corredmynewshop"><strong>Mr/Mme : </strong>{Fac.Fact_pour}</p>
                <p className="corredmynewshop"><strong>à : </strong>{Fac.Fact_Add}{Fac.Fact_zip}</p>
                <p className="corredmynewshop"><strong>Tel : </strong>{Fac.Fact_tel}</p>
                <p className="corredmynewshop"><strong>Email : </strong>{Fac.Fact_Email}</p>
            </div>
            <div className="facture-intro-part">
                <h1 className="factureword">FACTURE</h1>
                <div className="partname1 title-fact">
                    <p className="title-fact t2parts">N° de facture</p>
                    <p className="title-fact t2parts">Date</p>
                </div>
                <div className="partname1">
                    <p className="corrdfacture">{Fac.Fact_Ref}</p>
                    <p className="corrdfacture">{Fac.Fact_date}</p>
                </div>
                <div className="partname1 title-fact">
                    <p className="title-fact t2parts">Réf.client</p>
                    <p className="title-fact t2parts">conditions</p>
                </div>
                <div className="partname1">
                    <p className="corrdfacture">{Fac.F_client}</p>
                    <p className="corrdfacture">{Fac.Fact_Paiement}</p>
                </div>

            </div>
        </div>
        <table className='table-produit' border={1} width={'100%'}>
<tr className="table-title">
<th className="title-for-a-table">Produit</th>
<th className="title-for-a-table">Qté</th>
<th className="title-for-a-table">Prix unitaire</th>
<th className="title-for-a-table">Montant</th>
</tr>
{Factures.map(el=>
    <tr className="table-produit-items">
    <td className="table-produit-items-containt">{el.produit}</td>
    <td className="table-produit-items-containt">{el.Qtn}</td>
    <td className="table-produit-items-containt">{el.PU}</td>
    <td className="table-produit-items-containt">{el.Qtn*el.PU}</td>
</tr>
    )}

        </table>

<p className="selfflex title-fact">Total : {TotalHt} TND</p>


       </div>

    </div>);
}

export default Facture;