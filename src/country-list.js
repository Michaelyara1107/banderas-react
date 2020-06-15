import React, { useEffect, useState } from "react";
import styled from "styled-components"
import Country from "./country";
import { useSelector, useDispatch } from "react-redux";

const CountryStyled = styled.div`
  display: grid;
  grid-row-gap: 2.2em;
  background-color: var(--bg);
  padding: 4em 2em;
  border: 1px solid red;
  justify-content: center;
  //grid-template-columns: repeat(3, 1fr);
`

function CountryList() {

    const dispatch = useDispatch();
    const countryList = useSelector((state) => state.countryList );

    // const [countryList, setCountryList] = useState([]);

    useEffect( () => {

        fetch('https://restcountries.eu/rest/v2/all')
            .then( (response) => {
                return response.json();
            })
            .then((list) => {

                dispatch({
                    type: 'SET_COUNTRY_LIST',
                    payload: list
                })

            })
            .catch(() => {
                console.log('Hubo un dolor');
            })

    }, []);

    return (
        <CountryStyled>
            {
                countryList.map(({name, flag, population, region, capital}) => {
                    return (
                        <Country
                            flag={flag}
                            name={name}
                            key={name}
                            population={population}
                            region={region}
                            capital={capital}
                        />
                    );
                })
            }

        </CountryStyled>
    )
}

export default CountryList