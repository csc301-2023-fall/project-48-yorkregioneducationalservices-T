// const { Client } = require('pg');
// const client = new Client();

// // Import the function to be tested
// const getFriendPreferencesAndCategorize = require('/Users/erickarpovits/Desktop/UofT Third Year/project-48-yorkregioneducationalservices-T/deliverables/yres_scheduler/yres_scheduler_backend/api/db/studentDbPlugin.js');

// // Mock the student object
// const student = {
//   student_id: 1,
//   addEnemy: jest.fn(),
//   addFriend: jest.fn()
// };

// // Mock the result of the query
// const mockResult = {
//   rows: [
//     {
//       student_id1: 1,
//       student_id2: 2,
//       is_apart: false
//     },
//     {
//       student_id1: 1,
//       student_id2: 3,
//       is_apart: true
//     }
//   ]
// };

// // Mock the client.query function
// client.query = jest.fn().mockResolvedValue(mockResult);

// describe('getFriendPreferencesAndCategorize', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should call client.query with the correct SQL query and values', async () => {
//     await getFriendPreferencesAndCategorize(student);

//     expect(client.query).toHaveBeenCalledWith(
//       'SELECT * FROM FriendPreference WHERE student_id1 = $1 OR student_id2 = $1;',
//       [1]
//     );
//   });

//   it('should call student.addEnemy for each row where is_apart is true and the student_id is not the first one', async () => {
//     await getFriendPreferencesAndCategorize(student);

//     expect(student.addEnemy).toHaveBeenCalledWith(2);
//   });

//   it('should call student.addEnemy for each row where is_apart is true and the student_id is the first one', async () => {
//     await getFriendPreferencesAndCategorize(student);

//     expect(student.addEnemy).toHaveBeenCalledWith(3);
//   });

//   it('should call student.addFriend for each row where is_apart is false and the student_id is not the first one', async () => {
//     await getFriendPreferencesAndCategorize(student);

//     expect(student.addFriend).toHaveBeenCalledWith(2);
//   });

//   it('should call student.addFriend for each row where is_apart is false and the student_id is the first one', async () => {
//     await getFriendPreferencesAndCategorize(student);

//     expect(student.addFriend).toHaveBeenCalledWith(3);
//   });

//   it('should throw an error if client.query throws an error', async () => {
//     client.query.mockRejectedValue(new Error('Database error'));

//     await expect(getFriendPreferencesAndCategorize(student)).rejects.toThrow(
//       'Failed to fetch friend preferences'
//     );
//   });
// });