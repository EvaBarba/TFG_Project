TFG Proyect

- Installation of the necessary dependencies and resources:
npm install
npm install sequelize
npm install sequelize sqlite3
npm install sequelize-cli
npm install express-generator -g
npm install connect-flash   
npm install iso-639-1  

- To create the database run:
sequelize db:create

- To configure migrations and seeders:
node configureDB.js


OTHER WAY FOR EXECUTING AND UPDATING MIGRATIONS AND SEEDERS

1. To execute migrations run:
node migrate.js

2. To execute seeders run:
node seed.js

3. To undo seeders run:
node undoSeeders.js



- To iniciate the aplication run:
npm start