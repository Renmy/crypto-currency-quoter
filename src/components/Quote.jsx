import styled from "@emotion/styled"

const Container = styled.div`
    color: #fff;
    display: flex;
    align-items: start;
    margin-top: 30px
`

const Image = styled.img`
    display: block;
    width: 120px;
    margin-top: 30px;
`
const Text = styled.p`
    font-size: 20px;
    span {
        font-weight: 700
    }    
`

const Price = styled.p`
    font-size: 24px;
    span {
        font-weight: 700
    }
`


const Quote = ({quote}) => {

    const { PRICE, HIGHDAY, LOWDAY,CHANGEPCT24HOUR, CHANGE24HOUR, LASTUPDATE, IMAGEURL } = quote

  return (
      <Container>
        <Image src={`https://www.cryptocompare.com${IMAGEURL}`} alt='crypto logo'/>
        <div>
            <Price>Current Price:  <span>{PRICE}</span></Price>
            <Text>Day High:  <span>{HIGHDAY}</span></Text>
            <Text>Day Low:  <span>{LOWDAY}</span></Text>
            <Text>Change 24h:  <span>{CHANGE24HOUR}</span></Text>
            <Text>Change Percent 24h:  <span>{CHANGEPCT24HOUR}</span>%</Text>
            <Text>Last Update:  <span>{LASTUPDATE}</span></Text>
        </div>
    </Container>
  )
}

export default Quote