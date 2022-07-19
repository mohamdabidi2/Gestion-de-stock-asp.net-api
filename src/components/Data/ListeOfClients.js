
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import "react-data-table-component-extensions/dist/index.css";
import "./style.css"

import Header from './../Dashbords/header';
import axios from "axios";
const ListeOfClients = () => {
  const [Row, setRow] = useState({})
  const [popUp, setPopUp] = useState(false)
  const [Row1, setRow1] = useState({})
  const [popUp1, setPopUp1] = useState(false)
  const deleteRow = (e) => {
    let Qs = window.confirm("Êtes-vous sûr d'avoir supprimé cet élément ?")
    if (Qs == true) {
      axios.delete('http://localhost:40374/api/client/' + e).then(res => axios.get("http://localhost:40374/api/client").then(res => setdata(res.data)))

    }
  }
  const Ajouter =async () => {
    let currentDate = new Date().toJSON().slice(0, 10)

    setRow1({ ...Row1, Cli_Dat_Ins: currentDate })
if(Row1.Cli_Phone!=''){
  await axios.get("http://localhost:40374/api/client/"+ Row1.Cli_Phone).then(res => {
    if (res.data.length > 0) {
      alert('le client existe déjà')
    }
    else {
      axios.post("http://localhost:40374/api/client", Row1)
      .then(res => axios.get("http://localhost:40374/api/client")
      .then(res => {
        setdata(res.data)
        setPopUp1(false)
        setRow1({})
      }))
    }

  })
}
  
    return false
  }

  const EditRow = (e) => {
    setRow(e)
    setPopUp(true)
    console.log(e)
  }
  const miseajour = () => {
    axios.put("http://localhost:40374/api/client", Row).then(res => axios.get("http://localhost:40374/api/client").then(res => setdata(res.data)))
    setPopUp(false)
  }
  const columns = [
    {
      name: "Client ID",
      selector: "Cli_Id",
      sortable: true
    },
    {
      name: "Date d'inscription",
      selector: "Cli_Dat_Ins",
      sortable: true
    },
    {
      name: "Nom",
      selector: "Cli_Nom",
      sortable: true
    },
    {
      name: "Prenom",
      selector: "Cli_Prenom",
      sortable: true
    },
    {
      name: "Telephone",
      selector: "Cli_Phone",
      sortable: true
    },
    {
      name: "Email",
      selector: "Cli_Email",
      sortable: true
    },
    {
      name: "Addresse",
      selector: "Cli_Adress",
      sortable: true
    },
    {
      name: "Ville",
      selector: "Cli_Ville",
      sortable: true
    },
    {
      name: "Code Postal",
      selector: "Cli_ZipCode",
      sortable: true
    },
    {
      name: "Actions",
      cell: (row) =>

        <div style={{ display: "flex" }}>
          <button style={{ marginRight: "10px", padding: "5px 10px", fontSize: 16, cursor: "pointer" }} onClick={() => EditRow(row)}><AiFillEdit /></button><br />
          <button style={{ padding: "5px 10px", fontSize: 16, cursor: "pointer" }} onClick={() => deleteRow(row.Cli_Id)}><AiOutlineDelete /></button>

        </div>

    },


  ];
  const [data, setdata] = useState([])
  useEffect(() => {
    axios.get("http://localhost:40374/api/client").then(res => setdata(res.data))



  }, [])

  const tableData = {
    columns,
    data
  };
  return (
    <div className="main">
      <Header />
      <div className="btn-add">
        <button className="newclient-btn" onClick={() => setPopUp1(true)}>Ajouter un nouveau client</button>
      </div>
      <DataTableExtensions
        {...tableData}

      >
        <DataTable
          responsive
          columns={columns}
          data={data}
          title="Liste des clients"
          defaultSortField="Cli_Id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
      <div style={popUp ? { visibility: "visible" } : { visibility: "hidden" }} id="popup1" class="overlay">
        <div class="popup">
          <h2 style={{ textAlign: "center" }}>Mise a jour</h2>
          <a class="close" onClick={() => { setPopUp(false) }} href="#">&times;</a>
          <label htmlFor="">Identifiant</label>
          <input type="text" className="inputPop" defaultValue={Row.Cli_Id} disabled />
          <label htmlFor="">Date d'inscription</label>
          <input type="text" className="inputPop" defaultValue={Row.Cli_Dat_Ins} disabled />
          <label htmlFor="">Nom</label>
          <input type="text" className="inputPop" defaultValue={Row.Cli_Nom} onChange={(e) => { setRow({ ...Row, Cli_Nom: e.target.value }) }} />
          <label htmlFor="">Prenom</label>
          <input type="text" className="inputPop" defaultValue={Row.Cli_Prenom} onChange={(e) => { setRow({ ...Row, Cli_Prenom: e.target.value }) }} />
          <label htmlFor="">Telephone</label>
          <input type="text" className="inputPop" defaultValue={Row.Cli_Phone} onChange={(e) => { setRow({ ...Row, Cli_Phone: e.target.value }) }} />
          <label htmlFor="">Email</label>
          <input type="text" className="inputPop" defaultValue={Row.Cli_Email} onChange={(e) => { setRow({ ...Row, Cli_Email: e.target.value }) }} />
          <label htmlFor="">Address</label>
          <input type="text" className="inputPop" defaultValue={Row.Cli_Adress} onChange={(e) => { setRow({ ...Row, Cli_Adress: e.target.value }) }} />
          <label htmlFor="">Ville </label>
          <input type="text" className="inputPop" defaultValue={Row.Cli_Ville} onChange={(e) => { setRow({ ...Row, Cli_Ville: e.target.value }) }} />
          <label htmlFor="">Code Postal</label>
          <input type="number" className="inputPop" defaultValue={Row.Cli_ZipCode} onChange={(e) => { setRow({ ...Row, Cli_ZipCode: e.target.value }) }} />
          <input type="button" className="btn-d" value={'MISE À JOUR'} onClick={miseajour} />

        </div>
      </div>
      <div style={popUp1 ? { visibility: "visible" } : { visibility: "hidden" }} id="popup1" class="overlay">
        <div class="popup">
          <h2 style={{ textAlign: "center" }}>Ajouter un nouveau client</h2>
          <a class="close" onClick={() => { setPopUp1(false) }} href="#">&times;</a>
          <form action="">
            <label htmlFor="">Nom</label>
            <input pattern="[A-Za-z]{2,20}" value={Row1.Cli_Nom} maxlength="20" minLength={2} required type="text" className="inputPop" onChange={(e) => { setRow1({ ...Row1, Cli_Nom: e.target.value }) }} />
            <label htmlFor="">Prenom</label>
            <input pattern="[A-Za-z]{2,20}" maxlength="20" value={Row1.Cli_Prenom} minLength={2} required type="text" className="inputPop" onChange={(e) => { setRow1({ ...Row1, Cli_Prenom: e.target.value }) }} />
            <label htmlFor="">Telephone</label>
            <input required title="Please enter valid phone number" value={Row1.Cli_Phone} pattern="^[2459]\d{7,7}$" type="text" className="inputPop" onChange={(e) => { setRow1({ ...Row1, Cli_Phone: e.target.value }) }} />
            <label htmlFor="">Email</label>
            <input required type="email" className="inputPop" value={Row1.Cli_Email} onChange={(e) => { setRow1({ ...Row1, Cli_Email: e.target.value }) }} />
            <label htmlFor="">Address</label>
            <input required type="text" className="inputPop" value={Row1.Cli_Adress} onChange={(e) => { setRow1({ ...Row1, Cli_Adress: e.target.value }) }} />
            <label htmlFor="">Ville </label>
            <input required type="text" className="inputPop" value={Row1.Cli_Ville} onChange={(e) => { setRow1({ ...Row1, Cli_Ville: e.target.value }) }} />
            <label htmlFor="">Code Postal</label>
            <input required type="number" className="inputPop" value={Row1.Cli_ZipCode} onChange={(e) => { setRow1({ ...Row1, Cli_ZipCode: e.target.value }) }} />
            <input type="submit" className="btn-d" value={'Ajouter'} onClick={Ajouter} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ListeOfClients;


