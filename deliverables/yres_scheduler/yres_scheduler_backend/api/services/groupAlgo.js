const uuid = require('uuid');

const MAX_STUDENT = 7;
const NUM_COUNSELOR = 1;
class GroupL {
	constructor(group_id, name, schedule_id, students, counselors, camp_type) {
		this.group_id = group_id;
		this.name = name;
		this.schedule_id = schedule_id;
		this.students = students;
		this.counselors = counselors;
		this.camp_type = camp_type;
		this.schedule = undefined;
	}
}
class StudentL {
	constructor(student_id, gender, friends, camp_type) {
		this.student_id = student_id;
		this.gender = gender;
		this.friends = friends;
		this.camp_type = camp_type;
	}
}
class CounselorL {
	constructor(counselor_id, camp_type) {
		this.counselor_id = counselor_id;
		this.camp_type = camp_type;
	}
}

/** Converter between Counselor entity class and local StudentL class.
 * 
 * @param {Array} students - list of Student entities.
 */
function convertFromStudents(students) {
	var studentLs = [];
	if (students === undefined) {
		console.log("groupAlgo - Undefined: list of students is undefined.");
		throw Error("groupAlgo - Undefined: list of students is undefined.");
	}
	for (var s = 0; s < students.length; s++) {
		if (students[s].student_id === undefined || students[s].sex === undefined || students[s].friend_ids === undefined || students[s].campus_id === undefined) {
			console.log("groupAlgo - Incomplete data: required attributes is missing in a student object.");
			throw Error("groupAlgo - Incomplete data: required attributes is missing in a student object.");
		}
		studentLs.push(new StudentL(students[s].student_id, students[s].sex, students[s].friend_ids, students[s].campus_id)); // TODO: TODO: to be replaced by camp_type
	}
}

/** Converter between Counselor entity class and local CounselorL class.
 * 
 * @param {Array} counselors - list of Counselor entities.
 */
function convertFromCounselors(counselors) {
	var counselorLs = [];
	if (counselors === undefined) {
		console.log("groupAlgo - Undefined: list of counselors is undefined.");
		throw Error("groupAlgo - Undefined: list of counselors is undefined.");
	}
	for (var c = 0; c < counselors.length; c++) {
		if (counselors[c].counselor_id === undefined || counselors[c].campus_id === undefined) { // TODO: to be replaced by camp_type
			console.log("groupAlgo - Incomplete data: required attributes is missing in a counselor object.");
			throw Error("groupAlgo - Incomplete data: required attributes is missing in a counselor object.");
		}
		counselorLs.push(new CounselorL(counselors[c].counselor_id, counselors[c].campus_id));
	}
}
// =============== GROUPING API CALL ========================
/** Schedule algorithm calls this function to generate group first
 * 
 * @param {Array} counselors - list of Counselor entities.
 * @param {Array} students - list of Student entities.
 */
function groupCall(counselors, students) {
	var counselorLs = convertFromCounselors(counselors);
	var studentLs = convertFromStudents(students);
	generateGroups(counselorLs, studentLs);
}

// =============== GROUPING ALGORITHM STARTS HERE ========================
/** Group given students and counselors into groups.
 * 
 * @param {Array} counselors - A list of all counselors to be grouped. 
 * @param {Array} students - A list of all students to be grouped.
 * @returns A 2D list of groups, first index into camp type, second index into group in that camp type.
 */
