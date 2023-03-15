// const httpService=require('../Services/httpService')
// // const httpService=new httpService()

//  class  userService{
//     register(data) {
//         let header = {
//           headers: new HttpHeaders({
//             'Content-Type': 'application/json'
//           })
    
//         }
//         return httpService('https://bookstore.incubation.bridgelabz.com/bookstore_user/registration', data, false, header)
//       }

// }
// export default userService

utils = require("./httpService").default;

const greet_scaler = utils.greet("Scaler");

console.log(greet_scaler); 
console.log(utils.message); 


