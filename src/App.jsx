import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImgCrypto from './img/cryptos.png'
import CurrencyForm from './components/CurrencyForm'
import Quote from './components/Quote'
import LoadingSpinner from './components/LoadingSpinner'

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
 
const Image = styled.img`
  max-width: 400px;
  
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px ;
  
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`


function App() {

  const [currencies, setCurrencies] = useState({})
  const [quote, setQuote] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
      if(Object.keys(currencies).length){
          const getQuote = async () => {
            setLoading(true)
            const {currency, cryptoCurrency} = currencies
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`
            const response = await fetch(url)
            const result = await response.json()
            console.log(result)
            setQuote(result.DISPLAY[cryptoCurrency][currency])
            setLoading(false)
          }
          getQuote()
      }
  }, [currencies])
  
  
  return (
    <Container>
      <Image 
        src={ImgCrypto}
        alt='crypto Img'
        width='80%'
        height='auto'
      />
      <div>
        <Heading>Instant Quote Crypto Currencies</Heading>
        <CurrencyForm
          setCurrencies={setCurrencies}
        />
        {loading ? <LoadingSpinner /> : (Object.keys(currencies).length) ? <Quote quote={quote}/> : ''}
      </div>
    </Container>
  )
}

export default App
