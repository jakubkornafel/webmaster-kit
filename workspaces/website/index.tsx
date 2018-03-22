import {createStore} from '@shared/utils/create-store'
import {Store} from '@website/types'
import {Provider} from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {App} from './app'

// INFO: Set this value, to save the store to localStorage on every change
const LOCAL_STORAGE_KEY = ''

ReactDOM.render(
  <Provider store={createStore(Store, LOCAL_STORAGE_KEY)}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
