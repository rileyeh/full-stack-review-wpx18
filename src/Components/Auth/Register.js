import React, { Component } from 'react'
import axios from 'axios'

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            admin: false,
            name: '', 
            email: '', 
            password: '', 
            id: ''
        }
    }

    register = e => {
        e.preventDefault()
        axios.post('/auth/register', this.state)
            .then(() => {
                this.props.redirect()
            })
            .catch(err => {
                console.log('error registering', err)
            })
    }

    handleChange = e => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleClick = () => {
        let {admin} = this.state
        this.setState({
            admin: !admin
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.register}>
                <input 
                    type='checkbox'
                    onChange={this.handleClick}
                    name='employee'
                    checked={!this.state.admin}
                    id='employee'/>
                <label htmlFor='employee'>employee</label>
                <input 
                    type='checkbox'
                    onChange={this.handleClick}
                    name='admin'
                    checked={this.state.admin}
                    id='admin'/>
                <label htmlFor='admin'>admin</label>
                <input
                    type='text'
                    value={this.state.name}
                    name='name'
                    onChange={this.handleChange}
                    placeholder='name'/>
                <input
                    type='text'
                    value={this.state.email}
                    name='email'
                    onChange={this.handleChange}
                    placeholder='email'/>
                <input
                    type='password'
                    value={this.state.password}
                    name='password'
                    onChange={this.handleChange}
                    placeholder='password'/>
                <input
                    type='text'
                    value={this.state.id}
                    name='id'
                    onChange={this.handleChange}
                    placeholder='id'
                    hidden={this.state.admin}/>
                <button>register</button>
                </form>
                <button onClick={this.props.toggle}>already have an account? go to login</button>
            </div>
        )
    }
}

export default Register