const origin =
  process.env.NODE_ENV === "development"
    ? process.env.ORIGIN_LOCAL
    : process.env.ORIGIN_PUBLIC;

const corsHeaders = {
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Headers": "Authorization",
  "Access-Control-Allow-Credentials": true,
};

exports.corsHeaders = corsHeaders;
