
# @Rentals

**MERN website** serving as a platform for **Book Renting** with least costs involved as one needs to pay just shipping &amp; minimal day wise rental charges.

## Technologies Used:

- Front End : ReactJS, HTML, CSS, Bootstrap
- Back End : NodeJS, ExpressJS, JWT
- Database : MongoDB

## Functionality

### User

##### Basic

- Login, Signup
- Search for a book
  - Title, Category, Author/ Publication per se
- Discover trending books
  - Filter functionality
- View Profile and Update
- View Past renting orders/ transaction details

##### Lesse (Who wants to put book on rent)

- Lease/ put a book on rent (as a Lesse)
  - Select Book from Database that you want to make avl for renting
  - Period Avl
- Add a new book to make it available for renting based on
  - Book Title, Author, Publication
  - Period to be put on Rent (Date - FROM, TO)

##### Renter (Who pays rent for the book)

- Rent a book (as a Renter)
  - Checking availibility - based on period wanted for
  - Estimate Total Cost = [ 2* Shipping Price + Daily renting rate x Number of days ]
  - Pay & Rent

## UI Design/ Layout:

[Basic planned layout of pages](https://framer.com/projects/Rentals--7zKPZS5bnrThwsvXZGFN-9r5fz) 

[Figma file for design](https://www.figma.com/file/Ar1zul3zdmNfNt729D9U6o/RentUI?node-id=46%3A2)
![Desing prototype](https://github.com/AnjanaMA/atRentals/blob/main/RentUI.gif)

## Back-end Plan:

![Backend Image](https://github.com/CoolCoderz/atRentals/blob/main/Backend/temp_assets/aRentalsBackend.png)

## Installation and Execution:

### Requirements

For development, you will only need Node.js installed on your environement. 
And please use the appropriate Editorconfig plugin for your Editor (not mandatory).

For additional Setup info check: [Setup.md]()

## Maintainers/ Contributors:
[![](https://opencollective.com/html-react-parser/contributors.svg?width=890&button=false)](https://github.com/CoolCoderz/atRentals/graphs/contributors)
