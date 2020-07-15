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
| Parent UI        | Container   |          |
| Email Input      | Textfield   | Required |
| Password         | Textfield   | Required |
| Confirm Password | Textfield   | Required |
| Login            | Button      |          |

### Home Landing Page

| Component         | Material UI       | Notes                                                                                                                                             |
| :---------------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| Page UI           | Container         | Top level component                                                                                                                               |
| Search bar        | Custom Component  |                                                                                                                                                   |
| Content Container | Grid List         | <li>Single column layout is achieved by setting column number to '1' <li> Multicolumn layout is created by increasing columns based on page width |
| Content Card      | Grid List Tile    | Small and large cards as a gateway to individual pieces of content                                                                                |
| Nav Footer        | Bottom Navigation | Actions: <li> Home <li> New Upload <li> Profile <li> Hamburger Menu                                                                               |

### Application Menu

| Component | Material UI | Notes                         |
| :-------- | :---------- | :---------------------------- |
| Menu      | Menu        | Holds customised menu options |

**Note:** See [demo](https://material-ui.com/components/menus/#customized-menus)

### Search Bar

| Component      | Material UI   | Options                                                                                                                      |
| :------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| Parent         | Container     |                                                                                                                              |
| Input          | Textfield     | Autocomplete                                                                                                                 |
| Search Options | Toggle Button | [Exclusive selection](https://material-ui.com/components/toggle-button/#exclusive-selection) for "Grid" and "Newsfeed" icons |

**Note:**

- Search is carried out on 'enter' being pressed (keycode '13')
- Possibly will need some form of submit button for users unaware of pressing enter

### New Upload Page

| Component       | Material UI                                                                                   | Notes                                               |
| :-------------- | :-------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| Parent          | [Long Scrolling Dialogue](https://material-ui.com/components/dialogs/#scrolling-long-content) | Comes up from bottom of screen and holds all fields |
| Image Thumbnail | Custom Component | 

### Profile View / Edit Profile

By default provides view of a user profile. When the user profile is that of the current user, options to edit the profile appear.

| Component | Material UI | Notes |
| :-------- | :---------- | :---- |
