const bcrypt = require('bcryptjs')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123456789')
const userData = [
    {username : 'Dodo', password: password,  email :'thidsadee2000@gmail.com', phone: '0829913450', sex: 'man', age: '20', user_role: 'USER'},
    {username : 'do', password: password,  email : 'sureelux2545@gmail.com', phone : '098888888', sex: 'women', age: '19', user_role: 'ADMIN'}
]

// const todoData = [
//     { title:'Learn HTML', duedate: new Date(), userId: 7},
//     { title:'Learn CSS', duedate: new Date(), userId: 4},
//     { title:'Learn JS', duedate: new Date(), userId: 8},
//     { title:'Learn React', duedate: new Date(), userId: 9}
// ]


const run = async() => {      
    await prisma.user.createMany({
        data: userData
    })
    // await prisma.todo.createMany({
    //     data : todoData
    // })
}

run()