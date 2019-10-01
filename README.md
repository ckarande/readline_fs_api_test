
## Lab 1: Sync vs. Async Performance

**Setup**

1. Run `npm i` to install required npm packages.
2. Update `controller.js` file to select sync in `exports.get`
3. Open a terminal
4. Run `npm run clinic`
3. Open anoter terminal side-by-side in VS code, repeat steps 2 to 4 after uncommenting callback based code
4. compare latency at 97.5 % (97.5 % request took longer to process than this time). Also, compare total requests processed in the time from the data on termimal
5. Compare event loop block time in both cases in the browser.

Note: No need to start server to run clinic command

## Testing  overload protection:
1. Start server `npm run start`
2. The overlad protection features monitors event loop delay for 20 ms
3. Access the endpoint from the browser `http://localhost:3600/`, it should receive respose with text normally.
4. Start load testing using `npm run autocannon`
5. While load test running, access the endpoint from the browser `http://localhost:3600/`. This should return [503 response] : ./503_response.png