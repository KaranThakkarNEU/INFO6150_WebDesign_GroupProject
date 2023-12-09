Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up a MongoDB database and update the connection string in the application.
4. Run the application using `npm start`.


Navbar Component

Material-UI Components

- AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Avatar, Button, Tooltip: Components for building the navigation bar and associated menus.
- AdbIcon, MenuIcon: Material-UI icons used in the Navbar.

Firebase Authentication

- auth: Firebase authentication methods for user sign-out.

Next.js Router

- useRouter: A hook from Next.js for accessing the router object.

State and Hooks

- useState: Used to manage state variables like `anchorElNav` and `anchorElUser`.

Event Handlers

- handleOpenNavMenu, handleOpenUserMenu, handleCloseNavMenu, handleCloseUserMenu : Event handlers for opening and closing the navigation and user menus.




Problems Page

Material-UI Components

- TableContainer, Table, TableHead, TableRow, TableCell, TableBody: Components for creating a table to display problems.
- styled: A utility for creating styled components with Material-UI.
- Chip: A small, stylized element for displaying information.
- Button: A clickable button component.
- Box: A layout container with additional styling options.
- Skeleton: A loading placeholder for content that is still loading.
- Paper: A surface for displaying content.

Axios

- axiosInstance: An Axios instance for making HTTP requests to fetch problems.

 Next.js Router

- useRouter: A hook from Next.js for accessing the router object.

Styled Components

- StyledTableCell, StyledTableRow: Styled components for customizing the appearance of table cells and rows.

State and Hooks

- useState: Used to manage state variables like `problemsData` and `alertMsg`.

useEffect

- The `useEffect` hook is used to fetch problems data when the component mounts.

Helper Functions

- clearAlertMsg: A function to clear alert messages after a certain time.





Sign Up and Sign In page-


 Material-UI Components

- Box: A flexible layout container.
- Button: A clickable button component.
- Container: A layout container with responsive max-width.
- FormControl: Component to manage the layout of the form controls.
- FormHelperText: Provides helper text for form controls.
- IconButton: A button with an icon.
- InputLabel: Label for form controls.
- Link: A component for creating links.
- OutlinedInput: An input field with outlined style.
- Typography: A text component.

 Material-UI Icons

- VisibilityOff: Icon representing hidden visibility.
- Visibility: Icon representing visible visibility.
- AccountCircle: Icon representing an account or user.

Other Libraries

- Yup: A JavaScript schema builder for value parsing and validation.
- formik: A library for building forms with React.
- firebase: A library for using Firebase services.



 AuthContext and AuthProvider


 Firebase Authentication

- auth: An instance of Firebase authentication from `../../../firebase/clientApp`.

 React Context

- AuthContext: A context created using React's `createContext` to manage and provide user authentication information.

 React Hooks

- useState, useEffect, useContext: React hooks used for managing state, side effects, and accessing context.

 Next.js Navigation

- usePathname: A hook from Next.js for accessing the current pathname.

 AuthProvider

- AuthContext.Provider: A provider component that wraps its children and provides the user authentication context.

 useEffect for Auth State Change

- The `useEffect` hook is used to subscribe to the authentication state changes. It updates the `user` and `loading` states accordingly.

 AuthProviderProps

- children: A required prop for the `AuthProvider` component, representing the child components that should have access to the authentication context.

 useAuth Hook

- useAuth: A custom hook for consuming the authentication context. It throws an error if used outside the `AuthProviders`.



