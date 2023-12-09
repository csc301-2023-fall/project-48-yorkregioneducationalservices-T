// const campusService = require('../../services/campusService');
// const Camp = require('../../entities/Campus');
// const assert = require('assert');
// var result;
// var campus_name = "My Test Campus";

// describe('campusService', () => {
// 	describe('createCampus()',  () => {
// 		describe('Campus creation reported as successful', () => {
// 			it('should return true',  () => {
// 				try {
// 					result = campusService.createCampus(campus_name);
// 				} catch(err) {
// 					assert.ifError(err);
// 				}
// 				result.then((res) => {
// 					assert.equal(res, true);
// 				});
// 			});
// 		});
// 	});
	
// 	describe('getAllCampuses()',  () => {
// 		describe('Newly-created campus is registered',  () => {
// 			try {
// 				result = campusService.getAllCampuses();
// 			} catch(err) {
// 				assert.ifError(err);
// 			}
// 			result.then((result)=>{
// 				result.then((res) => {
// 					it('should be an array of campus objects', () => {
// 						for (var i=0; i<res.length; i++) {
// 							(res[i]).should.be.instanceof(Campus);
// 						}
// 					});
// 				});
// 			}).catch((err) => {
// 				assert.ifError(err);
// 			});
// 		});
// 	});
// });