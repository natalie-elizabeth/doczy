# doczy
# ![React + Redux App + Material UI]


## Getting started



To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm start` to start the local server (this project uses create-react-app)

Local web server will use port 8008 instead of standard React's port 3000 to prevent conflicts with some backends like Node or Rails. You can configure port in scripts section of `package.json`.
 
Alternatively, you can add `.env` file in the root folder of project to set environment variables (use PORT to change webserver's port). This file will be ignored by git, so it is suitable for API keys and other sensitive stuff. Refer to [dotenv](https://github.com/motdotla/dotenv) and [React](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-development-environment-variables-in-env) documentation for more details. Also, please remove setting variable via script section of `package.json` - `dotenv` never override variables if they are already set.  

### Making requests to the backend API

If you want to change the API URL to a local server, simply edit `app.js` and change `API_ROOT` to the local server's URL (i.e. `localhost:8080/api`)



**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required except for the admin user)
- CRUD Documents
- GET and display paginated lists of documents
- View other people's documents if they are public, and/or view documents belonging to users under the same role as you.

**The general page breakdown looks like this:**

- Home page (URL: /#/ )
    - a Card containing intoduction information about the site
    - Actions that can be performed by the admin(only shown to admin)
- Sign in/Sign up pages (URL: /#/login, /#/signup )
    - Use JWT (store the token in localStorage)
- Settings page (URL: /#/settings )
- Documents page to create/edit/view documents
- Documents page 
    - Delete and update document moreverticon (only shown to document's author)
- Roles page:
    - CRUD roles
- Profile page 
    - Show basic user info
    - List of documents populated from author's created articles or author's favorited articles

<br />

