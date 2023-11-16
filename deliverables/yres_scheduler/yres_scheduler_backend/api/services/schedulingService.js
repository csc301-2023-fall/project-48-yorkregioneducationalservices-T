/* THESE MIGHT BE REMOVED OR MOVED TO CONFIG LATER */
const DAY = 5;
const TIME = 8;
const MAX_ATTEMPT = 1000000;

/* THESE WILL BE REMOVED ONCE ALL ENTITIES ARE READY */
class Block {
    constructor(room_id, activity, duration) {
        this.room_id = room_id;
        this.activity = activity;
        this.duration = duration;
    }
}
class Group {
    constructor(name) {
        this.name = name;
        this.schedule = [];
    }
}
class Activity {
    constructor(activity_id, name, duration, type, num_occurences, room_ids) {
        this.activity_id = activity_id;
        this.name = name;
        this.duration = duration; // hours
        this.type = type;
        this.num_occurences = num_occurences;
        this.room_ids = room_ids;
    }
}

/* THESE DUMMY DATA WILL BE REMOVED ONCE CONNECTED TO OTHER APIS */
var activities = [new Activity("1", "class", 1, "common", 24, ["1", "2", "3", "4", "5"]),
new Activity("2", "sport", 2, "common", 2, ["6"]),
new Activity("3", "art", 1, "common", 2, ["1", "2", "3", "4", "5"]),
new Activity("4", "cs", 1, "common", 2, ["7"]),
new Activity("5", "filler_A", 1, "filler", 0, ["1", "2", "3", "4", "5"]),
new Activity("6", "filler_B", 1, "filler", 0, ["6", "7"])];

var groups = [new Group("A"), new Group("B"), new Group("C")];

var rooms = ["1", "2", "3", "4", "5", "6", "7"];

/* STARTS HERE IS THE FUNCTION BODY, WHICH WILL BE REMOVED AFTER CONNECTED TO
    OTHER APIS */
// Initialize the schedules to empty
for (var g = 0; g < groups.length; g++) {
    for (var i = 0; i < DAY; i++) {
        groups[g].schedule.push([]);
        for (var j = 0; j < TIME; j++) {
            groups[g].schedule[i].push(undefined);
        }
    }
}
// Initialize the available room array
available_rooms = []
for (var i = 0; i < DAY; i++) {
    available_rooms.push([]);
    for (var j = 0; j < TIME; j++) {
        available_rooms[i].push([...rooms]);
    }
}
var fillers = [];
var commons = [];
var time_sum = 0;
for (var a = 0; a < activities.length; a++) {
    if (activities[a].type === "common")
        commons.push(activities[a]);
    if (activities[a].type === "filler")
        fillers.push(activities[a]);
    time_sum += activities[a].duration * activities[a].num_occurences;
}
if (time_sum > DAY * TIME) {
    console.log("scheduleAlgorithm - Too many activities: total hour greater than schedule length.");
    throw Error("scheduleAlgorithm - Too many activities: total hour greater than schedule length.");
}
console.log("Scheduling for total hour:", time_sum);
var filler_hours = DAY * TIME - time_sum;
console.log(filler_hours, "hours of fillers will be added");

