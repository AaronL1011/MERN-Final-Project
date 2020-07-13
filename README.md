# MERN Stack Final Project

Created by Evelyn Paplauskas and Aaron Lewis for a Coder Academy final project.

## R1 - Application Description

### Purpose

To provide a platform for users to share their original content (photos). Currently many photo sharing platforms allow for the sharing and re-posting of images of any sort. While this is fine, certain audiences would prefer a platform to share images they have taken themselves (photographers, family-persons, etc.) This application can serve as a platform to achieve this. While theoretically you will still be able to upload any image, the whole idea is to keep uploads exclusively as original content.

### Functionality and Features

This application is being designed as a photo sharing platform for use by anyone wishing to upload and distribute their own original photos. Obviously the platform will need functions to support the creation, retrieval, updating and deletion of User Accounts, as well as CRUD operations and a storage solution for the photos being uploaded by each user.

Due to this being a photo-sharing platform, we will need to support file upload and storage. We are hoping to achieve this by utilizing an Amazon S3 Storage Bucket to send and retrieve any data associated to a user.

Users should also be able to modify any of their own photographs, but not each others. This implies the use of some permissions and authentication. We will be able to achieve this with the use of JSON Web Tokens and pre-flight checks of the users token/permissions in relation to any action they are trying to execute.

In a general sense, features we would like to implement include:

- User account management
  - Creation, modification and deletion methods
  - Secure password encryption
- Building collections/albums
  - Uploading and storage of images
  - Meta-tagging
- Search functionality by tag, date, user, etc
- Controllable access to content
  - Public and private settings
  - Sharing collections via posts
  - Blocking/removing unwanted access
  - Retain content when removing access
- Social media platform
  - Ability to share collections via a link for posting on social media platforms
  - Allowing users to follow a user
  - Ability to comment on images publicly and provide feedback privately

### Target audience

The target audience within this application is very broad. Given that _any persons who take their own photos_ are encouraged to be a part of this platform, anyone with a camera of some sorts could be considered part of the target audience. To ensure a safe environment for all users within this application, it may require some Terms and Conditions to be defined to control the specific type of content allowed to be uploaded. For example, imposing restrictions on NSFW content (photos involving nudity, illicit substances or violence) would be required to ensure that any _minors_ or _those who are easily disturbed_ are safe and comfortable within the application.

### Tech Stack

This application is planned to be split into two main components. The 'Front end' will be for rendering content to the users and handling user interaction, and the 'Back end' will be used for routing HTTP requests, and retrieving/sending the appropriate data between servers as the user interacts with the appliocation.

As far as the front end goes, we plan to use technologies such as:

- React: A javascript library for the creation and rendering of responsive web components.
- Netlify/GithubPages: Two hosting platforms that can be used to deploy our React application front end for use in production. Both include some form of free tier, which is ideal for this project, as we would both rather not be paying to host our application if its not necessary.

In regards to the back end, this requires the use of a few more technologies.

- NodeJS: A JavaScript package manager used to link further technologies and create a RESTful API to allow sending and retrieving data between our components.
- ExpressJS: A Javascript Package to implement HTTP request routing so we are able to direct each request to the corresponding destinations.
- MongoDB Atlas: A cloud based NoSQL database solution to allow data persistance of the majority of data within our application (ie Users, Post information, Comments etc.)
- Amazon S3: This is a seperate data storage solution which will be used for holding all of the images uploaded to our application. S3 is much more supportive of larger data sizes, and given each photo uploaded will likely be around a 3-5Mb file size, this will be very neccesary for the operation of our application.
- Heroku: Another hosting platform to be used for deploying our RESTful API for access by our application in a production environment.

# Dataflow Diagram

Below is a Level 1 Dataflow Diagram outlining the flow of information between components at the core functionality of the application. It shows how requests from the User are handled and how data is stored and retrieved from our application storage.

![Dataflow Diagram](./resources/DataflowDiagram.png)

# Application Architecture Diagram

# R4 - User Stories

> 6.0 to >5.0 pts
> HD
> Provides multiple user stories (6 in total, 3 per person) that use ‘persona, what and why’ that outline meaningful features of project. Shows evidence of user story revision and refinement.

## User story outline

-Persona

- Name
- Age
- Something personal about their life, possibly as to why this application is of importance to them
- Level of tech experience
- Task they want to accomplish
- What their 'pain-point' with existing solutions are

## User Personas

### Michael

|:---|:---|
|![Michael's picture](./resources/michael.png) | 22 year old college graduate with a major in Computer Science, currently backpacking through Europe with his partner|

- Due to my degree, I have an adept level of experience in the technology field.
- I would like to be able to create a secure account with an encrypted password to protect my personal information from any external entities.
- Security is a crucial point of interest in every application that hosts any form of personal information. Many applications aren't very transparent with the level of security used to protect my information, so I would like to be informed on the methods used within this application.

- **Karen**, a 47 year old mother of 3 'angelic' children, freshly returned from arguing with the Branch Manager of her local Woolworths.

  - Due to my priorities in life revolving around fighting employees of local businesses, my experience with technology is limited to recording arguments in case I need evidence in a court case.
  - I want to be able to quickly and easily change my account information if any of my details change in the future.
  - Some current applications make it too complicated to find where to edit my information, which quite frankly I find confusing and irritating. I would prefer this process to be very simple and intuitive, so I can spend more time with my children instead of writing aggressive emails to the app developers.

- **Alex**, a 32 year old circus clown from Idaho, currently honing his juggling and animal training skills.

  - My experience in life is entirely made up of the circus, consequently technology can be rather confuddling.
  - I want to be able to upload photos of my animal training progress and remove them if they prove to be risque for the public eye.
  - Other platforms sometimes make it tricky to find where to delete my photos when my audience dislikes certain content. I would like manage how my photos are publicly viewed to help me maintain my personal brand without having to resort to deleting them.

- **Anita**, 55 year old empty-nester. Currently travelling around Australia in a caravan with her partner Brian

  - Her experience with technology stems from working in administration of small businesses prior to hI thought that using avatars would be less problematic than er retirement
  - She would like to organise her photos from her journey to share with friends and family
  - She finds other platforms she has used such as flicker and instagram are either too structured or not structured enough, as well as taking to long to do what she wants to do.

- **Serjay**, a 33 year old newly immigrated father of two. He wants to easily share photos of his young family with family back home in India

  - Mostly uses facebook and instagram and has never used a dedicated photo album style platform, but is very technically literate due to his skills as a software engineer
  - He would like to share photos with his family and friends both back in his home country and locally
  - He bases his platforms of choice on ease of usability for those he wants to share with, many of whom he considers are not that skilled with using complex software
  - Speed to share and an easy learning curve are what he looks for before attempting to adopt anything
  - He is wanting something simpler and more powerful than albums or single posts that does not ask too much of his time from his very busy life

- **Alice**, 48 year old sister-girl from the Northern Territory who is active in social campaigning. She regularly attends demonstrations in the large capital cities and often returns to her 'home country' to see her family and friends
  - Has only really used facebook
  - She would like to share photos of her life and of her present day activism activities with both her community, friends and organisations that she is involved with
  - She is after something simple that lets her share her images and stories as she finds facebook too crowded with unrelated content from her friends
