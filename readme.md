MVC Pattern
M - Model
V - View (exclude)
C - Controller

Use database commands
Use ORM -> Object Relational Mapper

Types of ORM
- Sequelize
- TypeORM
- Mongoose

Database
- PostgresQL

Query parameter: base_url?key=value
Path parameter: base_url/:path

Datasource -> Model -> Repository -> Service -> Controller -> Routes -> Entry file

**Assignment on 26-03-2024**
1. validate user input before registration
2. return proper response for error and success
success response: {
    status: "success",
    message: "your message",
    data: {
        name,
        email,
        etc...
    }
}
error response: {
    status: "failed",
    message: "your message"
}
3. Return error for a user that does not exist in the db
4. Update should not return 'undefined' for parameters whose values are not passed
5. I should not be able to update or delete an unexisting record


**Assignment on 03-04-2024**
1. user registration (with proper fields validation)
2. user login (with access token - Jsonwebtoken)
3. protected route (accessible by loggedin user e.g find single user endpoint, find all users endpoint, update user, delete user)
