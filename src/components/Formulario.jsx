import React, { useState } from "react";
import styled from "@emotion/styled";
import { obtenerDiferenciayear, calcularMarca, obtenerPlan } from '../helper';
import PropTypes from 'prop-types';
/*==========================================
            Componentes CSS
==========================================*/

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: 0.3s all ease;
  margin-top: 2rem;

  &:hover {
    background-color: #26c6da;
    cursor: pointer;
    border-radius: 2rem;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom:2rem;
`;

/*==========================================
                Formulario
==========================================*/

const Formulario = ({guardarResumen, guardarCargando}) => {
  const [datos, guardarDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  //Error en formulario
  const [error, guardarError] = useState(false);

  //Extraer datos del state
  const { marca, year, plan } = datos;

  //leer datos del formulario
  const obtenerDatos = (e) => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  //cuando el usuario presiona submit
  const cotizarSeguro = (e) => {
    e.preventDefault();

    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      guardarError(true);
      return;
    }

    guardarError(false);

    //Una base de $2000
    let resultado = 2000;

    //Obtenerla diferencia de años
    const diferencia = obtenerDiferenciayear(year); //console.log(diferencia);

    //Por cada año hay que restar el 3%
    resultado -= ((diferencia * 3) * resultado) / 100; //console.log(resultado;

    //Incremento de cotizador  => Americano 15% || Asiatico 5% || Europeo 30%
    resultado = calcularMarca(marca) * resultado; //console.log(resultado);

    //Incrementa el plan => Básico aumenta 20% || Completo 50%
    const incrementoPlan = obtenerPlan(plan); //console.log(incrementoPlan);
    resultado = parseFloat( incrementoPlan * resultado ).toFixed(2); //console.log(resultado);

    //muestra spiner
    guardarCargando(true);

    setTimeout(() =>{
        //oculta  spiner
        guardarCargando(false);
        //guarda la info en el componente principal
        guardarResumen({
          cotizacion: Number(resultado),
          datos
       })

    },3000);


  };

/*==========================================
            Componentes React 
==========================================*/
  return (
        <form 
            onSubmit={cotizarSeguro}
        >

            {(error)
            ?<Error>Todos los campos son obligatorios</Error>
            :null
            }

        <Campo>
            <Label>Marca</Label>

            <Select name="marca" value={marca} onChange={obtenerDatos}>
            <option>-- Seleccione una opción--</option>
            <option value="americano">Americano</option>
            <option value="europeo">Europeo</option>
            <option value="asiatico">Asiatico</option>
            </Select>
        </Campo>

        <Campo>
            <Label>Año</Label>

            <Select name="year" value={year} onChange={obtenerDatos}>
            <option value="">-- Seleccione --</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            </Select>
        </Campo>

        <Campo>
            <Label>Plan</Label>
            <InputRadio
            type="radio"
            name="plan"
            value="basico"
            checked={plan === "basico"}
            onChange={obtenerDatos}
            />
            Básico
            <InputRadio
            type="radio"
            name="plan"
            value="completo"
            checked={plan === "completo"}
            onChange={obtenerDatos}
            />
            Completo
        </Campo>

        <Boton type="submit">Cotizar</Boton>
        </form>
    );
};

Formulario.propTypes = {
  guardarResumen: PropTypes.func.isRequired,
  guardarCargando: PropTypes.func.isRequired
}

export default Formulario;