function generateGroups(counselors, students) {
	var camp_types = [];
	var counselors_by_type = [];
	var students_by_type = [];
	var num_groups_per_type = [];
	var groups = [];
	// Step 1. Separate counselors and students belonging to different camp type
	// 1.1. Generate a list of students for each camp type
	for (let s = 0; s < students.length; s++) {
		// If this camp type is seen for the first time, add it
		if (camp_types.length == 0 || camp_types.indexOf(students[s].camp_type) < 0) {
			camp_types.push(students[s].camp_type);
			students_by_type.push([]);
		}
		const type_index = camp_types.indexOf(students[s].camp_type);
		students_by_type[type_index].push(students[s]);
	}
	for (let t = 0; t < camp_types.length; t++) {
		num_groups_per_type.push(Math.ceil(students_by_type[t].length / MAX_STUDENT));
		counselors_by_type.push([]);
		groups.push([]);
	}
	// 1.2. Generate lists of counselors based on camp types occuring in students
	var tbd = [];	// A temporary list to hold the counselors TBD (if the camp type is full or if they have no type preference)
	for (let c = 0; c < counselors.length; c++) {
		// If the counselor has a valid camp type preference
		if (camp_types.indexOf(counselors[c].camp_type) >= 0) {
			const type_index = camp_types.indexOf(counselors[c].camp_type);
			// If this camp type needs more counselors
			if (counselors_by_type[type_index].length < num_groups_per_type[type_index] * NUM_COUNSELOR) {
				counselors_by_type[type_index].push(counselors[c]);
			}
			else {
				tbd.push(counselors[c]);
			}
		}
		// If the camp type is invalid or unspecified, the counselor is auto-filled
		else {
			tbd.push(counselors[c]);
		}
	}
	// 1.3. Auto-fill process
	for (let t = 0; t < camp_types.length; t++) {
		// Fill counselors to the type of camp until enough
		while (counselors_by_type[t].length < num_groups_per_type[t] * NUM_COUNSELOR) {
			const fill = tbd.pop();
			// No counselor is available to fill, raise error
			if (fill === undefined) {
				console.log("generateGroups: Error -1, no enough counselors.");
				throw Error("generateGroups: Error -1, no enough counselors.");
			}
			counselors_by_type[t].push(fill);
		}
	}
	if (tbd.length == 0) {
		console.log("generateGroups: Warning, too many counselors");
		// This case can be handled by increasing number of groups (decreasing students in each of those groups), if required.
	}
	// 1.4. Print test
	for (let t = 0; t < camp_types.length; t++) {
		console.log(`Camp Type: ${camp_types[t]}`);
		for (let s = 0; s < students_by_type[t].length; s++) {
			console.log(`Student ID: ${students_by_type[t][s].student_id}`);
		}
		for (let c = 0; c < counselors_by_type[t].length; c++) {
			console.log(`Counselor ID: ${counselors_by_type[t][c].counselor_id}`);
		}
	}

	// Step 2. Generate groups for each camp type
	for (let t = 0; t < camp_types.length; t++) {
		console.log("Generate groups for camp type", camp_types[t]);
		// 2.1. Put friends that need to be together in lists
		var added = []; // A list to record the students included in friend lists
		var friend_lists = []; // A list of friend groups
		// For every student
		for (let s = 0; s < students_by_type[t].length; s++) {
			var fl_index = -1;
			// For every friend this student wants, if any
			for (let f = 0; f < students_by_type[t][s].friends.length; f++) {
				// Check if this friend ID exists in this camp
				var is_same_camp = false;
				for (s2 = 0; s2 < students_by_type[t].length; s2++) {
					if (students_by_type[t][s2].student_id === students_by_type[t][s].friends[f])
						is_same_camp = true;
				}
				if (!is_same_camp) {
					console.log(`generateGroups: Warning, invalid friend preference, ID ${students_by_type[t][s].friends[f]} does not exist or is not in this camp.`);
					continue;
				}
				// If this student has friend preference and hasn't been added as others' friend, add this as a new friend group
				if (added.indexOf(students_by_type[t][s].student_id) < 0) {
					var end = friend_lists.push([]);
					friend_lists[end - 1].push(students_by_type[t][s].student_id);
					added.push(students_by_type[t][s].student_id);
					console.log(`Student ${students_by_type[t][s].student_id} has friends to be addded`);
				}
				// Locate this student in a list in friend lists, including if just added
				for (let fl = 0; fl < friend_lists.length; fl++) {
					if (friend_lists[fl].indexOf(students_by_type[t][s].student_id) >= 0) {
						fl_index = fl;
						break;
					}
				}
				// If this student's friend has not appeared in any friend groups yet, add to be together with this student
				if (added.indexOf(students_by_type[t][s].friends[f]) < 0) {
					if (friend_lists[fl_index].length == MAX_STUDENT) {
						console.log("generateGroups: Warning, friend preference cannot be fulfilled because a friend network size exceeds maximum group size.");
					}
					else {
						friend_lists[fl_index].push(students_by_type[t][s].friends[f]);
						added.push(students_by_type[t][s].friends[f]);
						console.log(`Student ${students_by_type[t][s].friends[f]} is added as friend of ${students_by_type[t][s].student_id}`);
					}
				}
				else {
					console.log(`Student ${students_by_type[t][s].friends[f]} is added previously`);
				}
			}
		}
		// Print test for friend list
		for (let fl = 0; fl < friend_lists.length; fl++) {
			console.log(`Friend group ${fl}`);
			for (let f = 0; f < friend_lists[fl].length; f++) {
				console.log(`Student ID: ${friend_lists[fl][f]}`);
			}
		}

		// 2.2. Get lists of students involving and not involving in friend groups
		// In friend groups
		for (let fl = 0; fl < friend_lists.length; fl++) {
			for (let f = 0; f < friend_lists[fl].length; f++) {
				for (let s = 0; s < students_by_type[t].length; s++) {
					if (friend_lists[fl][f] === students_by_type[t][s].student_id) {
						friend_lists[fl][f] = students_by_type[t][s];
					}
				}
			}
		}
		// Not in friend groups
		var student_list = [];
		for (let s = 0; s < students_by_type[t].length; s++) {
			if (added.indexOf(students_by_type[t][s].student_id) < 0) {
				student_list.push(students_by_type[t][s]);
			}
		}
		// 2.3 Rearrange students not involving in friend groups by gender
		const arranged_students = [];
		const num_males = student_list.reduce((male_total, curr_student) => male_total + (curr_student.gender === "M" ? 1 : 0), 0);
		const num_fem = student_list.length - num_males;
		const mf_ratio = Math.ceil(num_males / num_fem);
		const fm_ratio = Math.ceil(num_fem / num_males);
		// Add students by gender alternatively
		for (let s = 0; s < Math.floor((num_males + num_fem) / (mf_ratio + fm_ratio)); s++) {
			for (let m = 0; m < mf_ratio; m++) {
				for (let i = 0; i < student_list.length; i++) {
					if (student_list[i].gender === "M") {
						arranged_students.push(student_list.splice(i, 1)[0]);
						break;
					}
				}
			}
			for (let f = 0; f < fm_ratio; f++) {
				for (let i = 0; i < student_list.length; i++) {
					if (student_list[i].gender === "F") {
						arranged_students.push(student_list.splice(i, 1)[0]);
						break;
					}
				}
			}
		}
		// Add the remainder of students of a single gender
		student_list.forEach(student => arranged_students.push(student));

		// Simple print test
		console.log(`Arranged Students Length: ${arranged_students.length}`);
		arranged_students.forEach(student => console.log(`Student ID: ${student.student_id}`));

		// 2.4. Assign counselors randomly, assign students by friends first, and fill ones without friend preferences if needed
		for (let i = 0; i < num_groups_per_type[t]; i++) {
			const new_group = new GroupL(uuid.v1(), `Camp ${camp_types[t]} Group ${i}`, '', [], [], camp_types[t]);
			for (let c = 0; c < NUM_COUNSELOR; c++) {
				new_group.counselors.push(counselors_by_type[t][i * NUM_COUNSELOR + c]);
			}
			// Try adding students in friend groups first, until impossible to add
			var is_added = false;
			do {
				is_added = false;
				for (let fl = 0; fl < friend_lists.length; fl++) {
					if (new_group.students.length + friend_lists[fl].length <= MAX_STUDENT) {
						for (let f = 0; f < friend_lists[fl].length; f++) {
							new_group.students.push(friend_lists[fl][f]);
						}
						friend_lists.splice(fl, 1);
						is_added = true;
					}
				}
			} while (is_added);
			// Fill the group with students not involving in friend groups, if needed
			for (let s = new_group.students.length; s < MAX_STUDENT - 1; s++) {
				if (arranged_students.length == 0)
					break;
				new_group.students.push(arranged_students.pop());
			}
			groups[t].push(new_group);
		}
		// This is for the groups to have closer to average number of students
		for (let i = 0; i < num_groups_per_type[t]; i++) {
			if (arranged_students.length == 0) // No more students to fill
				break;
			if (groups[t][i].students.length == MAX_STUDENT) // This group is already filled up
				continue;
			groups[t][i].students.push(arranged_students.pop());
		}

		// Print groups in this camp
		groups[t].forEach(group => {
			console.log(`Group Name: ${group.name}`);
			group.counselors.forEach(counselor => console.log(`Counselor: ${counselor.counselor_id}`));
			group.students.forEach(student => console.log(`Student: ${student.student_id}`));
		})
	}

	return groups;
}

