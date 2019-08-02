import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

import {webService, adminService} from '../../../js/webServices';

import ListaExpresiones from './ListaExpresiones';
import Busqueda from './Busqueda';
import NuevaExpresion from './NuevaExpresion';
import ListaLetras from './ListaLetras';

export default function Expresiones(props){
  const [expresiones, setExpresiones] = React.useState([]);
  const [letraMain, setLetraMain] = React.useState('');
  const [idExpresion, setIdExpresion] = React.useState([1]);
  const [expresionSeleccionada, setExpresionSeleccionada] = React.useState([]);
  const [padres, setPadres] = React.useState([]);
  const [hijos, setHijos] = React.useState([]);

  // React.useEffect(
  //   ()=>{
  //   (letraMain =>{
  //     service = `/expresiones/al/A`
  //     webService(service, "GET", {}, (data) => {
  //       expresiones(data.data.response)
  //       })
  //      }
  //     )
  // },[letraMain])

  const fixReferencias = (referencias) => {
    var listaExpresiones=[]
    var posicActual = -1
    var expreActual = ""
    var i = 0
    console.log(referencias.length)
    while (i<referencias.length){
      if (expreActual != referencias[i].expresion){
        posicActual++
        expreActual = referencias[i].expresion
        listaExpresiones.push({
          clave : referencias[i].clave,
          expresion : referencias[i].expresion,
          id : referencias[i].id,
          index_de: referencias[i].index_de,
          index_es: referencias[i].index_es,
          orden: referencias[i].orden,
          pretty_e: referencias[i].pretty_e,
          pretty_t: referencias[i].pretty_t,
          referencias : [],
          traduccion: referencias[i].traduccion
        })
        listaExpresiones[posicActual].referencias.push({
          referencia_original : referencias[i].referencia_original,
          referencia_traduccion : referencias[i].referencia_traduccion,
          refid : referencias[i].refid,
        })
        i++
      }else{
        listaExpresiones[posicActual].referencias.push({
          referencia_original : referencias[i].referencia_original,
          referencia_traduccion : referencias[i].referencia_traduccion,
          refid : referencias[i].refid,
        })
        i++
      }
    }
    return listaExpresiones
  }

  React.useEffect(()=>{
    var service = "/expresiones/al/A"
    webService(service, "GET", {}, (data) => {
      console.log(data)
      setExpresiones(fixReferencias(data.data.response))
    })
    var service = "/referencias/obtieneReferenciasByTerm/" + idExpresion
    adminService(service, "GET", {}, (data) =>{
      setExpresionSeleccionada(data.data.response[0])
    })
    adminService(("/expresiones/al/abuelosList/" + idExpresion),"GET", {}, (data) =>{
      setPadres(data.data.response[0])
    })
    adminService(("/expresiones/al/hijosList/" + idExpresion), "GET", {}, (datah) =>{
      setHijos(datah.data.response)
    })
  }, [])

  return(
    <div>
      <div>
        <Grid container>
          <Grid item xs={12}>
            <ListaLetras letraMain={letraMain} setLetraMain={setLetraMain}/>
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container>
          <Grid item xs={3}>
            <Busqueda/>
            <ListaExpresiones expresiones={expresiones} expresionSeleccionada={expresionSeleccionada} setExpresionSeleccionada={setExpresionSeleccionada}
                idExpresion={idExpresion} setIdExpresion={setIdExpresion} padres={padres} setPadres={setPadres} hijos={hijos} setHijos={setHijos}
            />
          </Grid>
          <Grid item xs={9} align="center">
            <br/>
            <NuevaExpresion expresionSeleccionada={expresionSeleccionada} padres={padres} hijos={hijos}/>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
