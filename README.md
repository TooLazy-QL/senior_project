# Senior Project

## Team members
- Qiwen Luo: Full Stack Web Developer
- Peifeng Hu: Recommendation System Designer
- Lina Dong & Ruyuan Zuo: Credit Model Designers
- Tianxin Jiang: Chatbot Designer

## Folders
- Folder models stores all DB collections' schema 
- Folder wowowui stores all front-end files
- Folder routes usually deal with back-end issues
- Folder json contains all data in the local database and the name for local DB is wow

## How to run the website
- Download: Node JS (https://nodejs.org/en/) and MongoDB (https://www.mongodb.com/)
- Start MongoDB
     - Follow the instruction https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/ to install & run MongoDB on Windows, Mac or Linux
     - For Mac users to run MongoDB, choose to make a directory called mongodb anywhere in the computers, make a directory called data under the mongodb folder, cd to directory mongodb at the command prompt and type mongod --dbpath=data at the command prompt  
- Run the website
     - Open another command window and move to the folder that contains all files (UI, backend, DB)
     - Type the following at the command prompt to install all dependencies: npm install
     - Move to the folder wowowui which contains UIs
     - Type the following at the command prompt to install all dependencies: npm install
     - Move back to the folder that contains all files (UI, backend, DB)
     - Type the following at the command prompt to run the website: npm run dev 
     - Client and server will run concurrently
     - Client runs on http://localhost:3000
     - Server runs on http://localhost:5000
     - DB runs on mongodb://localhost:27017/wow
## Existed Login Info
- Admin account
     - username: Admin
     - password: 123456
- Seller account
     - username: ABC
     - password: 123456
- Buyer account
     - username: TooLazy
     - password: 123456
- Your can walk through the website by logging in with these existed accounts. Or you can create your own account. Remember your password since it can not be retrieved and reset.

## Endpoints
- Endpoint for all roles
     - /users/login
- Endpoints for buyer
     - /home
     - /users/signupbuyer
     - /profilebuyer
     - /aboutus
     - /contactus
     - /favorite
     - /shoppingcart
     - /itemdetail
- Endpoints for seller
     - /users/signupseller
     - /homeseller
     - /profileseller
     - /sellerpost
     - /sellersubmissions
     - /sellereditpost
     - /contactusseller
     - /aboutusseller
- Endpoints for admin
     - /adminverify
     - /adminverifysingle

## Notes
- User Manual & Function Specification: https://docs.google.com/document/d/1U9XByjcjFJJ60AYanxge_nRDpEeNZTyfXa8YF1j33xI/edit?usp=sharing
