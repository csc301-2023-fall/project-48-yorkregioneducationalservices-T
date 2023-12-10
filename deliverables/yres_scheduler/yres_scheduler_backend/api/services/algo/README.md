# Algorithms
## Structure
- This application currently involves two algorithms: the grouping algorithm in `groupAlgo.js` and the scheduling algorithm in `scheduleAlgo.js`, both contained in `services` directory.
- The grouping algorithm requires a list of `Student` and a list of `Counselor`, and the scheduling algorithm requires a list of `Activity` and a list of `Room`, as well as the return value from the grouping algorithm. These lists must satisfy some preconditions for the algorithm to work properly. Note that the current implementation only ensures the code doesn't crash for all input lists we have tested, and throws proper error messages for cases we have thought of. However, since this application is supposed to be used by YRES course managers only, we assume they come up with reasonable inputs. See the precondition and postcondition discussed below.
## Local Classes and Converters
- The current implementation of both algorithms employs an idea of local classes. They are a local version (for the algorithms) of the entity classes. It is designed to break the direct dependency of the algorithms on the entities. If using the entities directly in the algorithm, when one changes, all references to it and its attributes may need revision and change. Therefore, we use the references to entities only in `converter` functions, which translate an entity object to a local object. When changes occur to entities, only the converters may change, unless the change affects the logic of the algorithm.
- Another problem the idea tries to address is that the entity objects, which mostly are used during DB interactions, may store something the algorithm doesn't need and miss something the algorithm does need. 

## Grouping Algorithm (groupAlgo.js)
- **Overview:**
  - Given a list of all students and all counselors, the grouping algorithm assigns them into proper groups. It ensures that students are assigned to groups under the correct camp type and that a proper number of students and counselors are in each group. It also tries to satisfy students' possible friend preferences and make the gender distribution even. Below are some explanations for some concepts that might be confusing.
  - Camp type (a string): a student must be registered for a camp type, and a counselor may have a preferred camp type. For example, students of age 5-12 may register for one type of camp while ones of age 12+ may register for another. A counselor may prefer to teach students of age, but they will be randomly assigned if they don't specify one.
  - Group (instance of `GroupL` class): groups are instances of each camp type. In other words, a group has students and counselors that are in the same class during the summer camp.
  - Friend preference (a list of student IDs): a student might specify the preference by a list of IDs of the students to be grouped with. This is to accommodate those who, for example, have siblings or friends.
- **(Local) Entities Used:**
  - `StudentL`: converted from `Student` by `convertFromStudents`.
  - `CounselorL`: converted from `Counselor` by `convertFromCounselors`.
  - `GroupL`: Currently, groups are not stored in the DB. Therefore, only this local class is used.
- **Workflow:** 
  1. `groupCall` is called with a list of `Student` and a list of `Counselor`.
  2. `groupCall` converts the lists to ones of local classes by calling `convertFromStudents` and `convertFromCounselors`.
  3. `groupCall` calls `generateGroups` with the two converted lists.
  4. `generateGroups` generates and returns the list of all groups.
  5. `groupCall` returns the list of all groups.
- **Algorithm:** See function `generateGroups` for detail. The following graph, as well as a short description, illustrate the basic idea.

