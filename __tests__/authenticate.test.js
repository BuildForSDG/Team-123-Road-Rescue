
const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const passport = require('passport');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('it should get user account from the API', () => {
  let authSpy;
  let requestPromiseStub;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    authSpy = sinon.spy(passport, 'authenticate');
  });

  afterEach(() => {
    sandbox.restore();
  });


  it('should be able to access passport authenticate local', () => {
    const mockReq = {
      body: {
        email: 'fakeymcfakeypants',
        password: '123Skidoo'
      },
      logIn() {}
    };

    const mockRes = {
    };

    requestPromiseStub = sinon.stub();

    const next = sinon.stub();

    requestPromiseStub.onCall(0).returns(Promise.resolve({ userId: 138, statusCode: 200 }))
      .onCall(1).returns(Promise.resolve({ email: 'fakeymcfakeypants@fake.com', status: 0 }));

    const overrides = {
      'request-promise': requestPromiseStub,
      authenticate: { authenticate: authSpy }
    };

    proxyquire('../server/authenticationConfig/authentication.js', overrides);

    // added 'next' here as authenticate expects it: https://github.com/jaredhanson/passport/blob/master/lib/middleware/authenticate.js#L81
    // passport should return either a username, or false, not sure how to access that?

    passport.authenticate('login')(mockReq, mockRes, next);

    // if I comment out the 'logIn' function above and make an explicit function here
    // I can see the username being returned, but of course it's inside the function closure:

    // expect(requestPromiseStub).to.have.been.called();
  });
});
