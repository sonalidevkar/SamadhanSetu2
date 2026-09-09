const Notification = require('../models/Notification');

exports.sendNotification = async (data) => {
    try {
        const notification = await Notification.create(data);
        return notification;
    } catch (error) {
        console.error("Notification Error:", error);
    }
};
