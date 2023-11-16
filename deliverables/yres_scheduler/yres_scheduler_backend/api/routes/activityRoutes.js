const activityService = require('../controllers/activityController');

/**
 * Defines the routes for activity-related API endpoints.
 * @param {Object} app - The Express application object.
 */
module.exports = (app) => {
    /**
     * 
     */
    app.get('/activities/getAllActivities/', async (req, res) => {
        try {
            const all_activities = await activityService.getAllActivities(req, res);    
            res.send(all_activities);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    /**
     * 
     */
    .post('/activities/createActivity/', async (req, res) => {
        try {
            const resp = await activityService.createActivity(req, res);
            if (resp === true){
                res.status(200).send('Success');
            } else {
                res.status(200).send('Failure');
            }
            
        } catch (error) {
            res.status(500).send(error);
        }
    })
    /**
     * 
     */
    .post('/rooms/deleteActivityById/', async (req, res) => {
        try {
            const resp = await activityService.deleteActivityById(req, res);
            res.send(resp);
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
};