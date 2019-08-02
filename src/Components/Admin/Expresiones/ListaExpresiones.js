import React, {useState} from 'react';

import {adminService} from '../../../js/webServices';

// const chunkSize = 100

export default function ListaExpresiones(props){
  // const [chunk, setChunk] = React.useState([])
  // const [top, setTop] = React.useState(chunkSize)
  //
  // const fetchResource = async expresiones => {
  //   const response await=axios.get(
  //     ({
  //       method: method,
  //       // contentType : 'application/json',
  //       url: serverUrl + service,
  //       data: params,
  //       headers: {
  //         "Authorization" : auth,
  //         "Content-Type" : 'application/json'
  //       }
  //     })
  //   ),
  //   setExpresiones(response.data)
  // }
  //
  // const fixReferencias = (referencias) => {
  //   var listaExpresiones=[]
  //   var posicActual = -1
  //   var expreActual = ""
  //   var i = 0
  //   console.log(referencias.length)
  //   while (i<referencias.length){
  //     if (expreActual != referencias[i].expresion){
  //       posicActual++
  //       expreActual = referencias[i].expresion
  //       listaExpresiones.push({
  //         clave : referencias[i].clave,
  //         expresion : referencias[i].expresion,
  //         id : referencias[i].id,
  //         index_de: referencias[i].index_de,
  //         index_es: referencias[i].index_es,
  //         orden: referencias[i].orden,
  //         pretty_e: referencias[i].pretty_e,
  //         pretty_t: referencias[i].pretty_t,
  //         referencias : [],
  //         traduccion: referencias[i].traduccion
  //       })
  //       listaExpresiones[posicActual].referencias.push({
  //         referencia_original : referencias[i].referencia_original,
  //         referencia_traduccion : referencias[i].referencia_traduccion,
  //         refid : referencias[i].refid,
  //       })
  //       i++
  //     }else{
  //       listaExpresiones[posicActual].referencias.push({
  //         referencia_original : referencias[i].referencia_original,
  //         referencia_traduccion : referencias[i].referencia_traduccion,
  //         refid : referencias[i].refid,
  //       })
  //       i++
  //       // expresiones
  //     }
  //   }
  //   setExpresiones(listaExpresiones)
  //   console.log(listaExpresiones)
  //   console.log(listaExpresiones.slice(0,100))
  //   setChunk(listaExpresiones.slice(0,100))
  //   var primerChunk = chunkSize;
  //   if (primerChunk == chunk.length){
  //     chunk.concat()
  //   }
  // }
  //
  // React.useEffect(()=>{
  //   var service = "/expresiones/al/all"
  //   webService(service, "GET", {}, (data) => {
  //     console.log(data)
  //     fixReferencias(data.data.response)
  //   })
  // }, [])

   const handleClickExpresion=(event)=>{
     props.setIdExpresion(event.target.value)
     var service = "/referencias/obtieneReferenciasByTerm/" + props.idExpresion
     adminService(service, "GET", {}, (data) =>{
       props.setExpresionSeleccionada(data.data.response[0])
     })
     adminService(("/expresiones/al/abuelosList/" + props.idExpresion),"GET", {}, (data) =>{
       props.setPadres(data.data.response[0])
     })
     adminService(("/expresiones/al/hijosList/" + props.idExpresion), "GET", {}, (datah) =>{
       props.setHijos(datah.data.response)
     })
   }

  return(
    <div className="list-container">
      <ul>
        {props.expresiones.map(expresion=>(
          <li key={expresion.id} value={expresion.id} onClick={handleClickExpresion}>
            {expresion.expresion + '//' + expresion.traduccion}
          </li>
        ))}
        </ul>
    </div>
  )
}
