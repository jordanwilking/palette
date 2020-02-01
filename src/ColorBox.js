import React, { Component } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Box = styled.div`
  display: inline-block;
  position: relative;
  width: 20%;
  height: 25%;
  background-color: ${props => props.color};
  cursor: pointer;
  text-transform: uppercase;
`

const CopyOverlay = styled.div`
  opacity: 0;
  background: ${props => props.color};
  z-index: 0;
  height: 100%;
  width: 100%;
  transition: transform 0.6s ease-in-out;
  transform: scale(0.1);

  &.show {
    opacity: 1;
    transform: scale(50);
    z-index: 10;
    position: absolute;
  }
`

const CopyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 4rem;
  transform: scale(0.1);
  opacity: 0;
  z-index: 0;
  color: white;

  &.show {
    opacity: 1;
    transform: scale(1);
    z-index: 25;
    transition: all 0.4s ease-in-out;
    transition-delay: 0.3s;
  }
`

const CopiedText = styled.h1`
  font-weight: 400;
  text-shadow: 1px 2px black;
  background: rgba(255, 255, 255, 0.2);
  width: 100%;
  text-align: center;
  margin-bottom: 0;
  padding: 1rem;
`

const ColorText = styled.p`
  font-size: 2rem;
  font-weight: 100;
  text-transform: none;
  color: rgba(255, 255, 255, 0.2);
`

const BoxContent = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px;
  color: black;
  letter-spacing: 1px;
  font-size: 12px;
`

const CopyButton = styled.button`
  width: 100px;
  height: 30px;
  position: absolute;
  display: inline-block;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -15px;
  text-align: center;
  outline: none;
  background: rgba(255, 255, 255, 0.3);
  font-size: 1rem;
  line-height: 30px;
  color: white;
  border: none;
  opacity: 0;
  cursor: pointer;

  ${Box}:hover & {
    opacity: 1;
    transition: 0.5s;
  }
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const MoreButton = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  right: 0;
  bottom: 0;
  border: none;
  color: white;
  width: 60px;
  height: 30px;
  text-align: center;
  line-height: 30px;
`

class ColorBox extends Component {
  constructor(props) {
    super(props)
    this.state = { copied: false, snackbarOpen: false }
    this.changeCopyState = this.changeCopyState.bind(this)
    this.getCopyClasses = this.getCopyClasses.bind(this)
  }

  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500)
    })
  }

  getCopyClasses() {
    return this.state.copied ? 'show' : ''
  }

  render() {
    const { color, colorName } = this.props

    return (
      <>
        <CopyToClipboard text={color} onCopy={this.changeCopyState}>
          <Box color={color}>
            <CopyOverlay className={this.getCopyClasses()} color={color} />
            <CopyMessage className={this.getCopyClasses()}>
              <CopiedText>Copied!</CopiedText>
              <ColorText>{color}</ColorText>
            </CopyMessage>
            <BoxContent>{colorName}</BoxContent>
            <CopyButton>Copy</CopyButton>
            <MoreButton>More</MoreButton>
          </Box>
        </CopyToClipboard>
      </>
    )
  }
}

export default ColorBox
