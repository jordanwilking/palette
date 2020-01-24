import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Grid,
  Typography,
  Button,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core'
import purple from '@material-ui/core/colors/purple'

const buttonTheme = createMuiTheme({
  palette: {
    primary: purple
  }
})

const Box = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 12vw;
  background-color: ${props => props.color};
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const ColorName = styled(Typography)`
  text-align: left;
  width: 90%;
  padding-left: 0.5rem;
`

const MoreButton = styled(Button)`
  color: white;
  background-color: white;
  width: 10%;
  font-weight: 700;
`

const ButtonDiv = styled.div`
  width: 20%;
  background-color: rgba(255, 255, 255, 0.5);
  display: none;
  align-self: center;

  ${Box}:hover & {
    display: inline-block;
  }
`

class ColorBox extends Component {
  render() {
    const { color, colorName } = this.props

    return (
      <MuiThemeProvider theme={buttonTheme}>
        <Box item xs={12} sm={6} md={3} lg={1.5} color={color}>
          <ButtonDiv>
            <Button color='primary'>Copy</Button>
          </ButtonDiv>
          <Footer>
            <ColorName>{colorName}</ColorName>
            <MoreButton
              style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
              color='primary'
            >
              More
            </MoreButton>
          </Footer>
        </Box>
      </MuiThemeProvider>
    )
  }
}

export default ColorBox
