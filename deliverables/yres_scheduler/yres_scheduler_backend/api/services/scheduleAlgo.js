const { re } = require("mathjs");
const gs = require("./groupAlgo");
const uuid = require('uuid');
const logger = require("../../logger");
const saveJson = require('../utils/jsonToFile.js');
// const insertData = require("../utils/insertDataIntoDB");  

class BlockForScheduling {
    constructor(room_id, activity, day, time) {
        this.room_id = room_id;
        this.activity = activity;
        this.day = day;
        this.time = time;
    }
}
class ActivityForScheduling {
    constructor(activity_id, name, duration, type, num_occurences, room_ids, camp_type) {
        this.activity_id = activity_id;
        this.name = name;
        this.duration = duration;
        this.type = type;
        this.num_occurences = num_occurences;
        this.room_ids = room_ids;
        this.camp_type = camp_type;
    }
}
/** Converter between Counselor entity class and local CounselorL class.
 * 
 * @param {Array} counselors - list of Counselor entities.
 */
function convertFromActivities(activities) {
	var activityLs = [];
	if (activities === undefined) {
		logger.debug("scheduleAlgo - Undefined: list of activities is undefined.");
		throw Error("scheduleAlgo - Undefined: list of activities is undefined.");
	}
	for (var a = 0; a < activities.length; a++) {
		if (activities[a].activity_id === undefined || activities[a].name === undefined || activities[a].duration === undefined || 
            activities[a].type === undefined || activities[a].num_occurences === undefined || activities[a].camp_id === undefined ||
            activities[a].rooms === undefined) { 
			logger.debug("scheduleAlgo - Incomplete data: required attributes is missing in an activity object.");
			throw Error("scheduleAlgo - Incomplete data: required attributes is missing in an activity object.");
		}
		activityLs.push(new ActivityForScheduling(activities[a].activity_id, activities[a].name, parseInt(activities[a].duration), activities[a].type,
            parseInt(activities[a].num_occurences), activities[a].rooms, activities[a].camp_id));
	}
    return activityLs;
}
// THESE MIGHT BE REMOVED OR MOVED TO CONFIG LATER
const DAY = 5;
const TIME = 8;
const MAX_BIG_ATTEMPT = 50000;
const MAX_SUB_ATTEMPT = 50000;

/* ============ HERE STARTS THE SCHEDULE CALL ================ */
/** The short function for API calls.
 * 
 * @param {Array} students - All students to be grouped.
 * @param {Array} counselors - All counselors to be grouped.
 * @param {Array} activities - All activities to be schduled for the camp.
 * @param {Array} rooms - All rooms available for scheduling.
 */
async function scheduleCall(students, counselors, activities, rooms) {
    try {
        logger.debug("Start grouping algorithm...");
        var groups = await gs.groupCall(counselors, students);
        logger.debug("Grouping complete");
        logger.debug("Start scheduling algorithm...");
        var activityLs = await convertFromActivities(activities);
        var room_ids = [];
        for (let r = 0; r < rooms.length; r++) {
            room_ids.push(rooms[r].room_id);
        }
        const result = await scheduleAlgorithm(groups, activityLs, room_ids);
        logger.debug("Scheduling complete");
        return result;
    } catch (err) { 
        logger.error(err);
        // save an empty schedule so that nothing crashes.
        saveJson.saveJsonToFile("[[]]", './saved_scheduled.json');
        throw new Error(err.message);
    }
}
/* ============ HERE STARTS THE SCHEDULE ALGORITHM ================ */
/** The scheduling algorithm.
 * 
 * @param {Array} groups - All groups generated by grouping algorithm.
 * @param {Array} activities - All activities to be scheduled for the camp.
 * @param {Array} rooms - All room_ids available for scheduling.
 */
