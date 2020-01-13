var Mongoose = require('mongoose');

const UserProfile = require('../../database-mongo/user-profile.js');

let createprofile = async (req, userid) => {
	const userProfile = new UserProfile({
		_id: new Mongoose.Types.ObjectId(),
		_userId: userid,
		fullname: req.body.name,
		phoneNumber: req.body.phoneNumber
	});
	console.log(userProfile);
	try {
		const newprofile = await UserProfile.create(userProfile);
		return newprofile;
	} catch (err) {
		return err;
	}
};

module.exports = createprofile;
