# Cloudflare Workers Internship Application: Full-Stack

### By Max Rosenberg


Avaiable at [ilovecloudflare.com](https://www.ilovecloudflare.com) (possibly pending DNS propogation)


If this domain is not yet available, also available at [cloudflare-project.maxrosenb.workers.dev/](https://cloudflare-project.maxrosenb.workers.dev/)


An application that will randomly send users to one of two webpages, as described in the assignment specs. All three extra credit features were implemented. This project taught me a lot about Cloudflare Workers and its Runtime APIs. I enjoyed the project and really appreciate the opportunity to apply to Cloudflare and learn about new technologies like Workers.


## Features

### 1. Request the URLs from the API

Makes a fetch request to `https://cfw-takehome.developers.workers.dev/api/variants`, parses the response as JSON, and saves to a variable.

### 2. Request a URL variant

Makes a fetch request to one of the two URLs and returns it as the response from the script.

### 3. Distribute requests between variants (A/B Testing)

The `/api/variants` API route returns an array of two URLs. Requests are evenly distributed between the two urls, in A/B testing style. This means that when a client makes a request to the Workers script, the script roughly returns each variant around 50% of the time. This is ensured by choosing the variant randomly with a 50% probability of getting variant 1 or variant 2.

## Extra Credit

### 1. Changing copy/URLs

Modified some text and the redirection url.

### 2. Persisting variants

If a user visits the site and receives one of the two URLs, the client persists which URL is chosen in a cookie so that they always see the same variant when they return to the application.

### 3. Publish to a domain

Published to ilovecloudflare.com
