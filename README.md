# YourZone SPA

Welcome to YourZone, a Single Page Application (SPA) designed to enhance your spiritual journey and support personal growth in various aspects of life. This project is built with React, TypeScript, and Vite for the front end, and utilizes an Apache2 server to host the SPA. The backend is powered by Express.js running in a Docker container, connecting to a MongoDB NoSQL database also housed in a Docker container. YourZone currently features "YourBible," allowing users to create, view, edit, and delete Bible verse and church sermon notes. Stay tuned for additional features focused on finances, fitness, and careers.

## Getting Started

To run YourZone locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/)
- .env file with Backend URL, NoSQL MongoDB URL, Access and Refresh token values. User roles key-pair values

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/wedunsto/YourZone2024.git
    ```

2. Navigate to the backend project directory:

    ```bash
    cd '.\ExpressJS Backend\'
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```
    
5. Navigate to the frontend project directory

   ```bash
    cd '.\React Frontend\'
    ```

7. Install dependencies:

  ```bash
    npm install
  ```

8. Start the development server:
    ```bash
    npm run dev
    ```

   The YourZone SPA will be accessible at `http://localhost:5173`.

## Features

### YourBible

YourBible is the initial feature of YourZone, focusing on spiritual development. Users can:

- Create Bible verse notes.
- Create church sermon notes.
- View existing notes.
- Edit and update notes.
- Delete notes.

## Coming Soon

Stay tuned for additional features to support your:

- Finances
- Fitness
- Careers

## Contributing

We welcome contributions! Feel free to open issues, submit pull requests, or provide feedback.

## Acknowledgments

- Thank you to the open-source community for providing essential tools and frameworks.
- Special thanks to [Vite](https://vitejs.dev/) and [Express.js](https://expressjs.com/) for making development efficient and enjoyable.
