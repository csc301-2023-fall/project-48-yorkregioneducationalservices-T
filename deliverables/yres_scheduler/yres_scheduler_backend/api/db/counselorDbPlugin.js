const Counselor = require("../entities/Counselor");
const uuid = require('uuid');
const { client } = require('./db');

async function getAllCounselorsByCampus(campusId) {
}
async function createCounselor(counselor) {
}
async function editCounselorById(counselor) {
}
async function deleteCounselorById(counselorId) {
}

module.exports = {
    getAllCounselorsByCampus,
    createCounselor,
    editCounselorById,
    deleteCounselorById
}