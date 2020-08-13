import React from 'react';
import styled from '@emotion/styled';
import {primerMayuscula} from '../helper';
import PropTypes from 'prop-types';

/*==========================================
                Componentes CSS
==========================================*/
const ContenedorResumen = styled.div`
  padding: .5rem;
  text-align: center;
  background-color: #00838f;
  color: #fff;
  margin-top: 1rem;
  transition: .3s all ease;
  &:hover {
    background-color: #26c6da;
    border-radius: 2rem;
  }
`;

/*==========================================
                Resumen
==========================================*/
const Resumen = ({datos}) => {

    //Extraer datos
    const {marca, year, plan} = datos;

    if(marca ===  '' || year === '' || plan === '') return null;

    return ( 
    
        <ContenedorResumen>
            <h2>Resumen de Cotización</h2> 
            <ul>
                <li>Marca: {primerMayuscula(marca)} </li>
                <li>Plan: {primerMayuscula(plan)} </li>
                <li>Año del automovil: {primerMayuscula(year)} </li>
            </ul>
        </ContenedorResumen>
        
        
    );
}
 
Resumen.propTypes ={
  datos: PropTypes.object.isRequired
}

export default Resumen;