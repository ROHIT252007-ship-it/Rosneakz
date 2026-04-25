import Notification from '../model/notification.modal.js';

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'Notifications fetched successfully',
      error: false,
      data: notifications,
    });
  } catch (error) {
    console.log('Get Notification Error:', error);

    return res.status(500).json({
      message: 'Failed to fetch notifications',
      error: true,
    });
  }
};