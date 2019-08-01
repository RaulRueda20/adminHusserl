import React from 'react';

export default function ListaClaves(props){

  console.log("los pasajes mostrados", props.pasajes)
  return(
    <div className="list-container">
      <ul>
        {props.pasajes.map(referencia=>(
          <li key={referencia.ref_id}>
            {referencia.ref_id + ": " + referencia.ref_libro_de + " // " + referencia.ref_libro_es}
          </li>
        ))}
      </ul>
    </div>
  )
}