/** Test function with dummy data.
 * 
 * @returns The list of groups returned by generateGroups.
 */
function group_dummy_test() {
	// DUMMY DATA STARTS HERE
	var DUMMY_STUDENTS = [];
	for (let i = 1; i < 21; i++) {
		DUMMY_STUDENTS.push(new StudentL(i.toString(), 'M', [], 'C1'));
	}
	for (let i = 21; i < 41; i++) {
		DUMMY_STUDENTS.push(new StudentL(i.toString(), 'F', [], 'C1'));
	}
	for (let i = 41; i < 61; i++) {
		DUMMY_STUDENTS.push(new StudentL(i.toString(), 'M', [], 'C2'));
	}
	for (let i = 61; i < 81; i++) {
		DUMMY_STUDENTS.push(new StudentL(i.toString(), 'F', [], 'C2'));
	}

	// Test for friend preferences handling:
	// Following 5 students must appear in the same group
	DUMMY_STUDENTS[3].friends.push('5');
	DUMMY_STUDENTS[3].friends.push('6');
	DUMMY_STUDENTS[3].friends.push('21');
	DUMMY_STUDENTS[5].friends.push('3');
	DUMMY_STUDENTS[5].friends.push('6');
	DUMMY_STUDENTS[5].friends.push('25');
	// Following 3 students must appear in the same group
	DUMMY_STUDENTS[8].friends.push('10');
	DUMMY_STUDENTS[9].friends.push('8');
	DUMMY_STUDENTS[10].friends.push('9');
	// Following should raise a warning
	DUMMY_STUDENTS[8].friends.push('50');
	// Following should raise a warning, while 7 students should be in the same group
	DUMMY_STUDENTS[22].friends.push('30');
	DUMMY_STUDENTS[22].friends.push('31');
	DUMMY_STUDENTS[22].friends.push('32');
	DUMMY_STUDENTS[22].friends.push('33');
	DUMMY_STUDENTS[22].friends.push('34');
	DUMMY_STUDENTS[22].friends.push('35');
	DUMMY_STUDENTS[22].friends.push('36');

	// Test for different male/female ratio: OK
	// for (let i = 1; i < 11; i++) {
	// 	DUMMY_STUDENTS.push(new StudentL(i.toString(), 'M', [], 'C1'));
	// }
	// for (let i = 11; i < 41; i++) {
	// 	DUMMY_STUDENTS.push(new StudentL(i.toString(), 'F', [], 'C1'));
	// }
	// for (let i = 41; i < 71; i++) {
	// 	DUMMY_STUDENTS.push(new StudentL(i.toString(), 'M', [], 'C2'));
	// }
	// for (let i = 71; i < 81; i++) {
	// 	DUMMY_STUDENTS.push(new StudentL(i.toString(), 'F', [], 'C2'));
	// }

	var DUMMY_COUNSELORS = [];
	for (let c = 1; c < 4; c++) {
		DUMMY_COUNSELORS.push(new CounselorL(c.toString(), 'C1'));
	}
	for (let c = 4; c < 8; c++) {
		DUMMY_COUNSELORS.push(new CounselorL(c.toString(), 'C2'));
	}
	for (let c = 8; c < 13; c++) {
		DUMMY_COUNSELORS.push(new CounselorL(c.toString(), ''));
	}
	// Test for no enough counselors: OK
	// for (let c = 8; c < 11; c++) {
	// 	DUMMY_COUNSELORS.push(new CounselorL(c.toString(), ''));
	// }

	return generateGroups(DUMMY_COUNSELORS, DUMMY_STUDENTS);
}

// Test with dummy data
console.log(group_dummy_test());

module.exports = {
	GroupL,
	groupCall,
	generateGroups,
	group_dummy_test
}