
module.exports = class Activity {

    camp_id;
    activity_id;
    name;
    time_length;

    constructor(camp_id,
                activity_id,
                name,
                time_length) {
        this.camp_id = camp_id;
        this.activity_id = activity_id;
        this.time_length = time_length; // hours
        this.name = name;
    }

}