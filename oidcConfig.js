// oidcConfig.js

const oidcConfig = {
  authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_9ngEGjOnk',
  client_id: '6e5l0db9dc66lr0uoc54ehpij3',
  redirect_uri: 'https://intentional-dating.com/',
  post_logout_redirect_uri: 'https://intentional-dating.com/',
  response_type: 'code',
  scope: 'openid email phone profile',
};

export default oidcConfig;

