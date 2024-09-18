const sinon = require('sinon');
const chai = require('chai');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { sendVerificationEmail } = require('../mailutils/sendMailToVerify');
const { CustomError } = require('../middlewares/error');
const registerController = require('../authControllers/registerController');
const expect = chai.expect;

describe('registerController', () => {
    let req, res, next;

    beforeEach(() => {
        // Set up mock request, response, and next
        req = { body: {} };
        res = { 
            status: sinon.stub().returnsThis(), 
            json: sinon.stub()
        };
        next = sinon.stub();
    });

    afterEach(() => {
        sinon.restore(); // Restore the stubbed/mocked methods
    });

    it('should successfully register a new user', async () => {
        req.body = {
            username: 'testuser',
            fullname: 'Test User',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            password: 'StrongPass123!',
            confirmPassword: 'StrongPass123!'
        };

        // Mocking bcrypt and User model
        sinon.stub(User, 'findOne').resolves(null);  // No existing user
        sinon.stub(bcrypt, 'genSalt').resolves('fake_salt');
        sinon.stub(bcrypt, 'hashSync').returns('hashed_password');
        sinon.stub(User.prototype, 'save').resolves({
            _id: '123',
            username: 'testuser',
            fullname: 'Test User',
            email: 'testuser@example.com'
        });
        sinon.stub(sendVerificationEmail).resolves();

        await registerController(req, res, next);

        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith(sinon.match.has('message', 'User created Successfully'))).to.be.true;
    });

    it('should throw error if email already exists', async () => {
        req.body = {
            username: 'testuser',
            fullname: 'Test User',
            email: 'testuser@example.com',
            phoneNumber: '+1234567890',
            password: 'StrongPass123!',
            confirmPassword: 'StrongPass123!'
        };

        const existingUser = { username: 'testuser', email: 'testuser@example.com', isVerified: true };
        sinon.stub(User, 'findOne').resolves(existingUser); // Mock that user already exists

        await registerController(req, res, next);

        expect(next.calledOnce).to.be.true;
        const error = next.getCall(0).args[0];
        expect(error).to.be.instanceOf(CustomError);
        expect(error.message).to.equal('Username or Email already exists!');
        expect(error.statusCode).to.equal(400);
    });

    it('should throw validation error for invalid input', async () => {
        req.body = {
            username: '',
            fullname: '',
            email: '',
            phoneNumber: '',
            password: 'pass',
            confirmPassword: 'differentpass'
        };

        await registerController(req, res, next);

        expect(next.calledOnce).to.be.true;
        const error = next.getCall(0).args[0];
        expect(error).to.be.instanceOf(CustomError);
        expect(error.message).to.equal('Invalid Credential');
        expect(error.statusCode).to.equal(400);
    });

    // You can add more tests here for other cases
});
