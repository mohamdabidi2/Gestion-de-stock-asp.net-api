
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import "react-data-table-component-extensions/dist/index.css";
import "./style.css"

import Header from '../Dashbords/header';
import axios from "axios";
const ListedeProduit = () => {
  const [Row, setRow] = useState({})
  const [popUp, setPopUp] = useState(false)
  const [Row1, setRow1] = useState({})
  const [popUp1, setPopUp1] = useState(false)
  const deleteRow = (e) => {
    let Qs = window.confirm("Êtes-vous sûr d'avoir supprimé cet élément ?")
    if (Qs == true) {
      axios.delete('http://localhost:40374/api/produit/' + e).then(res => axios.get("http://localhost:40374/api/produit").then(res => setdata(res.data)))

    }
  }
  const Ajouter = async() => {
    let currentDate =await new Date().toJSON().slice(0, 10)

    await setRow1({ ...Row1, Prod_Dat_Ajou: currentDate })
    await  axios.post("http://localhost:40374/api/produit", Row1)
      .then(res => axios.get("http://localhost:40374/api/produit")
        .then(res => {
          setdata(res.data)
          setPopUp1(false)
          setRow1({})
        }))
    return false
  }
  const uploadphoto1 = (e) => {
    let formData = new FormData();    //formdata object
    let name = "img" + (Math.round((Math.random() * 500000)) * 6)
    formData.append(name, e.target.files[0]);

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.post("http://localhost:40374/api/produit/SaveFile", formData, config)
      .then(response => {
        setRow({ ...Row, Prod_Img: "http://localhost:40374/Photos/" + response.data.dbPath })

      })
      .catch(error => {
        console.log(error);
      });
    console.log(name)
    console.log(e.target.files[0])
  }
  const uploadphoto = (e) => {
    let formData = new FormData();    //formdata object
    let name = "img" + (Math.round((Math.random() * 500000)) * 6)
    formData.append(name, e.target.files[0]);

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.post("http://localhost:40374/api/produit/SaveFile", formData, config)
      .then(response => {
        setRow1({ ...Row1, Prod_Img: "http://localhost:40374/Photos/" + response.data.dbPath })

      })
      .catch(error => {
        console.log(error);
      });
    console.log(name)
    console.log(e.target.files[0])
  }
  const EditRow = (e) => {
    setRow(e)
    setPopUp(true)
    console.log(e)
  }
  const miseajour = () => {
    axios.put("http://localhost:40374/api/produit", Row).then(res => axios.get("http://localhost:40374/api/produit").then(res => setdata(res.data)))
    setPopUp(false)
    setRow({})
  }
  const columns = [
    {
      name: "Produit ID",
      selector: "Prod_Num_Ser",
      sortable: true
    },
    {
      name: "Nom de produit",
      selector: "Prod_Name",
      sortable: true
    },
    {
      name: "Marque",
      selector: "Prod_marq",
      sortable: true
    },
    {
      name: "Prod_Desc",
      selector: "Prod_Desc",
      sortable: true
    },
    {
      name: "Categorie",
      selector: "Prod_Cat",
      sortable: true
    },
    {
      name: "L'image de Produit",
      cell: (row) => <img src={row.Prod_Img} style={{ width: "50px" }} alt="" />

    },
    {
      name: "Date d'ajout",
      selector: "Prod_Dat_Ajou",
      sortable: true
    },
    {
      name: "Quantité",
      selector: "Prod_Qtn",
      sortable: true
    },
    {
      name: "cost",
      selector: "Prod_Cost",
      sortable: true
    },
    {
      name: "Prix Unitaire",
      selector: "Prod_Prix_Unit",
      sortable: true
    },
    {
      name: "Disponibilité",
      selector: "Prod_disp",
      sortable: true
    },
    {
      name: "Delete",
      cell: (row) =>

        <div style={{ display: "flex" }}>
          <button style={{ marginRight: "10px", padding: "5px 10px", fontSize: 16, cursor: "pointer" }} onClick={() => EditRow(row)}><AiFillEdit /></button><br />
          <button style={{ padding: "5px 10px", fontSize: 16, cursor: "pointer" }} onClick={() => deleteRow(row.Prod_Num_Ser)}><AiOutlineDelete /></button>

        </div>

    },


  ];
  const [data, setdata] = useState([])
  useEffect(() => {
    axios.get("http://localhost:40374/api/produit").then(res => setdata(res.data))



  }, [])

  const tableData = {
    columns,
    data
  };
  return (
    <div className="main">
      <Header />
      <div className="btn-add">
        <button className="newclient-btn" onClick={() => setPopUp1(true)}>Ajouter un nouveau Produit</button>
      </div>
      <DataTableExtensions
        {...tableData}

      >
        <DataTable
          responsive
          columns={columns}
          data={data}
          title="Liste des Produits"
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
          <label htmlFor="">Nom de produit</label>
          <input pattern="[A-Za-z]{2,20}" value={Row.Prod_Name} maxlength="20" minLength={2} required type="text" className="inputPop" onChange={(e) => { setRow({ ...Row, Prod_Name: e.target.value }) }} />
          <label htmlFor="">Image</label>
          <input type="file" className="inputPop" onChange={(e) => uploadphoto1(e)} />
          <label htmlFor="">Marque</label>
          <input maxlength={20} value={Row.Prod_marq} minLength={2} required type="text" className="inputPop" onChange={(e) => { setRow({ ...Row, Prod_marq: e.target.value }) }} />
          <label htmlFor="">Categorie</label>
          <input pattern="[A-Za-z]{2,20}" maxlength="20" value={Row.Prod_Cat} minLength={2} required type="text" className="inputPop" onChange={(e) => { setRow({ ...Row, Prod_Cat: e.target.value }) }} />
          <label htmlFor="">Description</label>
          <input required value={Row.Prod_Desc} type="text" className="inputPop" onChange={(e) => { setRow({ ...Row, Prod_Desc: e.target.value }) }} />
          <label htmlFor="">Quantité</label>
          <input required type="number" className="inputPop" value={Row.Prod_Qtn} onChange={(e) => { setRow({ ...Row, Prod_Qtn: e.target.value }) }} />

          <label htmlFor="">Cost</label>
          <input required type="number" className="inputPop" value={Row.Prod_Cost} onChange={(e) => { setRow({ ...Row, Prod_Cost: e.target.value }) }} />
          <label htmlFor="">Prix unitaire </label>
          <input required type="number" className="inputPop" value={Row.Prod_Prix_Unit} onChange={(e) => { setRow({ ...Row, Prod_Prix_Unit: e.target.value }) }} />
          <label htmlFor="">Disponibilité</label>
          <input required type="text" className="inputPop" value={Row.Prod_disp} onChange={(e) => { setRow({ ...Row, Prod_disp: e.target.value }) }} />
          <input type="button" className="btn-d" value={'MISE À JOUR'} onClick={miseajour} />

        </div>
      </div>
      <div style={popUp1 ? { visibility: "visible" } : { visibility: "hidden" }} id="popup1" class="overlay">
        <div class="popup">
          <h2 style={{ textAlign: "center" }}>Ajouter un nouveau Produit</h2>
          <a class="close" onClick={() => { setPopUp1(false) }} href="#">&times;</a>
          <form action="">
            <label htmlFor="">Nom de produit</label>
            <input pattern="[A-Za-z]{2,20}" value={Row1.Prod_Name} maxlength="20" minLength={2} required type="text" className="inputPop" onChange={(e) => { setRow1({ ...Row1, Prod_Name: e.target.value }) }} />
            <label htmlFor="">Image</label>
            <input type="file" className="inputPop" onChange={(e) => uploadphoto(e)} />
            <label htmlFor="">Marque</label>
            <input maxlength={20} value={Row1.Prod_marq} minLength={2} required type="text" className="inputPop" onChange={(e) => { setRow1({ ...Row1, Prod_marq: e.target.value }) }} />
            <label htmlFor="">Categorie</label>
            <input pattern="[A-Za-z]{2,20}" maxlength="20" value={Row1.Prod_Cat} minLength={2} required type="text" className="inputPop" onChange={(e) => { setRow1({ ...Row1, Prod_Cat: e.target.value }) }} />
            <label htmlFor="">Description</label>
            <input required value={Row1.Prod_Desc} type="text" className="inputPop" onChange={(e) => { setRow1({ ...Row1, Prod_Desc: e.target.value }) }} />
            <label htmlFor="">Quantité</label>
            <input required type="number" className="inputPop" value={Row1.Prod_Qtn} onChange={(e) => { setRow1({ ...Row1, Prod_Qtn: e.target.value }) }} />

            <label htmlFor="">Cost</label>
            <input required type="number" className="inputPop" value={Row1.Prod_Cost} onChange={(e) => { setRow1({ ...Row1, Prod_Cost: e.target.value }) }} />
            <label htmlFor="">Prix unitaire </label>
            <input required type="number" className="inputPop" value={Row1.Prod_Prix_Unit} onChange={(e) => { setRow1({ ...Row1, Prod_Prix_Unit: e.target.value }) }} />
            <label htmlFor="">Disponibilité</label>
            <input required type="text" className="inputPop" value={Row1.Prod_disp} onChange={(e) => { setRow1({ ...Row1, Prod_disp: e.target.value }) }} />
            <input type="button" className="btn-d" value={'Ajouter'} onClick={Ajouter} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ListedeProduit;


