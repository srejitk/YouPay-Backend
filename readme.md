# YouPay Lending App

A Money lending app concept that allows you to send money requests through UPI

## Demo

https://youpay.vercel.app/

### Guest Login Details

Username : `9900990099`
Password : `password`

## Backend of YouPay

[YouPay Frontend](https://github.com/srejitk/YouPay)

## Tech Stack

**Client:** React, useContext, TailwindCSS

**Server:** Express, MongoDB, Mongoose

**Tools:** ESLint, Prettier

## Run it locally

Run the app by first directing to youpay and then running npm i to install the dependencies

### YouPay Frontend Setup

```bash
  cd youpay
  npm install
  npm run dev
```

### YouPay Backend Setup

```bash
  npm install
  nodemon index.js
```

**NOTE:** Update **BACKEND_URL** env in Frontend if running backend locally

## Environment Variables

### YouPay Frontend ENV

To run this project, you will need to add the following environment variables to your .env file

| ENV NAME           | Description                            |
| :----------------- | :------------------------------------- |
| `VITE_BACKEND_URL` | `https://youpay-backend.herokuapp.com` |

### YouPay Backend ENV

| ENV NAME         | Description                                                                                       |
| :--------------- | :------------------------------------------------------------------------------------------------ |
| `CONNECTION_URL` | `mongodb+srv://srejitk:.TNRkQ-PckqF8JC@cluster0.yboajpt.mongodb.net/?retryWrites=true&w=majority` |
| `SECRET_KEY`     | `Enter You Secret Token Here`                                                                     |
| `PORT`           | `Enter the Port you wish to use. Default : 6001`                                                  |

## API Reference

#### Signin

```http
  POST https://youpay-backend.herokuapp.com/auth/signin
```

| Parameter  | Type       | Description                      |
| :--------- | :--------- | :------------------------------- |
| `Mobile`   | `number`   | **Required**. Mobile No. of user |
| `Password` | `password` | **Required**. Password of user   |

#### Signup

```http
  POST https://youpay-backend.herokuapp.com/auth/signup
```

| Parameter  | Type       | Description                      |
| :--------- | :--------- | :------------------------------- |
| `Name`     | `string`   | **Required**. Name of user       |
| `Password` | `password` | **Required**. Password of user   |
| `Mobile`   | `number`   | **Required**. Mobile No. of user |
| `Gender`   | `string`   | **Required**. Gender of user     |

#### Send Borrow Request

```http
  POST https://youpay-backend.herokuapp.com/borrow
```

| Parameter  | Type     | Description                         |
| :--------- | :------- | :---------------------------------- |
| `Amount`   | `number` | **Required**. Amount to borrow      |
| `Message`  | `string` | **Required**. Reason for borrowing  |
| `Duration` | `string` | **Required**. Duration of borrowing |
| `UPI`      | `string` | **Required**. UPI of lender         |

## Challenges

- Not having worked with Express/MongoDB before, this was a challenging task to see through
- Idealising how to create my Rest API and proceed from Frontend to Backend or vice-versa

## Future Scope Of Improvement

- Using a WebSocket to provide realtime notifications to lenders
- Calculating Credit Score based on repayment/defaulting
- Adding OTP Verification
