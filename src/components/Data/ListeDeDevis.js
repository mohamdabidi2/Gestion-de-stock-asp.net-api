
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
const ListeDeDevis = () => {
    const [id, setId] = useState("")
    const [Produut, setProduut] = useState("")
    const [Toggle, setToggle] = useState(false)
    const [Row, setRow] = useState({})
    const [Produits, setProduits] = useState([])
    const [Clients, setClients] = useState([])
    const [FactProduits, setFactProduits] = useState([])
    const [popUp, setPopUp] = useState(false)
    const [Part2, setPart2] = useState(false)
    const [Part3, setPart3] = useState(false)
    const [Part4, setPart4] = useState(false)
    const [data, setdata] = useState([])
    let navigate = useNavigate();
    const [IdClient, setIdClient] = useState('')
    const [RefProduit, setRefProduit] = useState('')
    const [Qtn, setQtn] = useState('')
    const [TVA, setTVA] = useState('')
    const [PU, setPU] = useState('')
    const verifierClient = (e) => {
        
        if (e != '') {
            if(e == ''){
                alert("Il n'y a pas de client avec cet identifiant")
            }
            let index = Clients.findIndex(el => el.Cli_Id == e)
            if (index != -1) {
                let currentDate = new Date().toJSON().slice(0, 10)
                setRow({ ...Row, D_Num_cli: Clients[index].Cli_Id, D_Phone_cli: Clients[index].Cli_Phone, D_Address_cli: Clients[index].Cli_Adress, D_Date: currentDate })
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
            setRefProduit(e)
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
    const deleteRow = (e) => {
        let Qs = window.confirm("Êtes-vous sûr d'avoir supprimé cet élément ?")
    if (Qs == true) {
      axios.delete('http://localhost:40374/api/devisc/' + e).then(res => axios.get("http://localhost:40374/api/devisc").then(res => setdata(res.data)))

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
                if (TVA==''||TVA<0 ||TVA>30){
                    alert("TVA doit être compris entre 0 et 30")
                }
                else{
                    let prd={produit:Produits[index].Prod_Name,PU:Produits[index].Prod_Prix_Unit,Qtn:Qtn,TVA:TVA}
               
                    setFactProduits([...FactProduits,prd])
                    console.log(FactProduits)
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

    }
    const columns = [
        {
            name: "Devis Num",
            selector: "D_Num",
            sortable: true
        },
        {
            name: "Date de creation",
            selector: "D_Date",
            sortable: true
        },
        {
            name: "ID Client",
            selector: "D_Num_cli",
            sortable: true
        },
        {
            name: "Client Telephone",
            selector: "D_Phone_cli",
            sortable: true
        },
        {
            name: "Address de client",
            selector: "D_Address_cli",
            sortable: true
        },
        {
            name: "Devis",
            cell: (row) => <AiFillDiff onClick={() =>{setId(row.D_Num);setToggle(true)} } />

        },
        {
            name: "Actions",
            cell: (row) =>

                <div style={{ display: "flex" }}>
                    <button style={{ padding: "5px 10px", fontSize: 16, cursor: "pointer" }} onClick={() => deleteRow(row.D_Num)}><AiOutlineDelete /></button>

                </div>

        },


    ];
    const tableData = {
        columns,
        data
    };
    const tgg=()=>{
        setToggle(false)
            }
const ConfirmDevis= async()=>{
 let D_Prod=await JSON.stringify(FactProduits)
   await setRow({...Row,D_Prod:D_Prod})
  
  await  axios.post("http://localhost:40374/api/devisc",Row).then(res => axios.get("http://localhost:40374/api/devisc").then(res => setdata(res.data)))

    setPopUp(false);
     setPart2(false);
      setPart3(false);
       setPart4(false) 
    setFactProduits([])
  
}
    useEffect(() => {
        axios.get("http://localhost:40374/api/devisc").then(res => setdata(res.data))
        axios.get("http://localhost:40374/api/produit").then(res => setProduits(res.data))
        axios.get("http://localhost:40374/api/client").then(res => setClients(res.data))



    }, [])
    return (
        <div>
            <Header />
            <div className="btn-add">
                <button className="newclient-btn" onClick={() => setPopUp(true)}>Ajouter un nouveau devis</button>
            </div>
           { Toggle?<Devis id={id} tgg={tgg} />:''}
            <DataTableExtensions
                {...tableData}

            >
                <DataTable
                    responsive
                    columns={columns}
                    data={data}
                    title="Liste des Devis"
                    defaultSortField="D_Num"
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                />
            </DataTableExtensions>






            <div style={popUp ? { visibility: "visible" } : { visibility: "hidden" }} id="popup1" class="overlay">
                <div class="popup">
                    <h2 style={{ textAlign: "center" }}>Créer un nouveau Devis</h2>
                    <a class="close" onClick={() => { setPopUp(false); setPart2(false)  ; setPart4(true)
                    setPart3(false)
                    setQtn('')
                    setRefProduit('')
                    setPU('')
                    setTVA('') }} href="#">&times;</a>

<label htmlFor="">Choisir le client</label>
                    <select onChange={(e) => { 
                    verifierClient(e.target.value) }}   className="inputPop"  name="" id="">
<option value="" disabled selected>Choisir le Client</option>
                        {Clients.map(el=><option value={el.Cli_Id}>{"( "+el.Cli_Id+" ) "+el.Cli_Nom+" "+el.Cli_Prenom}</option>)}
                    </select>
                    <div className="part2" style={Part2 ? { visibility: "visible" } : { visibility: "hidden" }}  >
                        <input disabled type="text" className="inputPop" value={Row.D_Phone_cli} />
                        <input disabled type="text" className="inputPop" value={Row.D_Address_cli} />
                        <input disabled type="text" className="inputPop" value={Row.D_Date} />

                                            
<select  onChange={(e) => { verifierProduit(e.target.value) }} name="" id="" className="inputPop">
<option value="" disabled selected>Choisir un Produit</option>

    {Produits.map(el=><option value={el.Prod_Num_Ser}>{" ( "+el.Prod_Num_Ser+" ) "+el.Prod_Name}</option>)}
</select>
                      <div style={Part3 ? { display: "inline" } : { display: "none" }}>
                      <input   type="text"disabled className="inputPop" value={Produut} />
                      <input placeholder="Quantité" onChange={(e)=>setQtn(e.target.value)} type="number" max={100} className="inputPop" value={Qtn} />
                        <input placeholder="TVA" onChange={(e)=>setTVA(e.target.value)} type="number" max={100} className="inputPop" value={TVA} />
                        <input  disabled type="text" className="inputPop" value={PU} />
                      </div>
                        <button style={Part3 ? { display: "inline" } : { display: "none" }} className="btn-d" onClick={AjouterLproduit}>Ajouter ce produit</button>
                        <div>
                            <table border={1} style={{width:"100%",textAlign:"center"}}>
                                <tr>
                                    <th>Produit</th>
                                    <th>Quantité</th>
                                    <th>Prix</th>
                                    <th>TVA</th>
                                </tr>
                                {FactProduits.map(el=>
                                    <tr>
                                        <td>{el.produit}</td>
                                        <td>{el.Qtn}</td>
                                        <td>{el.PU}</td>
                                        <td>{el.TVA}</td>

                                    </tr>
                                    )}

                            </table>
                            <button style={Part4 ? { display: "inline" } : { display: "none" }} className="btn-d" onClick={ConfirmDevis}>Confirmer le devis</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListeDeDevis;