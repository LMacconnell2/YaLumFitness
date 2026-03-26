const getCurrentUserSurvey = (req, res) => {
    //1. santize the info from the req object
    //2. get the current user's _id, limit, offset, and date range using the req object.
    //3. query the database on the _id to retrieve all surveys attached to the given user.
    //4. Return the array of survey objects retrieved from the database.
    return "array of objects";
}

const getSurveyResults = (req, res) => {
    //1. Sanitze the info from the req object
    //2. get the query, date range, offset, and limit from the req object.
    //3. query the database on q, daterange, limit, offset.
    //4. Return the array of survey objects retrieved from the database.
    return "array of objects.";
}

const getSurveyById = (req, res) => {
    //1. Sanitze the info from the req object
    //2. get the requested survey ID from the req object.
    //3. query the database on the survey ID.
    //4. Return the object retrieved fro the database.
    return "object";
}

const deleteSurveyById = (req, res) => {
    //1. Sanitze the info from the req object
    //2. get the requested survey ID from the req object.
    //3. Query the databse to see if the requested ID exists.
    //4. Remove the survey with the given survey ID (if it exists, else return a not found message.)
    //5. Return a message stating whether or not the operation was successful.
    return "message";
}

const updateSurveyById = (req, res) => {
    //1. Sanitze the info from the req object
    //2. get the requested survey ID from the req object.
    //3. Query the databse to see if the requested ID exists.
    //4. Update the survey with the given survey ID (if it exists, else return a not found message.)
    //5. Return a message stating whether or not the operation was successful.
    return "message";
}

const newSurvey = (req, res) => {
    //1. Sanitze the info from the req object.
    //2. Get the info from the req object.
    //3. Insert the new survey responses into the database under a new ID.
    //4. Return a message stating if the operation was successful or not.
    return "message";
}

export { getCurrentUserSurvey, getSurveyById, getSurveyResults, deleteSurveyById, updateSurveyById, newSurvey };