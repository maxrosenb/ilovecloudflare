
const cfwTakeHomeUrl = 'https://cfw-takehome.developers.workers.dev/api/variants'

async function handleRequest(request) {
  const init = {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  }
  const pageInit = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }
  //execute initial fetch request
  const response = await fetch(cfwTakeHomeUrl, init);
  const result = await gatherResponse(response);

  //get urls
  const urls = result.variants
  const url0 = urls[0];
  const url1 = urls[1];

  //get first response
  const pageResponse0 = await fetch(url0)
  const pageResult0 = await gatherResponse(pageResponse0)

  //get second response
  const pageResponse1 = await fetch(url1)
  const pageResult1 = await gatherResponse(pageResponse1)


  //AB TESTING WITH 50/50 Chance
  const NAME = 'experiment-0'
  // Responses below are place holders, you could set up
  // a custom path for each test (e.g. /control/somepath )
  const VERSION_A =  new Response(pageResult0, pageInit)
  const VERSION_B =  new Response(pageResult1, pageInit)
  // Determine which group this requester is in.
  const cookie = request.headers.get('cookie')
  if (cookie && cookie.includes(`${NAME}=control`)) {
    return VERSION_A
  } else if (cookie && cookie.includes(`${NAME}=test`)) {
    return VERSION_B
  } else {
    // if no cookie then this is a new client, decide a group and set the cookie
    let group = Math.random() < 0.5 ? 'test' : 'control' // 50/50 split
    let response = group === 'control' ? VERSION_A : VERSION_B
    response.headers.append('Set-Cookie', `${NAME}=${group}; path=/`)
    return rewriter.transform(response)
  }
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})
/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get('content-type')
  if (contentType.includes('application/json')) {
    return await response.json()
  } else if (contentType.includes('application/text')) {
    return await response.text()
  } else if (contentType.includes('text/html')) {
    return await response.text()
  } else {
    return await response.text()
  }
}

//HTML Rewriter to rewrite HTML elements
class AttributeRewriter {
  constructor(attributeName) {
    this.attributeName = attributeName
  }

  element(element) {
    const attribute = element.getAttribute(this.attributeName)
    console.log(attribute)
    if (attribute) {
      element.setAttribute(
        this.attributeName,
        attribute.replace('cloudflare.com', 'google.com')
      )
    }
  }
}

class ElementRewriter {
  element(element) {
    element.setInnerContent("Thanks for the oppurtunity cloudflare!")
  }
}

const rewriter = new HTMLRewriter()
  .on('a#url', new AttributeRewriter('href'))
  .on('p#description', new ElementRewriter('href'))

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