function scheduleAlgorithm(groups, activities, rooms) {
    try {
    
        var camp_types = [];

        var activities_by_type = [];
        // Step 1. Initialization and preparation
        // 1.1. Separate activities based on camp type of the groups
        for (let c = 0; c < groups.length; c++) {
            camp_types.push(groups[c][0].camp_type);
        }
        for (let t = 0; t < camp_types.length; t++) {
            activities_by_type.push([]);
            for (let a = 0; a < activities.length; a++) {
                if (activities[a].camp_type === camp_types[t]) {
                    activities_by_type[t].push(activities[a]);
                }
            }
        }

        // 1.2. Initialize all schedules to empty
        for (var c = 0; c < groups.length; c++) {
            for (var g = 0; g < groups[c].length; g++) {
                groups[c][g].schedule_id = uuid.v1();
                groups[c][g].schedule = [];
                for (var i = 0; i < DAY; i++) {
                    groups[c][g].schedule.push([]);
                    for (var j = 0; j < TIME; j++) {
                        groups[c][g].schedule[i].push(undefined);
                    }
                }
            }
        }
        // 1.3. Initialize the available room array
        available_rooms = []
        for (var i = 0; i < DAY; i++) {
            available_rooms.push([]);
            for (var j = 0; j < TIME; j++) {
                available_rooms[i].push([...rooms]);
            }
        }
        logger.debug(available_rooms);
        
        // 1.4. Initialize all blocks to be allocated in the schedule
        var fillers = [];
        var commons = [];
        var all_blocks = [];
        for (let t = 0; t < camp_types.length; t++) {
            fillers.push([]);
            commons.push([]);
            all_blocks.push([]);
            logger.debug(`Camp type: ${camp_types[t]}`);
            var time_sum = 0;
            for (var a = 0; a < activities_by_type[t].length; a++) {
                if (activities_by_type[t][a].duration <= 0 || activities_by_type[t][a].duration > TIME) {
                    logger.debug("scheduleAlgorithm - Unexpected activity duration: non-positive or longer than maximum hours per day.");
                    throw Error("scheduleAlgorithm - Unexpected activity duration: non-positive or longer than maximum hours per day.");
                }
                time_sum += activities_by_type[t][a].duration * activities_by_type[t][a].num_occurences;
                if (time_sum > DAY * TIME) {
                    logger.debug("scheduleAlgorithm - Too many activities: total hour greater than schedule length.");
                    throw Error("scheduleAlgorithm - Too many activities: total hour greater than schedule length.");
                }
                if (activities_by_type[t][a].type === "common")
                    commons[t].push(activities_by_type[t][a]);
                if (activities_by_type[t][a].type === "filler") {
                    if (parseInt(activities_by_type[t][a].duration) !== 1) {
                        logger.debug("scheduleAlgorithm - Unexpected filler: filler activities must have 1 hour duration");
                        throw Error(("scheduleAlgorithm - Unexpected filler: filler activities must have 1 hour duration"));
                    }
                    fillers[t].push(activities_by_type[t][a]);
                }
            }
            if (time_sum < DAY * TIME && (fillers[t] === undefined || fillers[t].length === 0)) {
                logger.debug("scheduleAlgorithm - Too few activities: no fillers, and total hour less than schedule length.");
                throw Error("scheduleAlgorithm - Too few activities: no fillers, and total hour less than schedule length.");
            }
            logger.debug("Activity sum:", time_sum);
            var filler_hours = DAY * TIME - time_sum;
            logger.debug(filler_hours, "hours of fillers will be added");
            // 1.5. Sort activities by descending duration, this is to increase efficiency and possibility to converge
            activities_by_type[t].sort((a, b) => {return b.duration - a.duration;});

            // Create a list of blocks
            for (var a = 0; a < activities_by_type[t].length; a++) {
                for (var i = 0; i < activities_by_type[t][a].num_occurences; i++) {
                    all_blocks[t].push(new BlockForScheduling("", activities_by_type[t][a], -1, -1));
                }
            }
            var filler_index = 0
            for (var f = 0; f < filler_hours; f++) {
                all_blocks[t].push(new BlockForScheduling("", fillers[t][filler_index], -1, -1));
                filler_index++;
                if (filler_index === fillers[t].length)
                    filler_index = 0;
            }
        }
        logger.debug("Preparation done. Start scheduling.")

        // Step 2. Start scheduling randomly
        // 2.1. If a random scheduling fails to add all blocks, restart a Big attempt
        var big_attempt = 0
        for (; big_attempt < MAX_BIG_ATTEMPT; big_attempt++) {
            logger.debug("Big attempt:", big_attempt, "starts")
            var failed = false;
            // 2.2. Iterate over camps
            for (var t = 0; t < camp_types.length; t++) {
                logger.debug(`Camp ${camp_types[t]}:`);
                // 2.3. Iterate over each group in the camp
                for (var g = 0; g < groups[t].length; g++) {
                    logger.debug(`Group ${groups[t][g].name}:`);
                    // 2.4. Iterate over each activity of the group to insert it into schedule
                    for (var b = 0; b < all_blocks[t].length; b++) {
                        var inserted = false; // Flag recording if this block is inserted. If not, the inner loop must start another attempt
                        // 2.5. Start a Sub attempt
                        for (var attempt = 0; attempt < MAX_SUB_ATTEMPT; attempt++) {
                            // In each sub attempt:
                            // 2.5.1. Generate a random pair of day and time
                            var day = Math.floor(Math.random() * DAY);  // Any day in possible range
                            var time = Math.floor(Math.random() * (TIME - all_blocks[t][b].activity.duration + 1)); // Time in range [0, TIME - duration)
                            // 2.5.2. Check schedule availability: whether the schedule is yet empty on the day at [time, time + duration]
                            var occupied = false;
                            for (var j = time; j < time + all_blocks[t][b].activity.duration; j++) {
                                if (groups[t][g].schedule[day][j] !== undefined) { // implies some block is already there, so insertion fails
                                    occupied = true;
                                    break;
                                }
                            }
                            if (occupied) { continue; } // Go on to the next sub attempt
                            // 2.5.3. Check room availability: whether there is an available room during selected time
                            var selected_room_id = "";
                            // Iterate over all rooms this activity may take place in
                            for (var r = 0; r < all_blocks[t][b].activity.room_ids.length; r++) {
                                selected_room_id = all_blocks[t][b].activity.room_ids[r];
                                logger.debug(selected_room_id);
                                for (var j = time; j < time + all_blocks[t][b].activity.duration; j++) {
                                    // If there are no rooms at the time, or selected room is not available
                                    if (available_rooms[day][j].length == 0 || available_rooms[day][j].indexOf(selected_room_id) < 0) {
                                        selected_room_id = "";
                                        break;
                                    }
                                }
                                if (selected_room_id !== "") { break; } // Early break if a room satisfies requirement
                            }
                            if (selected_room_id === "") { continue; } // Go on to the next sub attempt
                            // 2.5.4. Schedule and room are both available, can now insert blocks
                            for (var j = time; j < time + all_blocks[t][b].activity.duration; j++) {
                                logger.debug("Inserting", all_blocks[t][b].activity.name, "at day", day, "time", j, "room", selected_room_id);
                                all_blocks[t][b].day = day;
                                all_blocks[t][b].time = time;
                                all_blocks[t][b].room_id = selected_room_id;
                                logger.debug("room:", all_blocks[t][b].room_id);
                                groups[t][g].schedule[day][j] = new BlockForScheduling(selected_room_id, all_blocks[t][b].activity, day, time);
                                // The room taken up by this activity must be removed from availability list
                                const dindex = available_rooms[day][j].indexOf(selected_room_id);
                                available_rooms[day][j].splice(dindex, 1);
                            }
                            // Inserted successfully, break from sub attempts, go on to the next block
                            inserted = true;
                            break;
                        }
                        // 2.5.5. Sub attempts reach maximum, no place to insert a block, start a new big attempt
                        if (!inserted) {
                            logger.debug("Failed to insert after", MAX_SUB_ATTEMPT, "sub-attempts");
                            failed = true;
                            break;
                        }
                    }
                    // Break from group loop
                    if (failed)
                        break;
                }
                // Break from camp loop
                if (failed)
                    break;
            }
            // 2.5.6. If failed, start a new big attempt, else, the scheduling generation is complete.
            if (!failed)
                break;

            // 2.5.7. Redo preparation to start a new big attempt
            // Reset all schedules to empty
            for (var c = 0; c < groups.length; c++) {
                for (var g = 0; g < groups[c].length; g++) {
                    groups[c][g].schedule_id = uuid.v1();
                    groups[c][g].schedule = [];
                    for (var i = 0; i < DAY; i++) {
                        groups[c][g].schedule.push([]);
                        for (var j = 0; j < TIME; j++) {
                            groups[c][g].schedule[i].push(undefined);
                        }
                    }
                }
            }
            // Reset all available rooms
            available_rooms = [];
            for (var i = 0; i < DAY; i++) {
                available_rooms.push([]);
                for (var j = 0; j < TIME; j++) {
                    available_rooms[i].push([...rooms]);
                }
            }
        }
        if (big_attempt === MAX_BIG_ATTEMPT) {
            logger.debug("scheduleAlgorithm - Big attempts reach maximum: this algorithm fails to generate shedules with given data.");
            throw Error("scheduleAlgorithm - Big attempts reach maximum: this algorithm fails to generate shedules with given data.");
        }
        return groups;
    } catch (err) {
        logger.error(err);
        // save an empty schedule so that nothing crashes.
        saveJson.saveJsonToFile("[[]]", './saved_scheduled.json');
        throw new Error(err.message);
    }
}

