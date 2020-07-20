# Grup Grup Front End

A React framework based front-end for the 'Grup Grup' application.

## Material UI (Google)

The [Material UI](https://material-ui.com/) library is utilised to make standardised UI components.

## Component Breakdown

### Base Component Defaults

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

### Application Page

This serves as the main component

| Component          | Material UI       | Notes                                                                                                                                             |
| :----------------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| Page UI            | Container         | Top level component                                                                                                                               |
| Application header | Custom Component  | <li>Holds either a search bar or a user <li> When containing a profile, then the content is the shared content of that user                       |
| Content Container  | Grid List         | <li>Single column layout is achieved by setting column number to '1' <li> Multicolumn layout is created by increasing columns based on page width |
| Content Card       | Grid List Tile    | Small and large cards as a gateway to individual pieces of content                                                                                |
| Nav Footer         | Bottom Navigation | Actions: <li> Home <li> New Upload <li> Profile <li> Hamburger Menu                                                                               |

### Search Bar

Displayed in the application header

| Component      | Material UI   | Options                                                                                                                      |
| :------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| Parent         | Container     |                                                                                                                              |
| Input          | Textfield     | Autocomplete                                                                                                                 |
| Search Options | Toggle Button | [Exclusive selection](https://material-ui.com/components/toggle-button/#exclusive-selection) for "Grid" and "Newsfeed" icons |

**Notes:**

- Search is carried out on 'enter' being pressed (keycode '13')
- Possibly will need some form of submit button for users unaware of pressing enter

### Profile Card

Displayed in the application header.

| Component       | Material UI                                       | Notes                                                                                 |
| :-------------- | :------------------------------------------------ | :------------------------------------------------------------------------------------ |
| Container       | [Card](https://material-ui.com/components/cards/) |                                                                                       |
| Display Name    | Typography                                        | <li>Variant: h1 <li> Located at top of card                                           |
| Profile Picture | Cardmedia                                         | <li>Max width 50% <li> Left aligned                                                   |
| Actions         | CardActions                                       | <li> Icon for email/messaging <li> If user's own profile, link to edit profile action |
| Bio             | Typography                                        | <li> Variant: body2 <li> Color: textSecondary <li> component: p                       |

### Content Cards

Used for posts and individual images

#### Small content cards

'Thumbnail' cards to access content

| Component | Material UI | Options             |
| :-------- | :---------- | :------------------ |
| Container | Card        |                     |
| Thubnail  | Card Media  | Occupies whole card |

#### Large content cards

Full application width cards containing hero image (or possibly carousel) from content

| Component    | Material UI    | Options                                                                                                                                                                                                    |
| :----------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Container    | Card           |                                                                                                                                                                                                            |
| Hero         | CardMedia      | Can be nominated image or carousel                                                                                                                                                                         |
| Tag List     | CardActionArea | <li>Each tag is clickable to trigger a search for that tag <li> Search results could include username of the card owner to show their content with the same tag before showing other content with same tag |
| Display Name | Link           | Clicking link goes to userprofile                                                                                                                                                                          |
| Description  | Typography     | <li> Variant: body1 <li> Color: textSecondary <li> component: p                                                                                                                                            |

### Application Menu

Accessed from the bottom navigation bar

| Component | Material UI                                                        | Notes                         |
| :-------- | :----------------------------------------------------------------- | :---------------------------- |
| Container | [Menu](https://material-ui.com/components/menus/#customized-menus) | Holds customised menu options |
| Option    |                                                                    | Passed in as a prop           |

### Edit Profile

Dialogue accesed from the menu (or by the user viewing their own profile annd using link)

| Component            | Material UI   | Notes                                               |
| :------------------- | :------------ | :-------------------------------------------------- |
| Container            | Drawer        | Rises from bottom and is scrollable                 |
| Heading              | Typography    | <li>Variant: h1 <li> Located at top of drawer       |
| Sections for Editing | AccordianMenu | Contains sections for 'about' and 'update password' |

#### Profile 'About' Section

| Component       | Material UI     | Notes                                                  |
| :-------------- | :-------------- | :----------------------------------------------------- |
| Display Name    | Textfield       | Only required when blank                               |
| Email           | Textfield       |                                                        |
| Bio             | Textfield       | <li>Almost as container<li> Character limit counter(?) |
| Profile Picture |                 | <li>Styled Image <li> Updates on Load(?)               |
| Upload Button   | (Dialog) Button |                                                        |
| Update Button   | (Dialog) Button |

#### Change Password Section

| Component            | Material UI       | Notes    |
| :------------------- | :---------------- | :------- |
| Previous Password    | Textfield         | Required |
| New Password         | Textfield         | Required |
| Confirm New Password | Textfield         | Required |
| Save changes         | (Dialogue) Button |          |

### New Upload Page

| Component       | Material UI                                                                                   | Notes                                               |
| :-------------- | :-------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| Parent          | [Long Scrolling Dialogue](https://material-ui.com/components/dialogs/#scrolling-long-content) | Comes up from bottom of screen and holds all fields |
| Image Thumbnail | Custom Component                                                                              |

## Optional Extra Components

- Single post view
- Single image view
- Private images collection not yet posted
- Post creation from entire user image collection