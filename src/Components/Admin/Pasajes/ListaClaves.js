import React from 'react';
import classNames from 'classnames';

export default function ListaClaves(props){
  var pasajeSeleccionado = props.pasajeId
  console.log("los pasajes mostrados", pasajeSeleccionado)
  return(
    <div className="list-container">
      <ul>
        {props.pasajes.map(referencia=>(
          <li key={referencia.ref_id} className={classNames({"selected" : referencia.ref_id == pasajeSeleccionado}, "sideList")} onClick={() => props.setPasajeId(referencia.ref_id)}>
            {referencia.ref_id + ": " + referencia.ref_libro_de + " // " + referencia.ref_libro_es}
          </li>
        ))}
      </ul>
    </div>
  )
}
