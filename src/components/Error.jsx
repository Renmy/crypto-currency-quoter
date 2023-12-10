import styled from '@emotion/styled'

const ErrorMsg = styled.div`
    background-color: #e26f69;
    color: #fff;
    padding: 8px;
    font-size: 22px;
    font-weight: 400;
    text-align: center;
    border-radius: 5px;
`

const Error = ({children}) => {
  return (
    <ErrorMsg>
        {children}
    </ErrorMsg>
  )
}

export default Error