import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectCurrency from '../hooks/useSelectCurrency'

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 20px;
    
    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
    }
`
//array for standard Currencies
const currencies = [
    { id:'USD', currency: 'United States Dollar'},
    { id:'CAD', currency: 'Canadian Dollar'},
    { id:'EUR', currency: 'Euro'},
    { id:'GBP', currency: 'British Pound Sterling'}
]


// Start Component
const CurrencyForm = ({setCurrencies}) => {

    const [ cryptos, setCryptos ] = useState([])
    const [ error, setError ] = useState(false)
    //Custom Hooks
    const [ currency, SelectCurrency ] = useSelectCurrency('Select Currency', currencies)
    const [ cryptoCurrency, SelectCryptoCurrency ] = useSelectCurrency('Top 20 Crypto Currencies', cryptos)

    //UseEffect for fecth data to fill Select with top20 cryptos
    useEffect(() => {
       const apiConsult =  async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
            const response = await fetch(url)
            const result = await response.json()
            const arrayCrypto = result.Data.map(crypto => {
                const objectCurrency = {
                    id: crypto.CoinInfo.Name,
                    currency: crypto.CoinInfo.FullName,
                }
                return (objectCurrency)
            })
            setCryptos(arrayCrypto)
       }
       apiConsult()
    }, [])

    //handle Submit Function for the form
    const handleSubmit = e => {
        e.preventDefault()
        if([currency, cryptoCurrency].includes('')){
            setError(true)
            setCurrencies({})
            return
        }
        setError(false)
        //send object with both currencies for fecth at App.jsx
        setCurrencies({
            currency,
            cryptoCurrency
        })

    }


  return (
    <>
        {error && <Error>You must select currencies</Error>}
        <form onSubmit={handleSubmit}>
            <SelectCurrency />
            <SelectCryptoCurrency />

            <InputSubmit 
                type='submit'
                value='Get Quote'
                />  
        </form>
    </>
  )
}

export default CurrencyForm