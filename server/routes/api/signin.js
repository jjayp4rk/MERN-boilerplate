const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const bcrypt = require('bcrypt');

module.exports = (app) => {
	app.post('/api/account/signup', (req, res, next) => {
		const { body } = req;
		const { 
			firstName,
			lastName,
			password
		} = body;
		let {
			email
		} = body;

		if (!firstName) {
			return res.send({
				success: false,
				message: 'Error: First name cannot be blank'
			});
		}
		if (!lastName) {
			return res.send({
				success: false,
				message: 'Error: Last name cannot be blank'
			});
		}
		if (!email) {
			return res.send({
				success: false,
				message: 'Error: Email cannot be blank'
			});
		}
		if (!password) {
			return res.send({
				success: false,
				message: 'Error: Password cannot be blank'
			});
		}
		email = email.toLowerCase();
		User.find({
			email: email
		}, (err, previousUsers) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: Server error'
				});
			} else if (previousUsers.length >0){
				return res.send({
					success: false,
					message: 'Error: Account already exists'
				});
			}
			const newUser = new User();

			newUser.email = email; 
			newUser.firstName = firstName;
			newUser.lastName = lastName;
			newUser.password = newUser.generateHash(password);
			newUser.save((err, user) => {
				if (err) {
					console.log(err);
					res.send({
						success: false,
						message: 'Error: Servor error'
					});
				}
				res.send({
					success: true,
					message: 'Signed up'
				});
			});
		});

	});

// Signin POST Route
	app.post('/api/account/signin', (req, res, next) => {
		const { body } = req;
		const { 
			password
		} = body;
		let {
			email
		} = body;
		if (!email) {
			return res.send({
				success: false,
				message: 'Error: Email cannot be blank'
			});
		}
		if (!password) {
			return res.send({
				success: false,
				message: 'Error: Password cannot be blank'
			});
		}

		email = email.toLowerCase();
		User.find({
			email: email
		}, (err, users) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: server error!!!!!'
				})
			}
			if (users.length !=1) {
				return res.send({
					success: false,
					message: 'Error: invalid!'
				});
			}

			const user = users[0];
			if (!user.validPassword(password)) {
				return res.send({
					message: false,
					message: 'Error: Invalid'
				});
			}

			const userSession = new UserSession();
			userSession.userId = user._id;
			userSession.save((err, doc) =>{
				if (err) {
					return res.send({
						sucess: false,
						message: 'Error: server error'
					});
				}

				return res.send({
					success: true,
					message: 'valid sign in',
					token: doc._id
				});
			});
		});
	});

	app.get('/api/account/verify', (req, res, next) => {
		// Get Token
		const { query } = req;
		const { token } = query;
		// ?token=test

		// Verify the token token is unqiue and not deleted.
		UserSession.find({
			_id: token,
			isDeleted: false
		}, (err, sessions) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: Server error'
				});
			}
			if (sessions.length !=1) {
				return res.send({
					success: false,
					message: 'Error: invalid'
				});
			} else {
				return res.send({
					success: true,
					message: 'Good!'
				});
			}
		});
	});

	app.get('/api/account/logout', (req, res, next) => {
		const { query } = req;
		const { token } = query;
		// ?token=test

		// Verify the token token is unqiue and not deleted.
		UserSession.findOneAndUpdate({
			_id: token,
			isDeleted: false
		}, {
			$set:{isDeleted:true}
		}, null, (err, sessions) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: Server error'
				});
			}
			return res.send({
				success: true,
				message: 'Good!'
			});
		});
	});
};