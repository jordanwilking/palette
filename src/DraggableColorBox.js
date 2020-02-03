import React, { Component } from 'react'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete'
import { SortableElement } from 'react-sortable-hoc'

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 20%;
  height: 25%;
  background-color: ${props => props.color};
  cursor: pointer;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  letter-spacing: 1px;
  margin: 0.5rem;
  color: rgba(0, 0, 0, 0.5);
`

const Delete = styled(DeleteIcon)`
  && {
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }

  ${Box}:hover & {
    color: white;
    transform: scale(1.5);
  }
`

class DraggableColorBox extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    this.props.onDelete(this.props.name)
  }

  render() {
    const { color, name } = this.props

    return (
      <Box color={color}>
        <Bottom>
          {name}
          <Delete onClick={this.handleDelete} />
        </Bottom>
      </Box>
    )
  }
}

export default SortableElement(DraggableColorBox)
