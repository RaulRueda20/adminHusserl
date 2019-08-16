import React from 'react';
import classNames from 'classnames';

export default function ListaClaves(props){
  var pasajeSeleccionado = props.pasajeId

  console.log("pasaje seleccionado en la lista", pasajeSeleccionado)
  return(
    <div>
      <ul className="list-containerP">
        {props.pasajes.map(referencia=>(
          <li id={referencia.ref_id} key={referencia.ref_id} className={classNames({"selected" : referencia.ref_id == pasajeSeleccionado}, "sideList")} onClick={() => props.setPasajeId(referencia.ref_id)}>
            {referencia.ref_id + ": " + referencia.ref_libro_de + " // " + referencia.ref_libro_es}
          </li>
        ))}
      </ul>
    </div>
  )
}
