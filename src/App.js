import { useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import { SlMap } from "react-icons/sl";
import './styles.css';
import api from './services/api';

function App() {

  const [input,setInput]=useState('')
  const [cep,setCep]=useState({})
  async function handleSearch(){
    if(input === ''){
      alert("Preencha com o CEP")
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");
    } catch (error) {
      alert("erro");
      setInput("")
    }
  }

  function MapSearch() {
    const cepValue = cep.cep;
    
    if (cepValue.length > 0) {
      const googleMapsURL = `https://www.google.com/maps/dir/?api=1&destination=${cepValue}`;
      window.open(googleMapsURL, '_blank');
    } else {
      alert("Erro: CEP não foi preenchido.");
    }
  }
  

  return (
  
    <div className="container">
      <h1 className="title">Buscar CEP </h1>
      <div className="containerInput">
        <input
        type="title"
        placeholder="Digite o seu Cep"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={12} color='#260994'/>
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
      <main className='main'>
        <h2> CEP: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>{cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span> 
        <button className="buttonMap" onClick={MapSearch}>
            <SlMap size={12} color='#FFF'/>
        </button>
      </main>     
    )}   
    </div>
  );
}

export default App;
