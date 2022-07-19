
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import DataTableExtensions from "react-data-table-component-extensions";
import { AiFillDiff, AiOutlineDelete } from "react-icons/ai";
import "react-data-table-component-extensions/dist/index.css";
import "./style.css"
import Header from '../Dashbords/header';
import axios from "axios";
import Devis from './../Dashbords/Devis/devis';
import Facture from "../Dashbords/Factures/facture";
const ListeDesFactures = () => {
    const [id, setId] = useState("")
    const [Produut, setProduut] = useState("")
    const [Paim, setPaim] = useState('')
    const [Toggle, setToggle] = useState(false)
    const [Row, setRow] = useState({})
    const [Produits, setProduits] = useState([])
    const [Clients, setClients] = useState([])
    const [FactProduits, setFactProduits] = useState([])
    const [popUp, setPopUp] = useState(false)
    const [Part2, setPart2] = useState(false)
    const [Part3, setPart3] = useState(false)
    const [Part4, setPart4] = useState(false)
    const [Fact_Paiement, setFact_Paiement] = useState('')
    const [data, setdata] = useState([])
    const [IdClient, setIdClient] = useState('')
    const [RefProduit, setRefProduit] = useState('')
    const [Qtn, setQtn] = useState('')
    const [TVA, setTVA] = useState('')
    const [PU, setPU] = useState('')
    const verifierClient = async(e) => {
        
        if (e != '') {
            if(e == ''){
                alert("Il n'y a pas de client avec cet identifiant")
            }
            let index = Clients.findIndex(el => el.Cli_Id == e)
            if (index != -1) {
let x= await Math.round(Math.random()*10000)
console.log(x)
                let currentDate =await new Date().toJSON().slice(0, 10)
               await setRow({ ...Row,F_client:Clients[index].Cli_Id, Fact_tel: Clients[index].Cli_Phone, Fact_Add: Clients[index].Cli_Adress, Fact_date: currentDate,Fact_Ville:Clients[index].Cli_Ville,Fact_zip:Clients[index].Cli_ZipCode,Fact_Email:Clients[index].Cli_Email,Fact_pour: Clients[index].Cli_Nom+" "+Clients[index].Cli_Prenom,Fact_Ref:x,Fact_Paiement:'Acheter en mensualité'})
                setPart2(true)
              
            }
            else{
                alert(" Il n'y a pas de client avec cet identifiant")
            }
        }
    }
 
    const verifierProduit = (e) => {
        if(e == ''){
            alert(" Il n'y a pas de Produit avec cet Reference")
        }
        if (e != '') {
            let index = Produits.findIndex(el => el.Prod_Num_Ser == e)
            if (index != -1) {
                setPart3(true)
                setPU(Produits[index].Prod_Prix_Unit)
                setProduut(Produits[index].Prod_Name)
          
            }
            else{
                alert(" Il n'y a pas de Produit avec cet Reference")
            }
        }
    }
  
     
    const AjouterLproduit=()=>{
        if (RefProduit != '') {
        let index = Produits.findIndex(el => el.Prod_Num_Ser == RefProduit)
        if(Produits[index].Prod_Qtn<Qtn){
            alert("la quantité maximale est : "+Produits[index].Prod_Qtn)
        }
        else{
            if(Qtn==''){
                alert("Quantité invalide")
            }
            else{
               
                  
                    let prd={id:Produits[index].Prod_Num_Ser,available_Qtn:Produits[index].Prod_Qtn,produit:Produits[index].Prod_Name,PU:Produits[index].Prod_Prix_Unit,Qtn:Qtn}
               
                    setFactProduits([...FactProduits,prd])
                    setPart4(true)
                    setPart3(false)
                    setQtn('')
                    setRefProduit('')
                    setPU('')
                    setTVA('')
                
            }
         
   
        }
    }

    }
    const columns = [
        {
            name: "N° Facture",
            selector: "Fact_Id",
            sortable: true
        },
        {
            name: "Address",
            selector: "Fact_Add",
            sortable: true
        },
        {
            name: "Fact Ville",
            selector: "Fact_Ville",
            sortable: true
        },
        {
            name: "Client Telephone",
            selector: "Fact_tel",
            sortable: true
        },
        {
            name: "Code Postal",
            selector: "Fact_zip",
            sortable: true
        },
        {
            name: "Email",
            selector: "Fact_Email",
            sortable: true
        },
        {
            name: "Client",
            selector: "Fact_pour",
            sortable: true
        },
        {
            name: "date",
            selector: "Fact_date",
            sortable: true
        },
        {
            name: "Referance",
            selector: "Fact_Ref",
            sortable: true
        },    {
            name: "Paiement",
            selector: "Fact_Paiement",
            sortable: true
        },
        {
            name: "Facture",
            cell: (row) => <AiFillDiff style={{fontSize:'28px'}} onClick={() =>{setId(row.Fact_Id);setToggle(true)} } />

        },
       


    ];
    const tableData = {
        columns,
        data
    };
    const tgg=()=>{
        setToggle(false)
            }
const ConfirmFac= async()=>{
 let Fact_Produits=await JSON.stringify(FactProduits)
   await setRow({...Row,Fact_Produits:Fact_Produits})
  
  await  axios.post("http://localhost:40374/api/facture",Row).then(res => axios.get("http://localhost:40374/api/facture").then(res => {
for(let i=0 ;i<FactProduits.length;i++){
    let qt={Prod_Qtn:FactProduits[i].available_Qtn-FactProduits[i].Qtn,Prod_Num_Ser:FactProduits[i].id}
    if(FactProduits[i].available_Qtn==FactProduits[i].Qtn){
        qt={...qt,Prod_disp:'En rupture de stock'}
    }
    else{
        qt={...qt,Prod_disp:'Disponible'}
    }

 axios.put("http://localhost:40374/api/facture",qt)
}
    setdata(res.data)


  }))
  console.log(Row)

    setPopUp(false);
     setPart2(false);
      setPart3(false);
       setPart4(false) 
    setFactProduits([])
  
}
    useEffect(() => {
        axios.get("http://localhost:40374/api/facture").then(res => setdata(res.data))
        axios.get("http://localhost:40374/api/produit").then(res => setProduits(res.data))
        axios.get("http://localhost:40374/api/client").then(res => setClients(res.data))



    }, [])
    return (
        <div>
            <Header />
            <div className="btn-add">
                <button className="newclient-btn" onClick={() => setPopUp(true)}>Ajouter un nouveau Facture</button>
            </div>
           { Toggle?<Facture id={id} tgg={tgg} />:''}
            <DataTableExtensions
                {...tableData}

            >
                <DataTable
                    responsive
                    columns={columns}
                    data={data}
                    title="Liste des Factures"
                    defaultSortField="D_Num"
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                />
            </DataTableExtensions>






            <div style={popUp ? { visibility: "visible" } : { visibility: "hidden" }} id="popup1" class="overlay">
                <div class="popup">
                    <h2 style={{ textAlign: "center" }}>Créer un nouveau Facture</h2>
                    <a class="close" onClick={() => { setPopUp(false); setPart2(false)  ; setPart4(true)
                    setPart3(false)
                    setQtn('')
                    setRefProduit('')
                    setPU('')
                   }} href="#">&times;</a>


                    <label htmlFor="">Choisir le client</label>
                    <select onChange={(e) => { 
                    verifierClient(e.target.value) }}   className="inputPop"  name="" id="">
<option value="" disabled selected>Choisir le Client</option>
                        {Clients.map(el=><option value={el.Cli_Id}>{"( "+el.Cli_Id+" ) "+el.Cli_Nom+" "+el.Cli_Prenom}</option>)}
                    </select>
                    <div className="part2" style={Part2 ? { visibility: "visible" } : { visibility: "hidden" }}  >
                        <label htmlFor="">Nom de client</label>
                        <input disabled type="text" className="inputPop" value={Row.Fact_pour} />
                        <label htmlFor="">E-mail</label>
                        <input disabled type="text" className="inputPop" value={Row.Fact_Email} />
                        <label htmlFor="">Tel:</label>
                        <input disabled type="text" className="inputPop" value={Row.Fact_tel} />
                        <label htmlFor="">Address</label>
                        <input disabled type="text" className="inputPop" value={Row.Fact_Add} />
                        <label htmlFor="">Ville</label>
                        <input disabled type="text" className="inputPop" value={Row.Fact_Ville} />
                        <label htmlFor="">Code Postale</label>
                        <input disabled type="text" className="inputPop" value={Row.Fact_zip} />
                        <label htmlFor="">Mode de paiement </label>
                        <select className="inputPop"onChange={(e)=>{setRow({...Row,Fact_Paiement:e.target.value})}}>
                        <option value="Acheter en mensualité">Acheter en mensualité</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Paiment a livrasion">Paiment a livrasion</option>

                        </select>
                        <p className='tilepRd'>Liste des Produits</p>  
                        <label htmlFor="">Choisir un Produit</label>
                     
<select  onChange={(e) => { verifierProduit(e.target.value) }} name="" id="" className="inputPop">
<option value="" disabled selected>Choisir un Produit</option>

    {Produits.map(el=><option value={el.Prod_Num_Ser}>{" ( "+el.Prod_Num_Ser+" ) "+el.Prod_Name}</option>)}
</select>
                       
                      <div style={Part3 ? { display: "inline" } : { display: "none" }}>
                      <input   type="text"disabled className="inputPop" value={Produut} />
                      <input placeholder="Quantité" onChange={(e)=>setQtn(e.target.value)} type="number" max={100} className="inputPop" value={Qtn} />
                        <input  disabled type="text" className="inputPop" value={PU} />
                      </div>
                        <button style={Part3 ? { display: "inline" } : { display: "none" }} className="btn-d" onClick={AjouterLproduit}>Ajouter ce produit</button>
                        <div>
                            <table border={1} style={{width:"100%",textAlign:"center"}}>
                                <tr>
                                    <th>Produit</th>
                                    <th>Quantité</th>
                                    <th>Prix</th>
                                
                                </tr>
                                {FactProduits.map(el=>
                                    <tr>
                                        <td>{el.produit}</td>
                                        <td>{el.Qtn}</td>
                                        <td>{el.PU}</td>
                                      

                                    </tr>
                                    )}

                            </table>
                            <button style={Part4 ? { display: "inline" } : { display: "none" }} className="btn-d" onClick={ConfirmFac}>Confirmer le Facture</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListeDesFactures;