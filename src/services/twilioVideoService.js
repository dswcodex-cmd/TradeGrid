import twilio from "twilio";

const { AccessToken } = twilio.jwt;
const { VideoGrant } = AccessToken;

export const createRoomToken = (identity, roomName) => {
  if (
    !process.env.TWILIO_ACCOUNT_SID ||
    !process.env.TWILIO_API_KEY ||
    !process.env.TWILIO_API_SECRET
  ) {
    return null;
  }

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    { identity: String(identity) }
  );

  token.addGrant(new VideoGrant({ room: roomName }));
  return token.toJwt();
};
