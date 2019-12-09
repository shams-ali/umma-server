const {CLIENT_EMAIL, PRIVATE_KEY} = process.env;

const keys = {
  "type": "service_account",
  "project_id": "ummacharities",
  "private_key_id": "11044eb65f82a696b46d56283c4e8fff3d22c18c",
  "private_key": PRIVATE_KEY,
  "client_email": CLIENT_EMAIL,
  "client_id": "115112544811722259266",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ummacharities%40ummacharities.iam.gserviceaccount.com"
}

module.exports = keys;