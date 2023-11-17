const Student = require("../entities/Student");
const Counselor = require("../entities/Counselor");
const Group = require("../entities/Group");
const uuid = require('uuid');

const MAX_STUDENT = 7;
const NUM_COUNSELOR = 1;
/** DUMMY DATA STARTS HERE
const DUMMY_STUDENTS = [{
	student_id: 1,
	name: "Boy_A",
	gender: "M",
	friends: [4, 5],
	enemies: []
}, {
	student_id: 2,
	name: "Boy_B",
	gender: "M",
	friends: [],
	enemies: [7, 8]
}, {
	student_id: 3,
	name: "Boy_C",
	gender: "M",
	friends: [],
	enemies: []
}, {
	student_id: 4,
	name: "Boy_D",
	gender: "M",
	friends: [1],
	enemies: [5]
}, {
	student_id: 5,
	name: "Boy_A",
	gender: "M",
	friends: [],
	enemies: []
}, {
	student_id: 6,
	name: "Boy_E",
	gender: "M",
	friends: [],
	enemies: []
}, {
	student_id: 7,
	name: "Boy_F",
	gender: "M",
	friends: [],
	enemies: []
}, {
	student_id: 8,
	name: "Boy_G",
	gender: "M",
	friends: [],
	enemies: []
}, {
	student_id: 9,
	name: "Boy_H",
	gender: "M",
	friends: [2],
	enemies: []
}, {
	student_id: 10,
	name: "Boy_I",
	gender: "M",
	friends: [],
	enemies: []
}, {
	student_id: 11,
	name: "Girl_A",
	gender: "F",
	friends: [12, 16],
	enemies: []
}, {
	student_id: 12,
	name: "Girl_B",
	gender: "F",
	friends: [],
	enemies: []
}, {
	student_id: 13,
	name: "Girl_C",
	gender: "F",
	friends: [],
	enemies: [11]
}, {
	student_id: 14,
	name: "Girl_D",
	gender: "F",
	friends: [],
	enemies: []
}, {
	student_id: 15,
	name: "Girl_E",
	gender: "F",
	friends: [],
	enemies: []
}, {
	student_id: 16,
	name: "Girl_F",
	gender: "F",
	friends: [],
	enemies: [13, 17]
}, {
	student_id: 17,
	name: "Girl_G",
	gender: "F",
	friends: [],
	enemies: []
}, {
	student_id: 18,
	name: "Girl_H",
	gender: "F",
	friends: [],
	enemies: []
}, {
	student_id: 19,
	name: "Girl_I",
	gender: "F",
	friends: [],
	enemies: []
}, {
	student_id: 20,
	name: "Girl_J",
	gender: "F",
	friends: [],
	enemies: []
}, {
	student_id: 21,
	name: "Girl_K",
	gender: "F",
	friends: [],
	enemies: []
}];

const DUMMY_COUNSELORS = [{
	counselor_id: 1,
	name: "Teacher_A"
}, {
	counselor_id: 2,
	name: "Teacher_B"
}, {
	counselor_id: 3,
	name: "Teacher_C"
}]
*/
// =============== GROUPING ALGORITHM STARTS HERE ========================
/** Group given students and counselors into groups.
 * 
 * @param {Array} counselors - A list of all counselors to be grouped. 
 * @param {Array} students - A list of all students to be grouped.
 * @returns A list of Group entities.
 */
function generateGroups(counselors, students) {
	const num_groups = Math.floor(counselors.length / NUM_COUNSELOR);

	// First check if there are enough counselors
	if (students.length > (num_groups * MAX_STUDENT)) {
		throw new Error("Too many students / not enough counselors");
	}

	const students_per_group = Math.floor(students.length / num_groups);
	let student_remainder = students.length % num_groups;

	/*
	 * Rearrange student list by gender, prefer students given in set for easier operation
	 */
	const arranged_students = [];
	const num_males = students.reduce((male_total, curr_student) => male_total + (curr_student.gender === "M" ? 1 : 0), 0);
	const num_fem = students.length - num_males;
	const mf_ratio = Math.floor(num_males / num_fem);
	const fm_ratio = Math.floor(num_fem / num_males);

	for (let s = 0; s < Math.floor(students.length / (mf_ratio + fm_ratio + 2)); s++) {
		for (let m = 0; m < (mf_ratio + 1); m++) {
			for (let i = 0; i < students.length; i++) {
				if (students[i].gender === "M") {
					arranged_students.push(students.splice(i, 1)[0]);
					break;
				}
			}
		}
		for (let f = 0; f < (fm_ratio + 1); f++) {
			for (let i = 0; i < students.length; i++) {
				if (students[i].gender === "F") {
					arranged_students.push(students.splice(i, 1)[0]);
					break;
				}
			}
		}
	}

	// The remainder of students of a single gender
	students.forEach(student => arranged_students.push(student));

	// Simple print test
	console.log(`Arranged Students Length: ${arranged_students.length}\n`);
	arranged_students.forEach(student => console.log(`Student ID: ${student.student_id} Name: ${student.name}\n`));

	/*
	 * Assign to groups randomly
	 */
	const groups = []
	for (let i = 0; i < num_groups; i++) {
		const new_group = new Group(uuid.v1(), `Group ${i}`, '', [], [], '');
		for (let c = 0; c < NUM_COUNSELOR; c++) {
			new_group.counselor_ids.push(counselors[i * NUM_COUNSELOR + c]);
		}
		for (let s = 0; s < students_per_group; s++) {
			new_group.student_ids.push(arranged_students[i * students_per_group + s]);
		}
		if (student_remainder > 0) {
			new_group.student_ids.push(arranged_students[students_per_group * num_groups + i])
            student_remainder--;
		}
		groups.push(new_group);
	}

	/*
	 * Fix relations based on friend preferences
     * TODO NOT IMPLEMENTED
	 */

	groups.forEach(group => {
		console.log(`Group Name: ${group.name}`);
		group.counselor_ids.forEach(counselor => console.log(`Student ID: ${counselor.counselor_id} Name: ${counselor.name}\n`));
		group.student_ids.forEach(student => console.log(`Student ID: ${student.student_id} Name: ${student.name}\n`));
	})
	return groups;
}

module.exports = {
    generateGroups
}