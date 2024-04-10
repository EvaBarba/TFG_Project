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

- To execute migrations run:
node migrate.js

- To execute seeders run:
node seed.js

- To undo seeders run:
node undoSeeders.js

- To iniciate the aplication run:
npm start


NOTE: to update the seeders
1. node undoSeeders.js
2. node seed.js