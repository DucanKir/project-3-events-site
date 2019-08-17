import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// import Home from './components/pages/Home'
import Navbar from './components/common/Navbar'
// import SecureRoute from './components/common/SecureRoute'
// import Navbar from './components/common/Navbar'

// import HappeningIndex from './components/happenings/HappeningIndex'

import HappeningShow from './components/happenings/HappeningShow'

// import HappeningEdit from './components/happenings/HappeningEdit'
import HappeningNew from './components/happenings/HappeningNew'
// import UserIndex from './components/happenings/UserIndex'


import UserShow from './components/users/UserShow'
import UserEdit from './components/users/UserEdit'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

// import '@fortawesome/fontawesome-free/js/all.js'
import 'react-toastify/dist/ReactToastify.css'
import 'bulma'
import './style.scss'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Navbar />
        <ToastContainer position="bottom-right" hideProgressBar={true} />
        <Switch>

          <Route path="/happenings/new" component={HappeningNew} />
          <Route path="/users/:id/edit" component={UserEdit} />
          <Route path="/happenings/:id" component={HappeningShow} />
          <Route path="/users/:id" component={UserShow} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />

        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
