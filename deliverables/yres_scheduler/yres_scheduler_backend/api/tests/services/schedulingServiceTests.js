// const scheduleService = require('../../services/scheduleService');
// const assert = require('assert');
// const db = require('../../db/psqlDbPlugin');

// describe('scheduleService', function () {
// 	describe('generateSchedule()', function () {
// 		describe('Failed Schedule Generation', () => {
// 			it('should return \'camp_id does not exist\' for invalid camp_id', () => {
// 				var result = 'Nothing';
// 				try {
// 					result = scheduleService.generateSchedule(
// 					'Invalid_Camp_ID',
// 					new Date('2024-01-01T09:30:00.000Z'),
// 					'Test');
// 				} catch(err) {
// 					assert.equal(err.message, "camp_id does not exist");
// 				}
// 				assert.equal(result, 'Nothing');
// 			});
// 		});
// 		describe('Successful Schedule Generation', () => {
// 			var result = 'Nothing';
// 			try {
// 				result = scheduleService.generateSchedule(
// 				'f307479d-262e-423a-a681-a043c2577b0b',
// 				new Date('2024-01-01T09:30:00.000Z'),
// 				'Schedule Name');
// 			} catch(err) {
// 				done("Error occurred when generating schedule");
// 			}

// 			it('should have correct camp ID', () => {
// 				assert.equal(result.camp_id, 'f307479d-262e-423a-a681-a043c2577b0b');
// 			});

// 			it('should have correct schedule name', () => {
// 				assert.equal(result.name, 'Schedule Name');
// 			});

// 			it('should have 6 schedule blocks', () => {
// 				assert.equal(result.schedule_blocks.length, 6);
// 			});

// 			it('should have correct start time in first schedule block', () => {
// 				assert.deepEqual(result.schedule_blocks[0].start_time, new Date('2024-01-01T09:30:00.000Z'));
// 			});

// 			it('should have correct start time in schedule', () => {
// 				assert.deepEqual(result.start_time, new Date('2024-01-01T09:30:00.000Z'));
// 			});

// 			it('should have correct time durations for each schedule block activity', () => {
// 				var time_diff;
// 				for (var i=0; i<result.schedule_blocks.length; i++) {
// 					time_diff = (result.schedule_blocks[i].end_time.getTime() - result.schedule_blocks[i].start_time.getTime()) / 3600000;
// 					assert.equal(time_diff, result.schedule_blocks[i].activity.time_length);
// 				}
// 			});

// 			it('should have exactly one schedule block for each camp activity', () => {
// 				var camp_activities = new Set(db.getCampActivities(result.camp_id));
// 				var scheduled_activites = new Set();
// 				for (var i=0; i<result.schedule_blocks.length; i++) {
// 					scheduled_activites.add(result.schedule_blocks[i].activity);
// 				}
// 				assert.deepEqual(camp_activities, scheduled_activites);
// 			});

// 		});
// 	});
// });