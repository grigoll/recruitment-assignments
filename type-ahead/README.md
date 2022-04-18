## API

### Typeahead

Example:

```ts
<Typeahead
  loading
  multiple
  options={[{ label: 'One' }, { label: 'Two' }]}
  inputProps={{
    name: 'count',
    placeholder: 'Count',
  }}
/>
```

`For the detailed API please check the component declaration`

## Available Scripts

### Prerequisite

Please run `yarn install` before running an app to get all the necessary packages.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

<br/>

## Part 3 - Q & A

`If you had control of the web-server, what are some ways you might implement a caching solution?`

For server-side caching I would use in-memory data storage like Redis to reduce load from the database.  
For simplicity let's imagine we have a server, a redis for cache, and a database.  
A simple cache implementation solution flow could look like the following:

1. Web-server receives request from a client.
2. Server checks Redis for a cache data.
3. - If it cache exists, sends it to the client.
   - Otherwise, reads data from the database, updates cache with the data, and send it to the client.

But above steps are not enough. There would be an issue - data in the cache becomes stale and we need a way to deal with this.  
I can think of two possible ways to deal with it, depending on a product requirements and business logic.  
Assigning cache data 'max-age' attribute OR versioning cache data.

1. Assigning cache data 'max-age' attribute.  
   If it's acceptable to let cache data go stale for predefined amount of time, we could introduce 'max-age' attribute that determines cache data validity. And we will have following flow:

   - Sever receives request
   - It checks cache data
     - If it hasn't aged more than allowed 'max-age', server sends it to a client
     - Otherwise: server invalidates cache, queries database for the data and puts the data in the cache along with sending it to a client.

2. Versioning cache data.  
   If it's not acceptable to let stale cache data live, we could take approach of versioning cache data and keeping versions immutable. Whenever data changes in a database we increment cache version integer column. We'll keep version number in the database and include it in a cache key. In this case our flow will look like:

   - Server receives a request.
   - It queries database for the latest cache data version.
   - Checks if cache data stored in Redis is the same version
     - If yes - server sends client the cache data from Redis.
     - If not: server invalidates the cache, queries database for the data and puts the data in the cache along with sending it to a client.

   This approach adds additional database query, but it would still be more optimal than calling a very expensive API.

<br/>

`How might you implement offline caching for your typeahead component?`

If I need a very simple solution and the data we're dealing with is relatively small, `LocalStorage` can be used.  
We will have an interface that caches data in storage when we're online and another one that will be responsible for handling data retrieval from storage when we're offline. Our main application will be communicating with them.

As for more sophisticated solution, if data we're dealing with is large, then using `LocalStorage` would not be optimal and I would consider using `IndexedDB` since it can handle large amounts of data well. For caching and data retrieval, we can use `Service Worker`. The advantage of using a service worker is that it's non-blocking and it would be running in a separate thread. Another one is that since service worker can intercept network requests, the main application business-logic could remain the same. The main application would still send regular requests while behind the scenes service worker would intercept them and cache server-sent data when online or query `IndexedDB` when necessary for offline-use.

<br/>

`When using traditional session cookies, what are the primary security concerns and mitigation techniques you might use?`

Since session cookies are used by a server to identify the user, one of the security concerns is that an attacker can claim to be that user if he gets hold of the user's cookies and then use them to gain illegitimate access to the user’s account on the website.  
One of the ways it can be mitigated is to use HTTPS for the entire website and use secure cookies flag so that cookies are only sent over secure channels and could not be accessed as a clear text.  
Another way to mitigate security risks is to use HttpOnly flag that prevents JavaScript from accessing cookies which reduces risks in case of XSS attack.

<br/>

`What are some advantages and disadvantages to using JWT for authorization and authentication in a web application?`

Let's start with advantages. One of them is that JWTs do not need to be saved in database, that implies a bit faster response time and marginally reduced cost in case of using cloud services and being charged per query basis, especially when we're dealing with a lot of users.  
Also using JWTs are more scalable, we can have one auth-server independent from others which will only need to verify tokens using a public key.

As for disadvantages, since JWTs have single private key if it somehow gets leaked, less likely but still possible (by a careless developer, admin, etc.), the whole system gets compromised. Another one is that JWT can get large in size, especially since it can include additional non-security data in it, this might affect request/response speed and UX. Also it's impossible if not very troublesome to have a functionality like "Sign out of all devices" since JTW is stateless and not stored on a server side.

<br/>

`What are all the ways you can think of to write BAD React code?`

- Direct DOM manipulation using `document.getElementById('some-id')` or similar methods. It is a non-React way of handling things in React.

- Having all functions inline arrow functions, especially containing a lot of logic.

- Controlling rendering options with deep nested ternary operators, it's prone to bugs and hard to understand.

- Direct state mutation. A big no-no.

- Having all styles specified as inline object literals. Terrible to look at, bad developer experience.

- Not using callbacks in a state update, when new state is derived from previous one.  
  Eg: `setVisible(!isVisible)` and `setVisible(visible => !visible)` (first one is considered bad).

- Extensive use of memoization in unnecessary places.

- Using so-called "magic" strings/numbers that do not make sense themselves (not only in React, but in general programming).

<br/>

`What new Web or React APIs are you most excited about?`

I am really excited about `React Suspense`, in particular its support for data fetching or for any kind of asynchronous work.  
To keep it short, in my opining using it would let us write relatively better code when we're dealing with data fetching or any kind of async work.  
And also it would help us avoid so-called "waterfall" effect (which is common and can significantly affect UX in some cases) in our components.
