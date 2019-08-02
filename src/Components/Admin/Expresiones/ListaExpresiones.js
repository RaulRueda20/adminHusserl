import React, {useState} from 'react';
import classNames from 'classnames';

export default function ListaExpresiones(props){

  const handleClickExpresion=(event)=>{
    props.setIdExpresion(event.target.value)
  }

  return(
    <div className="list-container">
      <ul>
        {props.expresiones.map(expresion=>(
          <li className={classNames({"selected" : expresion.id === props.idExpresion})} key={expresion.id} value={expresion.id} onClick={handleClickExpresion}>
            {expresion.id + " - " + expresion.expresion_de + '//' + expresion.expresion_es}
          </li>
        ))}
        </ul>
    </div>
  )
}
