const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const createRoomToken = (userId, roomName) => {
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    { identity: userId }
  );
  token.addGrant(new VideoGrant({ room: roomName }));
  return token.toJwt();
};