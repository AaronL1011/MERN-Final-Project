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

| Component  | Material UI       | Notes               |
| :--------- | :---------------- | :------------------ |
| Page UI    | Container         | Top level component |  |
| Search bar | Custom Component  |                     |
| Nav Footer | Bottom Navigation | Actions: <li> Home <li> New Upload <li> Profile <li> Hamburger Menu  |

### Application Menu

### Search Bar

| Component      | Material UI | Options                                                                 |
| :------------- | :---------- | :---------------------------------------------------------------------- |
| Dialog UI      | Container   |                                                                         |
| Input          | Textfield   | Autocomplete                                                            |
| Search Options | Button Group  | <li> Uses Autocomplete <li> Has toggle "Grid" and "Newsfeed" with icons |

#### Notes

- Search is carried out on 'enter' being pressed (keycode '13')
- Possibly will need some form of submit button for users unaware of pressing enter  

### Newsfeed (Linear) Layout

### New Upload Page

### Profile View / Edit Profile

By defalut provides view of a user profile. When the user profile is that of the current user, options to edit the profile appear.
