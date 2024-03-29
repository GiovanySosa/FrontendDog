import { Link } from 'react-router-dom';
import{ getRazas, getTemps, getId } from '../actions/actions'
import React, { useState } from 'react';
import { connect } from "react-redux";
import './home.css';
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

const  Home = (props) => {
    const [raza, setRaza] = useState('');
    const [filter, setFilter] = useState('Breed')
    const [order, setOrder] = useState('a-z')
    const [page, setPage] = useState(0)
    const [searching, setSearching] = useState(false)
    const [ascenDescen, setAscenDescen] = useState('BiUpArrowAlt')


    let handleChange = function (e) {
        setRaza(e.target.value);
    }

    let handleSubmit = function(e) {
        e.preventDefault(); 
        props.getRazas(undefined)
        setSearching(true)
        setPage(0)
        if(filter === 'Breed') props.getRazas(raza.toLowerCase())
        if(filter === 'Temperament') props.getTemps(raza.toLowerCase())
    }
    let toggleFilter = function(e){
      e.preventDefault();
      if(filter === 'Breed'){
        setFilter('Temperament')
      }
      else {  
        setFilter('Breed')    
      }
    }
    let toggleascenDescen = function (e) {
      e.preventDefault();
      if (ascenDescen === 'BiDownArrowAlt') {
        setAscenDescen('BiUpArrowAlt')
        props.razas && props.razas.reverse()
      }
      else {
        setAscenDescen('BiDownArrowAlt')
        props.razas && props.razas.reverse()
      }
    }
    let toggleOrder = function(e){
      e.preventDefault(); 
      if(order === 'a-z'){
          setOrder('Weight')
          props.razas && props.razas.sort((a, b) => ( parseInt(a.peso.slice(0 , 3)) > parseInt(b.peso.slice(0 , 3))) ? 1 : -1)
      }
      if(order === 'Weight') {
          setOrder('a-z')
          props.razas && props.razas.sort((a, b) => (a.nombre.toLowerCase() > b.nombre.toLowerCase()) ? 1 : -1)
      }
    }
    let nextPage = function(e){
      e.preventDefault(); 
      if(props.razas.length >= page*8+8)
        setPage(page+1)      
    }
    let prevPage = function(e){
      e.preventDefault();
      if(page>0) setPage(page-1)
    }
    return (
         <div className='homeCointainter'>
        <div className='bar'>  
        <form className="formContainer" onSubmit={(e) => handleSubmit(e)} >
            <input
              className='input'
              type="text"
              autoComplete="off"
              placeholder="Search by breed or temperament"
              value={raza}
              onChange={(e) => handleChange(e)}
            />
            <button className='btn' type="submit">Search</button>
            <span className='barItem'>Filter:</span>
            <button className='btn' onClick={(e) => toggleFilter(e)}>{filter}</button>       
            {props.razas && props.razas.length > 0 ? 
            <div className='orderContainer'>
            <span className='barItem' >Order:</span>
            <button className='btn' onClick={(e) => toggleOrder(e)}>{order}</button>
            <button className='btn5' onClick={(e) => toggleascenDescen(e)}>
                {ascenDescen === 'BiUpArrowAlt' && <BiUpArrowAlt />}
                {ascenDescen === 'BiDownArrowAlt' && <BiDownArrowAlt />}
            </button>
            </div>
            : null
          }      
          <Link className='btnCreate' to='/creation'>
            <button className='btn2'>add breed</button>
          </Link>  
          </form>
        </div>
        <div className='pageBox'>
          <div className='cardsBox'>
            {props.razas && props.razas.length > 0 ? props.razas.slice(page*8, page*8+8).map((e) => {
              return(
                <Link className='links' key={e.id} to={`/details/${e.id}`}>                
                  <div  onClick={() => {props.getId(undefined)}} 
                    className='razaCard'>
                    <img className='imgCard' src={e.imagen} alt="" /> <br/>
                     <div className='textCard'>
                     <div className='textDetItem2'> <span className='homeName'>Name: {e.nombre}</span> </div>
                     <div className='textDetItem2'> <span>Temperament(s): </span><span>{e.temperamento}</span> </div>
                     <div className='textDetItem2'> <span>weight: </span><span>{e.peso}&nbsp;kg</span> </div>
                    </div>
                  </div>
                </Link>
                  )
            })
            : props.razas && props.razas.length < 1? <div className='razaCardNotFound'>
              <img className='imgCard2' src='https://cdn-icons-png.flaticon.com/512/91/91527.png' alt="" />
              <span className='textCardNotFound'>Sorry, but we couldn't find any breed to match your search!</span>
              </div> 
            : searching &&
              <div className='loadingHome'>
                  <img className="loadinggg"src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' alt="" />
                  <span className='loadingg'>Loading..</span>
              </div>                             
            }
          </div>       
        </div>
        {props.razas && props.razas.length > 0 ? 
           <div className='btnPageBox'>
            <button className='btnPage' onClick={(e) => prevPage(e)}>back</button>
            <span className='numberPage'>{page + 1}/{Math.ceil(props.razas.length/8)}</span>
            <button className='btnPage' onClick={(e) => nextPage(e)}>next</button>   
           </div>
          : null
          }   
      </div>      
    )
  };
  function mapStateToProps(state) {
    return {
        razas:state.razas
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getRazas: raza => dispatch(getRazas(raza)), 
      getTemps: temp => dispatch(getTemps(temp)),
      getId: id => dispatch(getId(id)),
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);
