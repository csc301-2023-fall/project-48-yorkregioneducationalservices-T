
module.exports = class ScheduleBlock {

        activity;
        start_time;
        end_time;

        constructor(activity, start_time, end_time) {
            this.activity = activity;
            this.start_time = start_time;
            this.end_time = end_time;
        }

}