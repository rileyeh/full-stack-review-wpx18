import React, { Component } from 'react'
import axios from 'axios'
import './Form.scss'

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
            title: '',
            description: '',
            selected: ''
        }
    }

    componentDidMount() {
        axios.get('/api/employees')
            .then(({data}) => {
                this.setState({
                    employees: data
                })
            })
            .catch(err => {
                console.log('error getting employees', err)
            })
    }

    createTicket = e => {
        e.preventDefault()
        const {title, description, selected, employees} = this.state
        const index = employees.findIndex(employee => employee.name === selected)
        const {user_id: employee} = this.state.employees[index]
        const newTicket = {title, description, employee}
        axios.post('/api/tickets', newTicket)
            .then(() => {
                this.props.history.push('/dash')
            })
            .catch(err => {
                console.log('error creating ticket', err)
            })
    }

    handleChange = e => {
        let {value, name} = e.target
        this.setState({
            [name] : value
        })
    }

    render() {
        const mappedEmployees = this.state.employees.map(employee => {
            return (
                <option key={employee.user_id}>{employee.name}</option>
            )
        })
        return (
            <div className='form-main'>
                <form onSubmit={this.createTicket}>
                    <span>
                        <label>title: </label>
                        <input 
                            type='text'
                            onChange={this.handleChange}
                            name='title'
                            value={this.state.title}
                            placeholder='title'/>
                    </span>
                    <span>
                        <label htmlFor='select'>employee: </label>
                        <select
                            onChange={this.handleChange}
                            name='selected'
                            id='select'
                            value={this.state.selected}>
                            <option>select...</option>
                            {mappedEmployees}
                        </select>
                    </span>
                    <span>
                        <label>description: </label>
                        <input 
                            type='text'
                            onChange={this.handleChange}
                            name='description'
                            value={this.state.description}
                            placeholder='description'/>
                    </span>
                    <button>save</button>
                </form>
            </div>
        )
    }
}

export default Form