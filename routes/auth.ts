import express from 'express';
import twilio from 'twilio';

const verifyServiceSID: string = process.env.VERIFY_SERVICE_SID || '';
const verifyAccountSID: string = process.env.VERIFY_ACCOUNT_SID || '';
const verifyAccountToken: string = process.env.VERIFY_ACCOUNT_TOKEN || '';

const verifyClient = twilio(verifyAccountSID, verifyAccountToken);

let router: any = express.Router();

router.post('/send-verify-code', async (req: express.Request, res: express.Response) => {
  if (verifyServiceSID == '') {
    return res.status(500).send({error: 'VERIFY API NOT SET. MISSING VARIABLES.'});
  }
  let verifyResponse = await verifyClient.verify.services(verifyServiceSID).verifications.create({ to: req.body.phone, channel: 'sms' });
  console.log('started verifying number ' + req.body.phone, verifyResponse);
  return res.status(200).send({
    success: verifyResponse.status == 'pending' ? true : false
  });
});

router.post('/verify-number', async (req: express.Request, res: express.Response) => {
  if (verifyServiceSID == '') {
    return res.status(500).send({error: 'VERIFY API NOT SET. MISSING VARIABLES.'});
  }
  let verifyResponse = await verifyClient.verify.services(verifyServiceSID).verificationChecks.create({ to: req.body.phone, code: req.body.code });
  console.log(`started verifying number "${req.body.phone}" with code "${req.body.code}"`, verifyResponse);
  return res.status(200).send({
    success: verifyResponse.status == 'approved' ? true : false
  });
});

export = router;
