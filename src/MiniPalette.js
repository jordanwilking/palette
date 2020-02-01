import React, { Component } from 'react'
import styled from 'styled-components'

const Box = styled.div`
  width: 30%;
  height: 20%;
  background-color: white;
  margin-bottom: 2rem;
  border-radius: 5px;
  cursor: pointer;
`

const PalettePreview = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  margin: 0.5rem;
  height: 70%;
  border-radius: 5px;
  overflow: hidden;
`

const MiniColorBox = styled.div`
  display: inline-block;
  position: relative;
  width: 20%;
  height: 25%;
  background-color: ${props => props.color};
`

const MiniPaletteFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.5rem;
`

const PaletteName = styled.div`
  font-weight: 700;
`

class MiniPalette extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.palette.id)
  }

  render() {
    const { palette } = this.props

    return (
      <>
        <Box onClick={this.handleClick}>
          <PalettePreview>
            {palette.colors.map(color => (
              <MiniColorBox key={color.name} color={color.color} />
            ))}
          </PalettePreview>
          <MiniPaletteFooter>
            <PaletteName>{palette.paletteName}</PaletteName>
            <div>{palette.emoji}</div>
          </MiniPaletteFooter>
        </Box>
      </>
    )
  }
}

export default MiniPalette
