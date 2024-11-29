# Role-Based Access Control (RBAC)

This application is designed to manage users and roles along with their permissions for users. It provides functionalities to (CRUD) add, edit, and delete roles,
as well as manage their associated permissions. Same CRUD operations for Users management.
The application also includes a search functionality to filter users based on their names, role, ID, status, 
and roles based on their names and permissions.

## Key Features

### 1. **Role Management**
- Roles are fetched from a backend API (JSON server) and displayed in a table.
- Each role has associated permissions, which can be managed (added or edited or deleted).
  
### 2. **Search Functionality**
- A search bar allows filtering roles based on the **role name** and **permissions**.
- The search is case-insensitive, making it easier for users to find roles.
- same goes for users management.

### 3. **Modal for Adding/Editing Roles**
- Users can **add new roles** or **edit existing ones**, including specifying role permissions.
- Supports the addition of **custom permissions**, allowing flexibility to manage roles beyond predefined ones.
- same goes of users management.

### 4. **Snackbar Notifications**
- Feedback is provided through **snackbars** for actions like adding, editing, or deleting roles.
- The snackbar messages notify the user of successful operations (e.g., "Role added successfully", "Role Updated successfully", "Role Deleted").

## Tech Stack
- **Frontend:** React.js, Material UI
- **Backend:** JSON Server (for local development)
- **State Management:** React useState, useEffect
- **API calls:** Fetch API

## How to Run

1. Clone the repository:

```bash
git clone https://github.com/your-username/Role-Based-Access-Control.git

````
2. Install dependencies:
- (Assuming you have Node.js and npm installed)
-  Run the below command to install all the required dependencies.
  
```bash
cd Role-Based-Access-Control
npm install
````

3. Start the application:
   - Run the below command to start the project locally.
```bash
npm run dev
````
