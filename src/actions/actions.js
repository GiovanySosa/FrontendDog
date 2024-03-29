import axios from 'axios';

export function getId(id) {
  if(id === undefined){
    return async function(dispatch) {
      dispatch({ type: GET_ID, payload: undefined })
    }
  }
  return async function(dispatch) {
    console.log(id)
    const result = await axios.get("https://kingdogsapi.herokuapp.com/dogs/" + id);
    console.log(id)
    dispatch({ type: GET_ID, payload: result.data });
  };
}


export function getRazas(raza) {
    if(raza === undefined) {
      return function(dispatch) {
        dispatch({ type: GET_RAZAS, payload: undefined });
      }
    }
    return async function(dispatch) {
      const result = await axios.get("https://kingdogsapi.herokuapp.com/dogs?name=" + raza);
      dispatch({ type: GET_RAZAS, payload: result.data })
    }
  }



export function getTemps(temp) {
  return function(dispatch) {
    return axios.get("https://kingdogsapi.herokuapp.com/dogs")
      .then(result => {
        const razas = []
        result.data.forEach(e => {if(e.temperamento && e.temperamento.toLowerCase().includes(temp)){razas.push(e)}})
        dispatch({ type: GET_TEMPS, payload: razas });
      }).catch(err => {
        console.log(err)
      })
  };
}



  export const GET_RAZAS = "GET_RAZAS"
  export const GET_TEMPS = "GET_TEMPS"
  export const GET_ID = "GET_ID"