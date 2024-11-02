# Full Stack Money Transfer App

## Project Description

This is a full-stack application that allows users to send money to their friends, similar to the functionality provided by Paytm. Users can create accounts, log in, check their account balance, and transfer money seamlessly.

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Features

- **User Registration and Authentication:** Users can sign up and log in securely.
- **Account Balance Management:** Users can retrieve their current account balance.
- **Money Transfer:** Users can send money to their friends easily by entering their details.
- **User Management Interface:** Users can view and manage their friends and transactions.
- **Responsive Design:** Fully responsive design for mobile and desktop devices.

## API Endpoints

### User Endpoints

- `GET /api/v1/user/bulk` - Fetch a list of users.
- `POST /api/v1/user/create` - Create a new user.

### Account Endpoints

- `GET /api/v1/account/balance` - Retrieve user account balance.
- `POST /api/v1/account/transfer` - Transfer money to another account.

### Authentication Endpoints

- `POST /api/v1/auth/login` - Log in a user.
- `POST /api/v1/auth/register` - Register a new user.

## Environment Variables

Create a `.env` file in the `./backend` directory with the following variables:


## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
