import moment from "moment";


export const events = {
  monday: [
    {
      id: 1,
      name: "Homework",
      startTime: moment("2018-02-23T11:30:00").toDate(),
      endTime: moment("2018-02-23T13:30:00").toDate()
    },

    {
      id: 2,
      name: "Classwork",
      startTime: moment("2018-02-23T09:30:00").toDate(),
      endTime: moment("2018-02-23T11:00:00").toDate()
    },
    {
      id: 3,
      name: "Test",
      startTime: moment("2018-02-22T14:30:00").toDate(),
      endTime: moment("2018-02-22T15:30:00").toDate()
    },
    {
      id: 4,
      name: "Test",
      startTime: moment("2018-02-22T15:30:00").toDate(),
      endTime: moment("2018-02-22T16:30:00").toDate()
    }
  ],
  tuesday: [
    {
      id: 5,
      name: "Homework",
      startTime: moment("2018-02-22T09:30:00").toDate(),
      endTime: moment("2018-02-22T11:30:00").toDate()
    },
    {
      id: 6,
      name: "Classwork",
      startTime: moment("2018-02-23T12:00:00").toDate(),
      endTime: moment("2018-02-23T13:00:00").toDate()
    },
    {
      id: 7,
      name: "Classwork",
      startTime: moment("2018-02-23T13:30:00").toDate(),
      endTime: moment("2018-02-23T14:30:00").toDate()
    },
    {
      id: 8,
      name: "Classwork",
      startTime: moment("2018-02-23T15:30:00").toDate(),
      endTime: moment("2018-02-23T17:30:00").toDate()
    }
  ],
  wednesday: [
    {
      id: 9,
      name: "Classwork",
      startTime: moment("2018-02-23T13:30:00").toDate(),
      endTime: moment("2018-02-23T14:30:00").toDate()
    },
    {
      id: 10,
      name: "Test",
      startTime: moment("2018-02-22T15:30:00").toDate(),
      endTime: moment("2018-02-22T16:30:00").toDate()
    }
  ],
  thursday: [
    {
      id: 11,
      name: "Classwork",
      startTime: moment("2018-02-23T09:30:00").toDate(),
      endTime: moment("2018-02-23T12:30:00").toDate()
    },
    {
      id: 12,
      name: "Test",
      startTime: moment("2018-02-22T14:30:00").toDate(),
      endTime: moment("2018-02-22T18:30:00").toDate()
    }
  ],
  friday: [
    {
      id: 13,
      name: "Classwork",
      startTime: moment("2018-02-23T11:30:00").toDate(),
      endTime: moment("2018-02-23T14:30:00").toDate()
    },
    {
      id: 14,
      name: "Test",
      startTime: moment("2018-02-22T15:30:00").toDate(),
      endTime: moment("2018-02-22T16:30:00").toDate()
    }
  ],
  saturday: [
    {
      id: 15,
      name: "Classwork",
      startTime: moment("2018-02-23T08:30:00").toDate(),
      endTime: moment("2018-02-23T09:30:00").toDate()
    },
    {
      id: 16,
      name: "Test",
      startTime: moment("2018-02-22T16:30:00").toDate(),
      endTime: moment("2018-02-22T17:30:00").toDate()
    }
  ],
  sunday: []
};