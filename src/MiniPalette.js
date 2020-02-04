import React, { Component } from 'react'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete'
import mediaSizes from './mediaSizes'

const Box = styled.div`
  position: relative;
  width: 30%;
  height: 20%;
  background-color: white;
  margin-bottom: 2rem;
  border-radius: 5px;
  cursor: pointer;

  @media (max-width: ${mediaSizes.md}) {
    width: 45%;
  }

  @media (max-width: ${mediaSizes.xs}) {
    width: 100%;
  }
`

const DeleteContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-color: #eb3d30;
  color: white;
  padding: 0.5rem;
  z-index: 1;
  opacity: 0;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  ${Box}:hover & {
    opacity: 1;
  }
`

const PalettePreview = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  margin: 0.5rem;
  height: 70%;
  border-radius: 5px;
  background-color: #dae1e4;
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
  align-items: center;
  height: 20%;
  margin: 0.5rem;
`

const PaletteName = styled.div`
  font-weight: 700;
`

class MiniPalette extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.palette.id)
  }

  handleDelete(e) {
    e.stopPropagation()
    this.props.onDelete(this.props.id)
  }

  render() {
    const { palette } = this.props

    return (
      <>
        <Box onClick={this.handleClick}>
          <DeleteContainer onClick={this.handleDelete}>
            <DeleteIcon />
          </DeleteContainer>
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
