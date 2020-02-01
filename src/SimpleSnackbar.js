import React, { Component } from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export default class SimpleSnackbar extends Component {
  render() {
    const { snackbarProps, open, close, message } = this.props
    return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message={message}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        action={
          <>
            <IconButton color='inherit' onClick={this.handleSnackbarClose}>
              <CloseIcon />
            </IconButton>
          </>
        }
        {...snackbarProps}
      />
    )
  }
}
