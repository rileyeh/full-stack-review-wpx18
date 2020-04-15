import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'
import { Redirect } from 'react-router-dom'

class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            display: true,
            redirect: false
        }
    }

    toggleLogin = () => {
        let {display} = this.state
        this.setState({
            display: !display
        })
    }

    toggleRedirect = () => {
        let {redirect} = this.state 
        this.setState({
            redirect: !redirect
        })
    }

    render() {
        const {display, redirect} = this.state

        if (redirect) {
            return <Redirect to='/dash'/>
        }

        return (
            <div>
                {
                    display
                    ?
                    <Login 
                        toggle = {this.toggleLogin}
                        redirect = {this.toggleRedirect}/>
                    :
                    <Register 
                        toggle = {this.toggleLogin}
                        redirect = {this.toggleRedirect}/>
                }
            </div>
        )
    }
}

export default Auth
