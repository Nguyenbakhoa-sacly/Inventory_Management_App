
// 'use strict';
// const mongoose = require('mongoose');

// const connectString = process.env.MONGOBD_URL
// console.log("connectString::", connectString)

// // áp dụng pattern singleton để đảm bảo chỉ có một phiên bản của lớp Database được tạo.
// class Database {
//   // hàm khởi tạo của lớp
//   // hàm này sẽ tự động được gọi
//   constructor() {
//     this.connect()
//   }
//   //connect
//   connect(type = 'mongodb') {
//     if (1 === 1) {
//       // bật chế độ debug cho Mongoose
//       mongoose.set('debug', true);
//       mongoose.set('debug', { color: true });
//     }
//     mongoose.connect(connectString)
//       .then(() => console.log(`Connect Mongodb Success!`))
//       .catch(err => console.log(`Error connecting monogodb!`));
//   }
//   // sử dụng để đảm bảo chỉ có một đối tượng của lớp Database được tạo
//   static getInstance() {
//     // kiểm tra xem đối tượng đã tồn tại chưa, nếu chưa thì tạo một đối tượng mới và lưu trữ lại.
//     if (!Database.instance) {
//       Database.instance = new Database();
//     }
//     return Database.instance;
//   }
// }
// // gọi phương thức getInstance()
// const instanceMongodb = Database.getInstance();

// module.exports = instanceMongodb;