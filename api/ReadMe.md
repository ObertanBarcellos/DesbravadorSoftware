# Desbravador Software Test
# API

# Check if you created the database in postgres
# Set your local base path in the appsettings.json file

# restore .NET dependencies
dotnet restore

# Após configurado a base faça a migration para criar os campos necessarios na base
# Run the two codes below
dotnet ef migrations add nome-da-migtarion
dotnet ef database update

# Run the code below to check if everything is ok
dotnet build

# If the build is ok, now just run the API
dotnet run

