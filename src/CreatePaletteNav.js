import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import QueueIcon from '@material-ui/icons/Queue'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const drawerWidth = 400

const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
})

const CreateHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const CreateText = styled.div`
  font-weight: 600;
  margin-left: 1rem;
  font-size: 18px;
`

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const HeaderActionsSection = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 30%;
`

class CreatePaletteNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newPaletteName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.savePalette = this.savePalette.bind(this)
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    )
  }

  savePalette() {
    this.props.savePalette(this.state.newPaletteName)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { open, openDrawer, goBack, classes } = this.props
    const { newPaletteName } = this.state

    return (
      <div>
        <CssBaseline />
        <AppBar
          position='fixed'
          color='default'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <CreateHeader>
              <HeaderLeft>
                <IconButton
                  onClick={openDrawer}
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <QueueIcon />
                </IconButton>
                <CreateText>Create A Palette</CreateText>
              </HeaderLeft>
              <HeaderActionsSection>
                <Button
                  onClick={goBack}
                  style={{ marginRight: '1rem' }}
                  color='secondary'
                  variant='contained'
                >
                  Go Back
                </Button>
                <ValidatorForm onSubmit={this.savePalette}>
                  <TextValidator
                    name='newPaletteName'
                    onChange={this.handleChange}
                    label='Palette Name'
                    value={newPaletteName}
                    validators={['required', 'isPaletteNameUnique']}
                    errorMessages={['Enter palette name', 'Name already taken']}
                  />
                  <Button type='submit' color='primary' variant='contained'>
                    Save Palette
                  </Button>
                </ValidatorForm>
              </HeaderActionsSection>
            </CreateHeader>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(CreatePaletteNav)