/** Test function with dummy data.
 * 
 * @returns The list of groups with schedule properly set.
 */
function schedule_dummy_test() {
    var groups = gs.group_dummy_test();

    // DUMMY DATA STARTS HERE
    var DUMMY_ACTIVITIES = [];
    DUMMY_ACTIVITIES.push(new ActivityForScheduling('0', 'Class', 1, 'common', 20, ['0', '1', '2', '3', '4', '5', '11', '12', '13', '14', '15', '16', '17', '18', '19'], 'C1'));
    DUMMY_ACTIVITIES.push(new ActivityForScheduling('0', 'Class', 1, 'common', 20, ['0', '1', '2', '3', '4', '5', '11', '12', '13', '14', '15', '16', '17', '18', '19'], 'C2'));
    DUMMY_ACTIVITIES.push(new ActivityForScheduling('1', 'Special', 2, 'common', 5, ['6', '7', '8', '9', '10'], 'C1'));
    DUMMY_ACTIVITIES.push(new ActivityForScheduling('1', 'Special', 2, 'common', 5, ['6', '7', '8', '9', '10'], 'C2'));
    // Test for no enough activities: OK
    // Test for mandatory fillers: OK
    DUMMY_ACTIVITIES.push(new ActivityForScheduling('2', 'Other', 1, 'filler', 1, ['0', '1', '2', '3', '4', '5', '11', '12', '13', '14', '15', '16', '17', '18', '19'], 'C1'));
    DUMMY_ACTIVITIES.push(new ActivityForScheduling('2', 'Other', 1, 'filler', 1, ['0', '1', '2', '3', '4', '5', '11', '12', '13', '14', '15', '16', '17', '18', '19'], 'C2'));
    // Test for non-mandatory fillers: OK
    // DUMMY_ACTIVITIES.push(new ActivityL('2', 'Other', 1, 'filler', 0, ['0', '1', '2', '3', '4', '5', '11', '12', '13', '14', '15', '16', '17', '18', '19'], 'C1'));
    // DUMMY_ACTIVITIES.push(new ActivityL('2', 'Other', 1, 'filler', 0, ['0', '1', '2', '3', '4', '5', '11', '12', '13', '14', '15', '16', '17', '18', '19'], 'C2'));
    // Test for invalid activities: OK
    // Case 1:
    // DUMMY_ACTIVITIES.push(new ActivityL('3', 'Error', -1, 'common', 1, ['0', '1', '2', '3', '4', '5', '11', '12', '13', '14', '15', '16', '17', '18', '19'], 'C1'));
    // Case 2:
    // DUMMY_ACTIVITIES.push(new ActivityL('3', 'Error', 10, 'common', 1, ['0', '1', '2', '3', '4', '5', '11', '12', '13', '14', '15', '16', '17', '18', '19'], 'C1'));
    // Test for too many activities:
    // DUMMY_ACTIVITIES.push(new ActivityL('3', 'Many', 2, 'common', 10, ['0', '1', '2', '3', '4', '5'], 'C1'));
    // Test for extreme cases:
    // DUMMY_ACTIVITIES.push(new ActivityL('3', 'Long', 8, 'common', 1, ['0', '1', '2', '3', '4', '5', '11', '12', '13', '14', '15', '16', '17', '18', '19'], 'C1'));

    var DUMMY_ROOMS = [];
    for (var r = 0; r < 20; r++) {
        DUMMY_ROOMS.push(r.toString());
    }

    return scheduleAlgorithm(groups, DUMMY_ACTIVITIES, DUMMY_ROOMS);
}
// Test with dummy data
/*
var DUMMY_RESULT = schedule_dummy_test();
logger.debug(DUMMY_RESULT);
for (var t = 0; t < DUMMY_RESULT.length; t++) {
    logger.debug(`Camp ${DUMMY_RESULT[t][0].camp_type}`);
    for (var g = 0; g < DUMMY_RESULT[t].length; g++) {
        logger.debug(`${DUMMY_RESULT[t][g].name}`);
        process.stdout.write("Time: \t0\t1\t2\t3\t4\t5\t6\t7\n")
        for (var d = 0; d < DAY; d++) {
            process.stdout.write(`Day ${d}:\t`);
            for (var tm = 0; tm < TIME; tm++) {
                var name = DUMMY_RESULT[t][g].schedule[d][tm].activity.name;
                process.stdout.write(`${name}\t`);
            }
            process.stdout.write('\n');
            process.stdout.write(`Room:\t`);
            for (var tm = 0; tm < 8; tm++) {
                var room = DUMMY_RESULT[t][g].schedule[d][tm].room_id;
                process.stdout.write(`${room}\t`);
            }
            process.stdout.write('\n');
        }
    }
}*/

module.exports = {
    scheduleAlgorithm,
    scheduleCall
}

