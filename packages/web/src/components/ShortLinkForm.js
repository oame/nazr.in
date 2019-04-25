import React, { useState } from 'react'
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'

export default function ShortLinkForm() {
  const [url, setURL] = useState('')
  const [notification, setNotification] = useState(null)
  const [isFetch, setIsFetch] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    if (isFetch) {
      return
    }

    if (!url || url.indexOf('//nazr.in') > -1) {
      setNotification('Invalid URL provided')
      return
    }

    clearNotification()
    setIsFetch(true)

    try {
      const req = await fetch('/api/short_links', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
      setIsFetch(false)
      const response = await req.json()
      if (response.error) {
        return setNotification(response.error)
      }
      setURL(response.shortURL)
    } catch (err) {
      setIsFetch(false)
      setNotification('Unexpected API response: ' + err.message)
    }
  }

  function clearNotification() {
    setNotification(null)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} onFocus={clearNotification}>
        <InputContainer>
          <InputIcon>web</InputIcon>
          <Input
            placeholder="URL"
            value={url}
            onChange={(event) => setURL(event.target.value)}
          />
        </InputContainer>
        <SubmitButton>
          <SubmitIcon>{isFetch ? 'autorenew' : 'transform'}</SubmitIcon>
        </SubmitButton>
      </Form>
      <Notification onClick={clearNotification}>{notification}</Notification>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`
const Form = styled.form`
  margin: 30px 0;
  display: flex;
  flex-flow: row;

  background-color: #efefef;

  @media screen and (max-width: 600px) {
    flex-flow: column;
  }
`

const InputContainer = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  justify-self: stretch;
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  margin: 0 15px;

  border: 0;
  font-size: 20pt;
  outline: none;
  background-color: transparent;
`

const SubmitButton = styled.button.attrs({ type: 'submit' })`
  height: 90px;
  display: block;
  padding: 10px 32px;

  border: 0;
  background-color: #f0b233;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: #73706a;
  }
`

const Notification = styled.div`
  margin: 30px;
  padding: 15px;
  opacity: ${({ children }) => (children ? '1' : '0')};
  transform: translateY(${({ children }) => (children ? '0' : '20px')});

  background: #f54949;
  color: #fff;
  transition: all 0.2s ease-out;
  cursor: pointer;
`

const Icon = styled.i.attrs({
  className: 'material-icons',
})``

const InputIcon = styled(Icon)`
  margin-left: 25px;
  font-size: 40px;
  color: #9c9c9c;
  @media screen and (max-width: 400px) {
    display: none;
  }
`

const SubmitIcon = styled(Icon)`
  font-size: 33px;
  color: #fff;
`
