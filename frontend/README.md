# Grup Grup Front End

A React framework based front-end for the 'Grup Grup' application.

## Material UI (Google)

The [Material UI](https://material-ui.com/) library is utilised to make standardised UI components.

## Component Breakdown

### Base Components

Unless specified, these components are basic building blocks of the UI for the application.

| Component     | Material UI | Options set as default |
| :------------ | :---------- | :--------------------- |
| Dialog UI     | Container   |                        |
| Text Input    | Textfield   | Variant: Outlined      |
| Dialog Button | Button      | Variant: Outlined      |
| Link          | Link        | Variant: Inherit       |

### Login Dialog

| Component   | Material UI | Options        |
| :---------- | :---------- | :------------- |
| Dialog UI   | Container   |                |
| Email Input | Textfield   | Required       |
| Password    | Textfield   | Type: Password |
| Login       | Button      |                |
| Signup Link | Link        |                |

### Sign Up Dialog

| Component        | Material UI | Options  |
| :--------------- | :---------- | :------- |
| Dialog UI        | Container   |          |
| Email Input      | Textfield   | Required |
| Password         | Textfield   | Required |
| Confirm Password | Textfield   | Required |
| Login            | Button      |          |

### Home Landing Page

| Component  | Material UI       | Notes                                                                                                   |
| :--------- | :---------------- | :------------------------------------------------------------------------------------------------------ |
| Page UI    | Container         | Top level component                                                                                     |
| Top menu   | App Bar           | <li> Hamburger menu icon <li> Application Title                                                         |
| Search bar | Textfield         | <li> Uses Autocomplete <li> Has toggle options for "Grid" and "Newsfeed" with icons |  |
| Nav Footer | Bottom Navigation | Maximum 5 actions                                                                                       |

### Newsfeed (Linear) Layout

### New Upload Page

### Profile View

### Edit Profile