![groupAlgo](https://i.imgur.com/x6GyxIz.png)

 Grouping Algorithm Procedure
    1. Separate counselors and students belonging to different camp type:
       1. Generate a 2D-list of students, where each row contains students for a camp type;
       2. Generate a 2D-list of counselors based on camp types occurring in students based on counselors' preferred camp type;
       3. Auto-fill the remaining counselors.
    2. Generate groups for each camp type:
       1. Put friends that need to be together in lists;
       2. Separately get lists of students involving and not involved in friend groups;
       3. Rearrange students not involved in friend groups by gender;
       4. Assign counselors randomly, assign students by friends first, and fill ones without friend preferences if needed.
    3. Return the generated groups.

- **Precondition:**
  - Input lists must be non-empty. This case raises error.
  - For each camp type, *number of groups* = *number of students* $\div$ *max number of students per group*. There must be enough counselors, *number of counselors* = *number of groups* $\times$ *number of counselors per group*. This case raises error.
  - Friend preferences must be specified within a camp type. For example, it is impossible for a student in camp for age 5-12 asks to be grouped together with another in camp for age 12+. This case raises an error.
  - Friend preferences are assumed to be "simple". That is, if they are recursive or form loops between more than 2 students, they are not guaranteed to be all satisfied (but they also don't cause errors).
- **Postcondition:**
  - Returns a 2D-array. Each valid first index refers to a list of groups belonging to the same camp type. The second index refers to one group in that list. Each group, of type `GroupL`, has a field for its camp type, a list of students and a list of counselors assigned to this group, and an empty schedule that is to be filled in the scheduling algorithm. 
  - The camp types specified in students decide the "rows" of the returned array. Counselors specifying a camp type will be assigned to groups of that type. If the preferred camp is full, or no type is specified, or the specified type does not occur in students, the counselor will be auto-filled.
  - As few as possible groups are created. That is, each group has as many students ($\leq \text{max student}$) as possible. Number of groups depends on several students but not the number of counselors. Therefore, all students are guaranteeded to be grouped, but if too many counsellors are given, some might not be assigned to any groups.
  - For each camp type, the number of students of two groups has maximum difference of 1. That is, students are evenly assigned.
  - Friend preferences are prioritized, and those students will be assigned first. After that, other students are assigned by gender. The algorithm tries to make the gender ratio in each group as even as possible.

## Scheduling Algorithm (scheduleAlgo.js)
- **Overview:**
  - Given a list of `Activity` and a list of `Room`, as well as the returned 2D array returned by the grouping algorithm discussed above, the scheduling algorithm fills the schedule for each group in the array, and returns the array with schedules. Below are some explanation for some concepts that might be confusing.
  - Activity (instance of `ActivityL` class): an activity represents a course that all groups of a specific camp will take during the summer camp. It is named "activity" because there might not be only classes in the summer camp. The activity has a duration and a number of occurrences, which means the number of times this activity should be scheduled for each group. Each activity is given a list of IDs of rooms this activity may take place (e.g. P.E. may only take place on the playground while a math class may not take place on the playground). An activity can be one of two types:
    - Common activity
    - Filler activity: if all common activities add up to a total time smaller than the length of schedule, some amount of fillers are added to fill the gap. The filler may also specify a number of occurrences, which is interpreted as the minimum number this activity should take place.
  - Block (instance of `BlockL` class): a block, or a "schedule block", represents an 1-hour period in a schedule. Each block is associated with an activity (an activity with duration >1 hour is represented by several consecutive blocks). It is also associated with a specific room ID, from this activity's list of possible rooms.
  - Schedule (a 2D array of Blocks): each group has a schedule that is filled by the scheduling algorithm. It is a 2D array of blocks, where a row represents a day. Therefore, its size is *number of days* $\times$ *number of hours per day*.
  - Note: currently, the functionality of the grouping algorithm and the scheduling algorithm is combined in one API call, we decided not to make them separate as scheduling is impossible without groups being generated first, and the users are not likely to change the number of groups (even if they need to adjust some students or counselors, the number of groups shouldn't change). Only number of groups affect the scheduling.
- **(Local) Entities Used:**
  - `ActivityL`: converted from `Activity` by `convertFromActivities`.
  - `BlockL`: a 1-hour block in a schedule.
  - Room: no class is needed. Only the IDs of the rooms are used.

- **Workflow:** 
  1. `scheduleCall` is called with a list of each of `Student`, `Counselor`, `Activity`, and room IDs.
  2. `scheduleCall` pass the list of `Student` and that of `Counselor` to `groupCall` in `groupAlgo.js`.
  3. `scheduleCall` converts the list of `Activity` to one of local `ActivityL` by `convertFromStudents`.
  4. `scheduleCall` invokes `scheduleAlgorithm` with the converted list, the list of room IDs, and the returned list of all groups from `groupCall`.
  5. `scheduleAlgorithm` tries to generate groups with given information. It returns the list of all groups with their schedules set appropriately if succeeded.
  6. `scehduleCall` returns that list.

- **Algorithm:** See function `scheduleAlgorithm` for details. The following graph, as well as a short description, illustrates the basic idea.

![scheduleAlgo](https://i.imgur.com/fwLYUKj.png)

Scheduling Algorithm Procedure

    1. Initialization and preparation:
       1. Separate activities based on the camp type of the groups;
       2. Initialize all schedules to empty (set to proper size, set all entries `undefined`);
       3. Initialize the available room array (a 3D array, easier to view as a 2D array with the same size as a schedule, where each entry is a list containing all room ID on the campus);
       4. Compute the number of filler blocks to be added;
       5. Sort activities by descending duration, this is to increase efficiency and possibility to converge;
       6. Initialize the list of blocks to go into each schedule.
    2. Start scheduling:
       1. Enter a "Big attempt":
          - Iterate over all camp types and all groups of a camp type:
              - Iterate over all blocks to insert them into the schedule:
                1. Randomly select a pair of index $(day, time)$ within proper range;
                2. Check if the schedule is available (`undefined`) in that period;
                3. Check if there is an available room in that period (by checking the available room array);
                4. If checks are passed, insert the block into the schedule, update the available room array (deleting the used room ID); 
                5. Else, try inserting again, until maximum attempts (50,000) are exhausted, which indicates a previous insertion may hinder the new insertion. 
        2. If the inner loop doesn't fail (exceed maximum attempts), then all schedules are filled properly, break and returned;
        3. Else, reset all schedules and the available room array to the initial state, and start again. If maximum attempts (1000) are exhausted, the algorithm fails because it can't schedule with supplied data.
    3. Return the list of all groups, where each group's schedule is set.
- **Precondition:**
  - Input lists must be non-empty.
  - Preconditions of the grouping algorithm must be satisfied so that the grouping algorithm can return normally.
  - If no filler activity is present, the total hours of common activities must add up to the length of the schedule. That is, for a list of common activities with length `N`,
![equation](https://i.imgur.com/fHfvHh9.png)
  - Similarly, the sum of the total hours of all common activities and the "minimum hours" of all filler activities must not exceed the length of the schedule. Note that the filler activities have minimum hours because their number of occurrences indicates the minimum number of times they should be scheduled. It is helpful to simply set that field to 0 for the filler activities.
  - Filler activities must have a duration of 1 hour.
  - Enough rooms must be provided, and activities should have proper lists of rooms. These requirements are hard to define rigorously, and depend a lot on "common sense". Some obvious points include:
    The number of rooms should at least be greater than the number of groups.
    - An activity should have at least one room where it may take place.
    - The more available rooms are specified for the activities, the more likely the algorithm succeeds.
- **Postcondition:**
  - If the algorithm returns, all schedules are guaranteed to be filled.
  - All groups of the same camp will have schedules with the same list of activities and the same number of those activities.
  - For two blocks of the same period from any distinct schedules, their room IDs are never the same. In simple words, a room is never assigned to two groups at the same time.
  - The algorithm has some randomness. Therefore, it is likely to generate different schedules given the same set of data. The randomness also leads to the following two points.
  - In case the algorithm fails, the possibility that a re-run would work is very small. Similarly, given a proper set of data, the possibility that the algorithm fails is also very small.
  - In case the algorithm fails, it is not absolute that the input data is faulty-that it is impossible to schedule based on the data. A more comprehensive algorithm may be able to schedule based on it. In this case, improving the data (releasing constraints by, for example, adding possible rooms for the activities) makes the algorithm more likely to converge.
