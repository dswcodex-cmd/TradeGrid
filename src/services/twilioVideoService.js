import twilio from "twilio";

const { AccessToken } = twilio.jwt;
const { VideoGrant } = AccessToken;

export const createRoomToken = (identity, roomName) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID || process.env.TWILIO_ASID;
  const apiKey = process.env.TWILIO_API_KEY || process.env.TWILIO_API_KEY_SID;
  const apiSecret = process.env.TWILIO_API_SECRET;

  if (
    !accountSid ||
    !apiKey ||
    !apiSecret
  ) {
    return null;
  }

  const token = new AccessToken(
    accountSid,
    apiKey,
    apiSecret,
    { identity: String(identity) }
  );

  token.addGrant(new VideoGrant({ room: roomName }));
  return token.toJwt();
};
