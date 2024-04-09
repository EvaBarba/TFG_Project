// models/index.js

// Dependencies
var Sequelize = require('sequelize');
var config = require('../config/config');

const User = require('./user');
const Admin = require('./admin');
const Client = require('./client');
const Consultant = require('./consultant');
const Coordinator = require('./coordinator');
const Interpreter = require('./interpreter');
const Operator = require('./operator');
const Technician = require('./technician');
const Reputation = require('./reputation');
const Room = require('./room');
const Booth = require('./booth');
const Boothassignment = require('./boothAssignment');
const Like = require('./like');


// Configuration of the Connection to the DATABASE
const sequelize = new Sequelize(config.development);

// Relationships for Admin: N-to-1  (User-Admin) -------------------------
User.belongsTo(Admin, { foreignKey: 'admin_id', as: 'Admins' });
Admin.hasMany(User, { foreignKey: 'admin_id', as: 'users' });

// Relationships for Roles: 1-to-1 (User-role) ---------------------------------------
User.hasOne(Client, { foreignKey: 'id', as: 'clients' });
Client.belongsTo(User, { foreignKey: 'id', as: 'User' });

User.hasOne(Consultant, { foreignKey: 'id', as: 'consultants' });
Consultant.belongsTo(User, { foreignKey: 'id', as: 'User' });

User.hasOne(Coordinator, { foreignKey: 'id', as: 'coordinators' });
Coordinator.belongsTo(User, { foreignKey: 'id', as: 'User' });

User.hasOne(Interpreter, { foreignKey: 'id', as: 'interpreters' });
Interpreter.belongsTo(User, { foreignKey: 'id', as: 'User' });

User.hasOne(Operator, { foreignKey: 'id', as: 'operators' });
Operator.belongsTo(User, { foreignKey: 'id', as: 'User' });

User.hasOne(Technician, { foreignKey: 'id', as: 'technicians' });
Technician.belongsTo(User, { foreignKey: 'id', as: 'User' });

// Relationships for reputation: 1-to-1 (reputation-interpreter) ---------------------
Interpreter.hasOne(Reputation, { foreignKey: 'interpreter_id', as: 'reputation' });
Reputation.belongsTo(Interpreter, { foreignKey: 'interpreter_id', as: 'interpreter' });

// Relationships for room: 1-to-N (role-room) ----------------------------------------
Consultant.hasMany(Room, { foreignKey: 'consultant_id', as: 'consultantRoomDetails' });
Room.belongsTo(Consultant, { foreignKey: 'consultant_id', as: 'consultantOfRoom' });

Coordinator.hasMany(Room, { foreignKey: 'coordinator_id', as: 'coordinatorRoomDetails' });
Room.belongsTo(Coordinator, { foreignKey: 'coordinator_id', as: 'coordinatorOfRoom' });

Operator.hasMany(Room, { foreignKey: 'operator_id', as: 'operatorRoomDetails' });
Room.belongsTo(Operator, { foreignKey: 'operator_id', as: 'operatorOfRoom' });

Technician.hasMany(Room, { foreignKey: 'technician_id', as: 'technicianRoomDetails' });
Room.belongsTo(Technician, { foreignKey: 'technician_id', as: 'technicianOfRoom' });

// Relationships for booth: 1-to-N (room-booth) --------------------------------------
Room.hasMany(Booth, { foreignKey: 'room_id', as: 'boothsDetails' });
Booth.belongsTo(Room, { foreignKey: 'room_id' });


// Relationships for interpreter: N-to-M (interpreter-boothassignment-booth) ---------
Booth.belongsToMany(Interpreter, {as: 'interpreters', through: 'Boothassignment', foreignKey: 'boothId', otherKey: 'interpreterId'});
Interpreter.belongsToMany(Booth, {as: 'booths', through: 'Boothassignment', foreignKey: 'interpreterId', otherKey: 'boothId'});


//(PENDIENTE) Relacion Like
//(PENDIENTE) Relacion LanguageKnown



// DATABASE Object
const db = { sequelize, User, Admin, Client, Consultant, Coordinator, Interpreter, Operator, Technician, Reputation, Room, Booth, Boothassignment, Like };

// Close the Sequelize connection when the Node.js process is closed
process.on('exit', () => {
  sequelize.close();
});

// Export of the DATABASE object
module.exports = db;
