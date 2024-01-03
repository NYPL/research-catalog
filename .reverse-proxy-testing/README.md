# Reverse Proxy Testing

This is for locally testing reverse-proxy configurations that map certain site areas to RC and other areas to DFE.

## Requirements

 - Need [DFE](https://github.com/NYPl-discovery/discovery-front-end) cloned, installed, and configured
 - Need [RC](https://github.com/NYPL/research-catalog) (this app) cloned, installed, and configured
 - Need nginx. To install, run `brew install nginx`

## Starting the reverse proxy

1. Start DFE in a different terminal:
   - Ensure `.env` has `NODE_ENV=production`
   - Run `nvm use; npm run dist`
   - Run `nvm start`
   - Note the port
2. Start RC in a different terminal:
   - Run `nvm run dev`
3. Start nginx:
   - Ensure `./rc.conf` has the correct ports for DFE (3001?) and RC (8080?)
   - Run `./restart-reverse-proxy.sh`
4. Visit `https://localhost:8081/research/research-catalog`

### Restarting

After making changes to `rc.conf`, run:

`./restart-reverse-proxy.sh`

### Stopping

Nginx will continue to listen for requests to `localhost:8081` until you stop it. It's harmless, but if you want the port back:

`nginx -s stop`

## Mappings

See [./rc.conf](rc.conf) for mappings. At writing, RC responsibilities are Home, Search, and Bib Details. DFE will handle SHEP, Account.

### Known issues

Login flow is not working at the moment due to the wrong host being passed through. Hold routes are also not configured.