var all_blocks = [];
// Create a list of blocks
for (var a = 0; a < activities.length; a++) {
    for (var i = 0; i < activities[a].num_occurences; i++) {
        all_blocks.push(new Block("", activities[a], activities[a].duration));
    }
}
filler_index = 0
for (var f = 0; f < filler_hours; f++) {
    all_blocks.push(new Block("", fillers[filler_index], fillers[filler_index].duration));
    filler_index++;
    if (filler_index === fillers.length)
        filler_index = 0;
}
// Start attempts
for (var big_attempt = 0; big_attempt < MAX_ATTEMPT; big_attempt++) {
    console.log("Big attempt:", big_attempt, "starts")
    var failed = false;
    for (var g = 0; g < groups.length; g++) {
        console.log("Scheduling for group", groups[g].name);
        // Try inserting a block into a schedule
        for (var b = 0; b < all_blocks.length; b++) {
            var inserted = false;
            // Start sub-attempts
            for (var attemp = 0; attemp < MAX_ATTEMPT; attemp++) {
                var day = Math.floor(Math.random() * DAY);
                var time = Math.floor(Math.random() * (TIME - all_blocks[b].activity.duration + 1));
                // Check schedule availability
                var occupied = false;
                for (var j = time; j < time + all_blocks[b].activity.duration; j++) {
                    if ((groups[g].schedule[day][j]) !== undefined) {
                        occupied = true;
                        break;
                    }
                }
                if (occupied) {
                    continue;
                }
                var selected_room_id = "";
                // Search for available room in period of activity
                for (var r = 0; r < all_blocks[b].activity.room_ids.length; r++) {
                    selected_room_id = all_blocks[b].activity.room_ids[r];
                    for (var j = time; j < time + all_blocks[b].duration; j++) {
                        if (available_rooms[day][j] === undefined || available_rooms[day][j].indexOf(selected_room_id) < 0) {
                            selected_room_id = "";
                            break;
                        }
                    }
                    if (selected_room_id !== "")
                        break;
                }
                // If available room is found
                if (selected_room_id !== "") {
                    for (var j = time; j < time + all_blocks[b].duration; j++) {
                        console.log("Inserting", all_blocks[b].activity.name, "at day", day, "time", time);
                        groups[g].schedule[day][j] = all_blocks[b];
                        groups[g].schedule[day][j].room_id = selected_room_id;
                        const dindex = available_rooms[day][j].indexOf(selected_room_id);
                        available_rooms[day][j].splice(dindex, 1);
                    }
                    inserted = true;
                    break;
                }
            }
            // If there is no place to insert a block, must start a new big attempt
            if (!inserted) {
                console.log("Failed to insert after", MAX_ATTEMPT, "sub-attempts");
                failed = true;
                break;
            }
        }
        if (failed)
            break;
    }
    if (!failed)
        break;

    // Prepare to start new big attempt, reset group's schedules
    // TODO should be done in group entity's method
    for (var g = 0; g < groups.length; g++) {
        groups[g].schedule = []
        for (var i = 0; i < DAY; i++) {
            groups[g].schedule.push([]);
            for (var j = 0; j < TIME; j++) {
                groups[g].schedule[i].push(undefined);
            }
        }
    }
    available_rooms = [];
    for (var i = 0; i < DAY; i++) {
        available_rooms.push([]);
        for (var j = 0; j < TIME; j++) {
            available_rooms[i].push([...rooms]);
        }
    }
}

// Simple print
for (var g = 0; g < groups.length; g++) {
    console.log(groups[g].name);
    console.log(groups[g].schedule);
    for (var i = 0; i < DAY; i++) {
        console.log("Day", i, ":")
        for (var j = 0; j < TIME; j++) {
            console.log(groups[g].schedule[i][j].activity.name);
        }
    }
}


