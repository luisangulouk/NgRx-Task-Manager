# NgRx Task Manager
This project has been created using NgRx(Angular Redux).

Use case: this project implements the functionality to manage tasks, using its UI users can Add, edit, delete, filter existing tasks and set a task to 'Done' or simple reactivate the task if it was previously set to 'Done'.

###  Spec:

# Server.              

GET  from http://localhost:3000/tasks ← list all todo items                 
GET /1 ← view detail of a specific todo item, where id = 1                  
POST ← creates a new todo item (as long as it has an available id)                 
PATCH /1 ← edits the todo item with id = 1             
DELETE /1 ← deletes the todo item, with id = 1               

              
###  As requested this project implements the following:

* JS code unit tests, using Jest
* Modular Angular code, lazy-loaded on route call
* Dependency injection
* Modular CSS
* Redux Lifecycle (added by choice).


### Quick start
#### clone the repo
Go to your developer folder
Clone this project repository to your local machine, by running command
`git clone https://github.com/luisangulouk/NgRx-Task-Manager.git`

#### change into the repo directory
`cd tech-test`

#### install
`npm install`

#### serve
`npm run server`                   
`npm run start`

#### Running unit tests
`npm run test`

