# Desbravador Software Test

Welcome to the project repository! This project consists of a full-stack application, with a frontend developed in React using TypeScript and a backend in .NET. Below, you will find all the easy instructions to set up and run the project locally.

## Prerequisites

Before you begin, make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (package manager)
- [.NET SDK](https://dotnet.microsoft.com/download) (v8 or higher)

## Project Configuration

### 1. Install Frontend Dependencies

Navigate to the frontend folder and install the required dependencies:

    cd frontend
    pnpm install

### 2. Install Backend Dependencies

Navigate to the API folder and restore the .NET dependencies:

    cd ../api
    dotnet restore

### 3. Configure database in API

Check the base is configured in the appsettings.json file!

I had a problem with the migrations in which I could not rollback. So I adjusted my database manually and adjusted the models, in principle it is to be correct. If you have problems you can put all the fields in the database with the possibility of being null except the Id, ProjectId and Dates fields.

Perform the migrations to create the database tables:

    dotnet ef migrations add nome-da-migtarion
    dotnet ef database update

## Running the Project

### 1. Start the Backend

Navigate to the API folder and check if everything is correct:

    cd api
    dotnet build

Run the project:

    dotnet run

### 2. Start the Frontend

Navigate to the frontend folder and start the development server:

    cd ../frontend
    pnpm run dev

## Project Structure

    /frontend: Contains the source code of the frontend in React with TypeScript.

        src/: Main folder of the React code.

        public/: Static files like index.html.

    /api: Contains the source code of the API in .NET.

        Controllers/: API controllers.

        Models/: Data models.

        appsettings.json: Database configuration.

        Program.cs: Application entry point.


## Useful Commands

Install frontend dependencies:

    pnpm install

Run the frontend in development mode: 

    pnpm run dev

Run the API: 

    dotnet run

Restore .NET dependencies: 

    dotnet restore

#
### Made with ❤️ by Obertan Barcellos
