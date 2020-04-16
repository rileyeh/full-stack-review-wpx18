import React from 'react'

const Card = ({ticket, user, checkBox, deleteTicket}) => {
    const {title, description, name, complete, ticket_id} = ticket
    const {is_admin: admin} = user 

    return (
        <div>
            {
                admin
                ? 
                <div className='card'>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <p>{name}</p>
                    <p>complete: {complete ? 'yes' : 'no'}</p>
                    <button onClick={() => deleteTicket(ticket_id)}>delete</button>
                </div>
                :
                <div className='card'>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <span>
                        <input type='checkbox' id='box' checked={complete} onChange={() => checkBox(ticket_id)}/>
                        <label htmlFor='box'>complete</label>
                    </span>
                </div>
            }
        </div>
    )
}

export default Card

// const style = {
//     border: '2px solid black',
//     width: 200,
//     margin: 20
// }