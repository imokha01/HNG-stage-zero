# HNG-stage-zero
### Table of Content
1. [Task](#task)
2. [Objective](#objective)
3. [Installation](#installation)
4. [Setup Instruction](#setup-instruction)
5. [Api Endpoint](#api-endpoint)

### TASK
In this task, you'll build a simple RESTful API endpoint that returns your profile information along with a dynamic cat fact fetched from an external API.

### OBJECTIVE:
This task validates your ability to:
1. consume third-party APIs.
2. format JSON responses, and return dynamic data.
3. use Current UTC Time in ISO 8601 format.
4. using the cors middleware.
5. Add basic logging for debugging
6. integrate rate limiting to the application

### INSTALLATION:
Follow these steps to set up and run the HNG Stage 0 Backend Project locally on your machine:

1. **Clone the repository**: <br/>
Start by cloning the repository to your local machine. You can do this by running the following command in your terminal:
```bash
  git clone https://github.com/your-username/hng-stage-zero.git
```
2. **Navigate to the project directory**
Once the repository is cloned, navigate into the project directory:
```bash
  cd hng-stage-zero
```
### SETUP INSTRUCTION:
Setup the project by following the following steps:
1. **Setup the package.json file:**
   ``` bash
     npm init
   ```

2. **Install dependencies**: <br/><br/>
   Use the node package manager (*npm*) to install the depenciencies needed for the projects. <br/><br/>
    **NOTE:** <br/>
     The dependencies used in this project are:
     * express
     * cors
     * express-rate-limit
     * dotenv <br/> <br/>
    ```bash
      npm install express cors express-rate-limit dotenv
    ```
3.  **Set up environment variables**: <br/>
Create a _.env_ file in the root of the project directory to store sensitive information such as your database URI and secret keys.
    ```bash
        NAME: "Your full name"
        EMAIL: "Your email address"
        STACK: "Your backend stack"
    ```

4. Start the Server
After installing dependencies and setting up environment variables, you can start the application by running:
    ```bash
      npm run start
    ```
### API ENDPOINT
The API endpoint have the following details:
  > Method: GET <br/>
  > URL: /me <br/>
  > Content-type: application/json

The API endpoint returns JSON data with user information, timestamp (_using current UTC time ISO 8601 format_) and a random cat fact that changes at every request.

#### OUTPUT
```bash
  {
  "status": "success",
  "user": {
    "email": "ahmed.wahab.imokha@gmail.com",
    "name": "Ahmed Wahab",
    "stack": "Node.js, Express.js, MongoDB"
  },
  "timestamp": "2025-10-17T21:19:53.866Z",
  "fact": "Since cats are so good at hiding illness, even a single instance of a symptom should be taken very seriously."
}
```
