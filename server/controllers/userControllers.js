// Cron Job
const cronJob = async (req, res) => {
    res.status(200).json({ message: "Running" });
}

module.exports = {
    cronJob
};