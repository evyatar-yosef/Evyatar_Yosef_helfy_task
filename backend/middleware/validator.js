function validateTask(req, res, next) {
    const title = req.body.title;
    const priority = req.body.priority;

    // check if titke exist
    if (!title || title.trim() === "") {
        return res.status(400).json({ error: "Title is required and cannot be empty" });
    }

    // check if priority exist
    if (!priority) {
        return res.status(400).json({ error: "Priority is required" });
    }

    // enum for priority validation
    const validPriorities = ["low", "medium", "high"];
    let isValidPriority = false;

    for (let i = 0; i < validPriorities.length; i++) {
        if (validPriorities[i] === priority) {
            isValidPriority = true;
            break;
        }
    }
// handle invalid priority
    if (isValidPriority === false) {
        return res.status(400).json({ error: "Priority must be low, medium, or high" });
    }

    next();
}

module.exports = {
    validateTask: validateTask
};