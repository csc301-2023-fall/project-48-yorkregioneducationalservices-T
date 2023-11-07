-- Initalization
drop schema if exists summer_camp cascade; 
create schema summer_camp;
set search_path to summer_camp;

-- A counselors in the summer camp.
create table Counselor (
    counselor_id text primary key,
    firstname text not null,
    lastname text not null,
    campus_id text
);

-- The students in the summer camp.
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
    rID integer primary key,
    roomType varchar(50) not null
);

-- The friend preferences for all the students.
create table FriendPreference (
    student_id1 integer not null references Student(student_id),
    student_id2 integer not null references Student(student_id),
    isApart bool not null,
    primary key (student_id1, student_id2),
    check (student_id1 > student_id2)
);

-- The admin username and password 
create table LoginInfo (
    username varchar(50) primary key,
    password varchar(50) not null 
);

-- This stores the blocked out rooms at a specfic time 
-- specifying the activity that is taking place and 
-- for which group that will be using it. 
create table Blocked (
    startTime time,
    blockedDay char,
    groupID integer references Counselor,
    activityType varchar(50) not null,
    rID integer not null references Room,
    duration interval not null,
    primary key (startTime, blockedDay, groupID)
);
