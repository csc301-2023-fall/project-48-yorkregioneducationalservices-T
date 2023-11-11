-- Initalization
drop schema if exists summer_camp cascade; 
create schema summer_camp;
set search_path to summer_camp;


-- Represents a counselor that teaches in a group 
create table Counselor (
    counselor_id uuid primary key,      -- The auto generated unique ID
    firstname text not null,            -- <UI> 
    lastname text not null,             -- <UI>
    campus_id text                      -- <UI> The ID of the campus this counselor will teach in
);


-- Represents a group, i.e. an instance of a camp  Decide if I should be keeping it 
class Group (
    group_id uuid primary key,		-- The auto generated unique ID
    schedule_id text not null,  	-- The ID of the schedule of this group
    camp_id text not null 		    -- The ID of the camp this group belongs to
);


-- Represents a student that studies in a group 
create table Student (
    student_id uuid primary key,            -- The auto generated unique ID
    firstName text not null,                -- <UI>
    lastName text not null,                 -- <UI>
    age integer not null,                   -- <UI>
    sex text not null,                      -- <UI>
    groupID integer references Counselor    
);


-- All the rooms in the summer camp.
create table Room (
    room_id uuid primary key,		-- The auto generated unique ID
    name text not null		        -- <UI> The name of the room
    activity_ids (set<string>) 	    -- <UI> The IDs of the activities that can take place in this room
);


-- The friend preferences for all the students.
create table FriendPreference (
    student_id1 integer not null references Student(student_id),    -- The student id of the first friend
    student_id2 integer not null references Student(student_id),    -- The student id of the second friend 
    isApart bool not null,                                          -- If the students should be apart
    primary key (student_id1, student_id2),                         -- Primary key 
    check (student_id1 > student_id2)                               -- Make sure they are not duplicates
);


-- Represents an administrator, the only type of user that can access the app
create table LoginInfo (
    username text primary key,          -- The admin login username
    password text not null              -- The admin login hash password
);


-- Represents an activity that all groups of a type of camp will be scheduled to do 
create table Activity (
    activity_id uuid primary key,	-- The auto generated unique ID
    name text not null, 		-- <UI> The name of the activity
    duration integer not null,		-- <UI> The number of hours this activity takes
    type text not null,		-- <UI> The type of the activity (filler / common)
    num_occurences integer not null,	-- <UI> The number of times this activity should be scheduled for each group. It is fixed for a common activity, or the minimum number of times for a filler activity.
)


-- Represents a campus with rooms for camps to take place 
create table Campus (
    campus_id uuid primary key, 		-- The auto generated unique ID
    name text not null,		        -- <UI> The name of the campus
);


-- Represents a camp, i.e. a classification of groups (based on program type and/or student age)
create table Camp (
    camp_id uuid primary key 		-- The auto generated unique ID
    name text not null, 		    -- <UI> The name of the camp
    activity_ids (set<string>) 	    -- The set of IDs of activities all groups of this camp do
    campus_id text not null, 		-- The ID of the campus this camp is in
);


-- Represents a block in a schedule, specifying when an activity of a group starts and end in the schedule */
create table Block (
    block_id uuid primary key,		-- The auto generated unique ID
    schedule_id text not null, 	    -- The ID of the schedule this block belongs to
    room_id text not null, 		    -- The ID of the room this block occupies
    activity_id text not null, 	    -- The ID of the activity of this block
    start_time time not null,   	-- The start moment of this block
    end_time time not null  	    -- The end moment of this block
);


-- Represents the generated schedule of a group
create table Schedule (
    schedule_id uuid primary key,	-- The auto generated unique ID
    group_id text not null,         -- The ID of the group this schedule belongs to
    start_time time not null, 	    -- The start moment of this schedule
    end_time time not null 	        -- The end moment of this schedule
);