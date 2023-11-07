-- Initalization
drop schema if exists summer_camp cascade; 
create schema summer_camp;
set search_path to summer_camp;

-- Represents a counselor that teaches in a group 
create table Counselor (
    counselor_id text primary key,
    firstname text not null,
    lastname text not null,
    campus_id text
);

-- Represents a student that studies in a group 
create table Student (
    student_id text primary key,
    firstName text not null,
    lastName text not null,
    age integer not null,
    sex text not null,
    groupID integer references Counselor
);

-- All the rooms in the summer camp.
create table Room (
    room_id text primary key,		-- The auto generated unique ID
    name text not null		-- <UI> The name of the room
    activity_ids (set<string>) 	-- <UI> The IDs of the activities that can take place in this room
);

-- The friend preferences for all the students.
create table FriendPreference (
    student_id1 integer not null references Student(student_id),
    student_id2 integer not null references Student(student_id),
    isApart bool not null,
    primary key (student_id1, student_id2),
    check (student_id1 > student_id2)
);

-- Represents an administrator, the only type of user that can access the app
create table LoginInfo (
    username text primary key,
    password text not null 
);

-- Represents an activity that all groups of a type of camp will be scheduled to do 
create table Activity (
    activity_id text primary key,	-- The auto generated unique ID
    name text not null, 		-- <UI> The name of the activity
    duration integer not null,		-- <UI> The number of hours this activity takes
    type text not null,		-- <UI> The type of the activity (filler / common)
    num_occurences integer not null,	-- <UI> The number of times this activity should be scheduled for each group. It is fixed for a common activity, or the minimum number of times for a filler activity.
)

-- Represents a campus with rooms for camps to take place 
create table Campus (
    campus_id text primary key, 		-- The auto generated unique ID
    name text not null,		-- <UI> The name of the campus
);

-- Represents a camp, i.e. a classification of groups (based on program type and/or student age)
create table Camp (
    camp_id text primary key 		-- The auto generated unique ID
    name text not null, 		-- <UI> The name of the camp
    activity_ids (set<string>) 	-- The set of IDs of activities all groups of this camp do
    campus_id text not null, 		-- The ID of the campus this camp is in
);

-- Represents a group, i.e. an instance of a camp  Decide if I should be keeping it 
class Group (
    group_id text primary key		-- The auto generated unique ID
    schedule_id text not null 	-- The ID of the schedule of this group
    student_ids (set<string>) 	-- The IDs of the students that beglong to this group
    counselor_ids (set<string>) -- The IDs of the counselors that belongs to this group
    camp_id (string) 		-- The ID of the camp this group belongs to
);

-- Represents a block in a schedule, specifying when an activity of a group starts and end in the schedule */
create table Block (
    block_id text primary key,		-- The auto generated unique ID
    schedule_id text not null, 	-- The ID of the schedule this block belongs to
    room_id text not null, 		-- The ID of the room this block occupies
    activity_id text not null, 	-- The ID of the activity of this block
    start_time time not null,	-- The start moment of this block
    end_time time not null 	-- The end moment of this block
);

-- Represents the generated schedule of a group
create table Schedule (
    schedule_id text primary key,	-- The auto generated unique ID
    group_id text -- Figure what to reference		-- The ID of the group this schedule belongs to
    blocks (set<Block>)		    -- The blocks of this schedule
    start_time time not null, 	-- The start moment of this schedule
    end_time time not null 	    -- The end moment of this schedule

);