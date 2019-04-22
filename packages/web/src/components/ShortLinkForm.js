import React, { useState } from 'react'
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'

export default function ShortLinkForm() {
  const [url, setURL] = useState('')
  const [notification, setNotification] = useState('')
  const [isFetch, setIsFetch] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsFetch(true)

    if (!url || url.indexOf('//nazr.in') > -1) {
      return
    }

    const response = await fetch('/api/short_links', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })
    const { error, shortURL } = await response.json()

    setIsFetch(false)

    if (error) {
      setNotification(error)
      return error
    }

    setURL(shortURL)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <InputIcon>web</InputIcon>
          <Input
            placeholder="URL"
            value={url}
            onChange={(event) => setURL(event.target.value)}
          />
        </InputContainer>
        <SubmitButton>
          <SubmitIcon>transform</SubmitIcon>
        </SubmitButton>
      </Form>
      <Notification>{notification}</Notification>
    </Container>
  )
}

const Icon = styled.i.attrs({
  className: 'material-icons',
})``

const InputIcon = styled(Icon)`
  margin-left: 25px;
  font-size: 40px;
  color: #9c9c9c;
`

const SubmitIcon = styled(Icon)`
  font-size: 33px;
  color: #fff;
`

const Container = styled.div`
  width: 100%;
`
const Form = styled.form`
  margin: 30px 0;
  width: 100%;
  height: 90px;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  background-color: #efefef;
`

const InputContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  flex-grow: 1;
  border: 0;
  font-size: 20pt;
  padding: 0 15px;
  outline: none;
  background-color: transparent;
`

const SubmitButton = styled.button.attrs({ type: 'submit' })`
  border: 0;
  background-color: #f0b233;
  padding: 10px 32px;
  cursor: pointer;
  &:hover {
    background-color: #73706a;
  }
`

const Notification = styled.div``
