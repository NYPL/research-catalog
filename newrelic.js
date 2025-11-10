"use strict"
const NEW_RELIC_APP_NAME = process.env.NEW_RELIC_APP_NAME
const NEW_RELIC_LICENSE_KEY = process.env.NEW_RELIC_LICENSE_KEY
/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  app_name: [NEW_RELIC_APP_NAME],
  license_key: NEW_RELIC_LICENSE_KEY,
  /**
   * This controls the New Relic Agent logger. When enabled, it will create a newrelic_agent.log file at the root of the app
   * to assist in debugging the agent. This value has no bearing on sending app-related transaction logs to New Relic.
   */
  logging: {
    enabled: false,
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: "info",
  },
  // Browser monitoring is "enable: true" by default but stated here to turn off for any reason.
  browser_monitoring: {
    enable: true,
  },
  /**
   * When true, all request headers except for those listed in attributes.exclude
   * will be captured for all traces, unless otherwise specified in a destination's
   * attributes include/exclude lists.
   */
  allow_all_headers: true,
  attributes: {
    /**
     * Prefix of attributes to exclude from all destinations. Allows * as wildcard
     * at end.
     *
     * NOTE: If excluding headers, they must be in camelCase form to be filtered.
     *
     * @name NEW_RELIC_ATTRIBUTES_EXCLUDE
     */
    exclude: [
      "request.headers.cookie",
      "request.headers.authorization",
      "request.headers.proxyAuthorization",
      "request.headers.setCookie*",
      "request.headers.x*",
      "response.headers.cookie",
      "response.headers.authorization",
      "response.headers.proxyAuthorization",
      "response.headers.setCookie*",
      "response.headers.x*",
    ],
  },
}
