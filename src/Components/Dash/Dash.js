import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'
import {Link, Redirect} from 'react-router-dom'
import './Dash.scss'
import {connect} from 'react-redux'
import {logout} from '../../Redux/reducers/user'

class Dash extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            tickets: [],
            redirect: false
        }
    } 

    componentDidMount() {
        axios.get('/auth/current')
            .then(({data: user}) => {
                this.setState({
                    user
                })
                this.getTickets()
            })
            .catch(err => {
                console.log('error getting user', err)
            })
    }   

    getTickets = () => {
        if (this.state.user.is_admin) {
            axios.get('/api/tickets')
            .then(({data}) => {
                this.setState({
                    tickets: data
                })
            })
            .catch(err => {
                console.log('error getting tickets', err)
            })
        } else {
            axios.get('/api/tickets/employee')
            .then(({data}) => {
                this.setState({
                    tickets: data
                })
            })
            .catch(err => {
                console.log('error getting tickets', err)
            })
        }
    }

    deleteTicket = id => {
        axios.delete(`/api/tickets/${id}`)
            .then(({data}) => {
                this.setState({
                    tickets: data
                })
            })
            .catch(err => {
                console.log('error deleting', err)
            })
    }

    handleLogout = () => {
        this.props.logout()
            .then(({data}) => {
                this.setState({
                    user: data,
                    redirect: true
                })
            })
            .catch(err => {
                console.log('error logging out', err)
            })
    }

    checkBox = id => {
        axios.put(`/api/tickets/${id}?complete=true`)
            .then(({data}) => {
                this.setState({
                    tickets: data
                })
            })
            .catch(err => {
                console.log('error checking off', err)
            })
    }

    render() {
        let {redirect} = this.state
        let {user} = this.props

        if (redirect) {
            return <Redirect to='/'/>
        }

        const mappedTickets = this.state.tickets
            .map(ticket => <Card 
                key={ticket.ticket_id} 
                ticket={ticket}
                user={user}
                checkBox={this.checkBox}
                deleteTicket={this.deleteTicket}/>)

        return (
            <>
                {
                    user && <div className='dash-main'>
                        <div>
                            <button onClick={this.handleLogout}>logout</button>
                            {user.is_admin && (
                                <div className='dash-admin'>
                                    <p>Company ID: {user.company_id}</p>
                                    <Link to='/form' className='link'>add ticket</Link>
                                </div>
                            )}
                        </div>
                        <section>
                            {mappedTickets}
                        </section>
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    let {data: user} = state.user
    return {user}
}

const mapDispatchToProps = {logout}

export default connect(mapStateToProps, mapDispatchToProps)(Dash)