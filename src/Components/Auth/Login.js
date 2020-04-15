import React, { Component } from 'react' 
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '', 
            password: ''
        }
    }

    login = e => {
        e.preventDefault()
        axios.post('/auth/login', this.state)
            .then(() => {
                this.props.redirect()
            })
            .catch(err => {
                console.log('error loggin in', err)
            })
    }

    handleChange = e => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.login}>
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
                    <button>login</button>
                </form>
                <button onClick={this.props.toggle}>need to register?</button>
            </div>
        )
    }
}

export default Login