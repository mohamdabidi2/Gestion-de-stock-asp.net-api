import axios from 'axios';
import { useState, useEffect,useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import logo from '../../connections/images/logo.png'
import "./devis.css"
const Devis = (props) => {
    const printer = useRef()
    const [devis, setDevis] = useState({})
    const [dev, setDev] = useState([])
    const [TotalHt, setTotalHt] = useState(0)
    const [TotalTVA, setTotalTVA] = useState(0)

    useEffect(() => {
        
        axios.get("http://localhost:40374/api/devisc").then(async res => {

           await setDevis(...res.data.filter(el => el.D_Num == props.id))
            let D_Prod = JSON.parse(res.data.filter(el => el.D_Num == props.id)[0].D_Prod)
            setDev( D_Prod )

            for (var i = 0; i < D_Prod.length; i++) {
                setTotalHt(TotalHt + (D_Prod[i].Qtn * D_Prod[i].PU))
                setTotalTVA(TotalTVA + (((D_Prod[i].Qtn * D_Prod[i].PU) * D_Prod[i].TVA) / 100))
            }
console.log(devis)

        }
        )

    }, [])
const printPage=useReactToPrint({
    content:()=>printer.current,
})


    return (
        <div className="devis-container">  <div className="btn-abs">
        <button className="btn-candprint" onClick={printPage}>Print</button>
       <button className="btn-candprint" onClick={()=>props.tgg()}>Close</button>
      
   </div>
            <div className='dev-c' ref={printer}>
              
                <img src={logo} alt="" className="logo-devis" />
                <div className="soc-cont">
                    <p className="corrdo">Adresse</p>
                    <p className="corrdo">Ville province code postal</p>
                    <p className="corrdo">Télephone : 20 000 000</p>
                </div>

                <div className="client-info">
                    <p className="client-info-item"><strong>Adresse </strong> :{devis.D_Address_cli}</p>
                    <p className="client-info-item"><strong>Télephone : </strong> {devis.D_Phone_cli}</p>
                </div>
                <div className="dvs-info">
                    <p className="dvs-info-item">Numéro de devis : {devis.D_Num}</p>
                    <p className="dvs-info-item">Date : {devis.D_Date}</p>
                    <p className="dvs-info-item">N° client : {devis.D_Num_cli}</p>
                </div>
                <table border={1} className="table-produit">
                    <tr className="titles-devis">
                        <th className="title-d">Produit</th>
                        <th className="title-d">Quntité</th>
                        <th className="title-d">Prix unitaire HT</th>
                        <th className="title-d">Total HT</th>
                        <th className="title-d">TVA</th>
                    </tr>
                    {dev.map(el =>

<tr key={el.Pr} className="produit-for-devis">
    <td className="containt-devis">{el.produit}</td>
    <td className="containt-devis">{el.Qtn}</td>
    <td className="containt-devis"> {el.PU} </td>
    <td className="containt-devis">{el.Qtn * el.PU}</td>
    <td className="containt-devis">{el.TVA}%</td>
</tr>
)}
                </table>
                <div className="tab2">
                    <table className="Tot-tva" border={1}>
                        <tr className="totva-head">
                            <td className="tottva-head-h">Total HT</td>
                            <td className="tottva-head-item">{TotalHt} DT</td>
                        </tr>
                        <tr className="totva-head">
                            <td className="tottva-head-h">Total TVA</td>
                            <td className="tottva-head-item">{TotalTVA} DT</td>
                        </tr>

                        <tr className="totva-head">
                            <td className="tottva-head-h">Total</td>
                            <td className="tottva-head-item">{TotalTVA + TotalHt} DT</td>
                        </tr>
                      
                    </table>
                </div>
                <p className="validite">Durée de validité : 1 mois</p>
                <p className="CetR">Conditions de reglement : 30% à la commande , paiement a réception de facture</p>
                <p className="CetR">Nous restons à votre disposition pour toute information complémentaire.</p>
                <p className="CetR">si ce devis vous convient, veuillez le retourner signé,date et cacheté:</p>
                <div className="cachete">
                    <p className="cachete-de">Pour l'entreprise</p>
                    <p className="cachete-de">Pour le client</p>
                </div>

            </div>
        </div>
    );
}

export default Devis;