/* ============ HERE STARTS THE FUNCTION ================

function scheduleAlgorithm(groups, activities, rooms) {
    // Initialize the schedules to empty
    for (var g = 0; g < groups.length; g++) {
        for (var i = 0; i < DAY; i++) {
            groups[g].schedule.push([]);
            for (var j = 0; j < TIME; j++) {
                groups[g].schedule[i].push(undefined);
            }
        }
    }
    // Initialize the available room array
    available_rooms = []
    for (var i = 0; i < DAY; i++) {
        available_rooms.push([]);
        for (var j = 0; j < TIME; j++) {
            available_rooms[i].push([...rooms]);
        }
    }
    var fillers = [];
    var commons = [];
    var time_sum = 0;
    for (var a = 0; a < activities.length; a++) {
        if (activities[a].type === "common")
            commons.push(activities[a]);
        if (activities[a].type === "filler")
            fillers.push(activities[a]);
        time_sum += activities[a].duration * activities[a].num_occurences;
    }
    if (time_sum > DAY * TIME) {
        console.log("scheduleAlgorithm - Too many activities: total hour greater than schedule length.");
        throw Error("scheduleAlgorithm - Too many activities: total hour greater than schedule length.");
    }
    console.log("Scheduling for total hour:", time_sum);
    var filler_hours = DAY * TIME - time_sum;
    console.log(filler_hours, "hours of fillers will be added");

    var all_blocks = [];
    // Create a list of blocks
    for (var a = 0; a < activities.length; a++) {
        for (var i = 0; i < activities[a].num_occurences; i++) {
            all_blocks.push(new Block("", activities[a], activities[a].duration));
        }
    }
    filler_index = 0
    for (var f = 0; f < filler_hours; f++) {
        all_blocks.push(new Block("", fillers[filler_index], fillers[filler_index].duration));
        filler_index++;
        if (filler_index === fillers.length)
            filler_index = 0;
    }
    // Start attempts
    for (var big_attempt = 0; big_attempt < MAX_ATTEMPT; big_attempt++) {
        console.log("Big attempt:", big_attempt, "starts")
        var failed = false;
        for (var g = 0; g < groups.length; g++) {
            console.log("Scheduling for group", groups[g].name);
            // Try inserting a block into a schedule
            for (var b = 0; b < all_blocks.length; b++) {
                var inserted = false;
                // Start sub-attempts
                for (var attemp = 0; attemp < MAX_ATTEMPT; attemp++) {
                    var day = Math.floor(Math.random() * DAY);
                    var time = Math.floor(Math.random() * (TIME - all_blocks[b].activity.duration + 1));
                    // Check schedule availability
                    var occupied = false;
                    for (var j = time; j < time + all_blocks[b].activity.duration; j++) {
                        if ((groups[g].schedule[day][j]) !== undefined) {
                            occupied = true;
                            break;
                        }
                    }
                    if (occupied) {
                        continue;
                    }
                    var selected_room_id = "";
                    // Search for available room in period of activity
                    for (var r = 0; r < all_blocks[b].activity.room_ids.length; r++) {
                        selected_room_id = all_blocks[b].activity.room_ids[r];
                        for (var j = time; j < time + all_blocks[b].duration; j++) {
                            if (available_rooms[day][j] === undefined || available_rooms[day][j].indexOf(selected_room_id) < 0) {
                                selected_room_id = "";
                                break;
                            }
                        }
                        if (selected_room_id !== "")
                            break;
                    }
                    // If available room is found
                    if (selected_room_id !== "") {
                        for (var j = time; j < time + all_blocks[b].duration; j++) {
                            console.log("Inserting", all_blocks[b].activity.name, "at day", day, "time", time);
                            groups[g].schedule[day][j] = all_blocks[b];
                            groups[g].schedule[day][j].room_id = selected_room_id;
                            const dindex = available_rooms[day][j].indexOf(selected_room_id);
                            available_rooms[day][j].splice(dindex, 1);
                        }
                        inserted = true;
                        break;
                    }
                }
                // If there is no place to insert a block, must start a new big attempt
                if (!inserted) {
                    console.log("Failed to insert after", MAX_ATTEMPT, "sub-attempts");
                    failed = true;
                    break;
                }
            }
            if (failed)
                break;
        }
        if (!failed)
            break;

        // Prepare to start new big attempt, reset group's schedules
        // TODO should be done in group entity's method
        for (var g = 0; g < groups.length; g++) {
            groups[g].schedule = []
            for (var i = 0; i < DAY; i++) {
                groups[g].schedule.push([]);
                for (var j = 0; j < TIME; j++) {
                    groups[g].schedule[i].push(undefined);
                }
            }
        }
        available_rooms = [];
        for (var i = 0; i < DAY; i++) {
            available_rooms.push([]);
            for (var j = 0; j < TIME; j++) {
                available_rooms[i].push([...rooms]);
            }
        }
    }

}
*/