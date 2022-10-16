# Build 
#### Requirements:

- JDK >= 11
- nodejs >= 18.2.0

### Libiaries
**backend:**
- maven
- Springboot 2.7.3
- JPA 
- spring-boot-starter-mail
- Spring security
- spring-boot-starter-web
- mysql-connector-java
- java-jwt 3.10.3
- spring-boot-websocket 2.7.4

**frontend:**
- axios 0.27.2
- dayjs 1.11.5
- firebase 9.10.0
- net 1.0.2
- notistack 2.0.5
- react 18.2.0
- react-dom 18.2.0
- react-router-dom 6.4.1
- sockjs-client 1.6.1
- stompjs 2.3.4
- MUI 5.10.5
- @MUI/x-date-pickers

# View 
- Home page  
    - display lastest events
- Event details page 
    - display event details
    - display list of registration 
- Event post/edit page 
- Event/Registration management page 
    - display user registered event 
    - display user's event registrations
    - display user'events
- User profile page 
- Search/filter page 
- Notification Badge
- Not found page


# Working functionalities of the project

### Account Management 

- User can register, sign in and logout
- User can reset password though email and verification code  if they forgot 
- User can update their profile 
- User can upload avatar 
- Form validation
    - Email validation, format@email.com
    - Phone validation, only allow Australia phone format
    - Not-null validation 
- User can change password though email and verification code

### Event Management 
Public 
- User can view all events 

After logged in 
- User can post event 
- User can register an event 
- User can cancel the registration
- User can leave the registered event

After event owner logged in
- Owner can approve registrations of his/her event 
- Owner can rejct registrations of his/her event 
- Owner can edit event details 
- Owner can cancel event 

- Event form validation 
    - Not-null validation
    - Participant >= 0, Integer
    - Image type
    - Postcode, Australia 4-digit post code 
    - Surburb/State  Australian Surburb/State


### Search & filter

- User can search the event based on event title 
- User can search and filter events 

### Web Security

- Use json web token to verify user logged in status 
- Enable spring security 

### Notification 
- User can clear all notifications shown in the website 
- Realtime notification 
    - System will notify owner if someone has registered his/her event 
    - System will notify user if registration has been approved/rejected
    - System will notify user if their registred event has been cancel
    - System will notify user if their registred event has been updated
- Schedule notification 
    - System will send email to user one day before the event starts
    - System will send realtime notification to online user one day before the event starts




# Getting Started with Project server

Open the project and import server file into IDEA and start the project

The server will run in [http://localhost:8080](http://localhost:8080)


# Getting Started with Project client 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts


Install project dependence before start run the project, in the project direcotry, you can run:
### `npm install`


In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
