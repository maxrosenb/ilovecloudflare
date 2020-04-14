# Cloudflare Workers Internship Application: Full-Stack

### ByMax Rosenberg


Avaiable at [ilovecloudflare.com](ilovecloudflare.com) (DNS Propogation pending)


If the domain is not yet available, also available at [https://cloudflare-project.maxrosenb.workers.dev/](https://cloudflare-project.maxrosenb.workers.dev/)


An application that will randomly send users to one of two webpages, as described in the assignment specs. All three extra credit assignments were completed. This project taught me a lot about Cloudflare Worker and its Runtime APIs. I enjoyed the project and appreciate the opportunity to apply to cloudflare and learn about new technologies like Workers.


## Features

### 1. Request the URLs from the API

Makes a fetch request to `https://cfw-takehome.developers.workers.dev/api/variants`, parses the response as JSON, saves to a variable.

### 2. Request a URL variant

Makes a fetch request to one of the two URLs, and return it as the response from the script.

### 3. Distribute requests between variants (A/B Testing)

The `/api/variants` API route will return an array of two URLs. Requests should be evenly distributed between the two urls, in A/B testing style. This means that when a client makes a request to the Workers script, the script should roughly return each variant around 50% of the time.

## Extra Credit

### 1. Changing copy/URLs

Changed some text and redirection url.

### 2. Persisting variants

If a user visits the site and receives one of the two URLs, the client persists which URL is chosen in a cookie so that they always see the same variant when they return to the application.

### 3. Publish to a domain

Published to ilovecloudflare.com
