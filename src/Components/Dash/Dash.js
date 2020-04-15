import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'
import {Link, Redirect} from 'react-router-dom'

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

    logout = () => {
        axios.delete('/auth/logout')
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
        let {user, redirect} = this.state

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
            <div>   
                <h2>dash</h2>
                <button onClick={this.logout}>logout</button>
                {user.is_admin && <div>
                    <Link to='/form'>add ticket</Link>
                    <p>Company ID: {user.company_id}</p>
                    </div>}
                {mappedTickets}
            </div>
        )
    }
}

export default Dash