module.exports = {
    getTicketsByAdmin: async (req, res, next) => {
        try {
            const db = req.app.get('db')
            const {company_id} = req.session.user
            const tickets = await db.tickets.get_tickets_by_admin(company_id)
            res.status(200).send(tickets)
        } catch (error) {
            console.log('error getting tix', error)
            res.status(500).send(error)
        }
    },
    createTicket: async (req, res, next) => {
        try {
            const db = req.app.get('db')
            const {title, description, employee} = req.body
            const {company_id} = req.session.user
            const tickets = await db.tickets.create_ticket({title, description, employee, company_id})
            res.status(200).send(tickets)
        } catch (error) {
            console.log('error create tix', error)
            res.status(500).send(error)
        }
    },
    deleteTicket: async (req, res, next) => {
        try {
            const db = req.app.get('db')
            const {id} = req.params
            const {company_id} = req.session.user
            const tickets = await db.tickets.delete_ticket({company_id, id}) 
            res.status(200).send(tickets)
        } catch (error) {
            console.log('error deleting tix', error)
            res.status(500).send(error)
        }
    },
    getTicketsByEmployee: async (req, res, next) => {
        try {
            const db = req.app.get('db')
            const {user_id} = req.session.user
            const tickets = await db.tickets.get_tickets_by_employee(user_id)
            res.status(200).send(tickets) 
        } catch (error) {
            console.log('error getting tix - employee', error)
            res.status(500).send(error)
        }
    },
    updateTicket: async (req, res, next) => {
        try {
            const db = req.app.get('db')
            const {complete} = req.query
            const {id} = req.params
            const {user_id} = req.session.user
            const tickets = await db.tickets.update_ticket({complete, id, user_id})
            res.status(200).send(tickets)
        } catch (error) {
            console.log('error updating tix - employee', error)
            res.status(500).send(error)
        }
    },
    getEmployeesByAdmin: async (req, res, next) => {
        try {
            const db = req.app.get('db')
            const {user_id, company_id} = req.session.user
            const employees = await db.tickets.get_employees_by_admin({user_id, company_id})
            res.status(200).send(employees)
        } catch (error) {
            console.log('error getting employees', error)
            res.status(500).send(error)
        }
    }
}