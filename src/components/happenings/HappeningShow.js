import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import MainBox from './MainBox'
import DetailsBox from './DetailsBox'

class HappeningShow extends React.Component {
  constructor() {
    super()
    this.state = {}

    this.handleDelete = this.handleDelete.bind(this)

  }

  componentDidMount() {
    axios.get(`/api/happenings/${this.props.match.params.id}`)
      .then(res => this.setState({ happening: res.data }))

  }

  handleDelete() {
    axios.delete(`/api/happenings/${this.props.match.params.id}`)
      .then(() => this.props.history.push('/happenings'))
  }
  // FM - note to self: May want to give a more developed loading page as opposed to null
  render() {
    if (!this.state.happening) return null
    console.log(this.state)
    return(
      <main>
        <div className="section">
          <div className="hero is-light">
            <div className="hero-body">
              <div className="container columns is-vcentered">
                <h1 className="title column">
                  {this.state.happening.name}
                </h1>
                <Link
                  to={`/happenings/${this.state.happening._id}/edit`}
                  className="column is-1 is-offset-3"
                >
                  <button className="button">Update</button>
                </Link>
              </div>
            </div>
          </div>
          <hr />
          <div className="container">
            <div className="columns is-variable is-4">
              <div className="column is-three-fifths">
                <MainBox {...this.state.happening} />
              </div>
              <div className="column is-two-fifths container">
                <DetailsBox
                  localTime={this.state.happening.local_time}
                  localDate={this.state.happening.local_date}
                  {...this.state.happening}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default HappeningShow
