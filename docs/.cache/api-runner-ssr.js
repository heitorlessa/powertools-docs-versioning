var plugins = [{
      plugin: require('/Users/lessa/DEV/aws-lambda-powertools-python/docs/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/lessa/DEV/aws-lambda-powertools-python/docs/node_modules/gatsby-remark-autolink-headers/gatsby-ssr'),
      options: {"plugins":[],"offsetY":72,"className":"anchor"},
    },{
      plugin: require('/Users/lessa/DEV/aws-lambda-powertools-python/docs/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-autolink-headers","options":{"offsetY":72}},{"resolve":"gatsby-remark-copy-linked-files","options":{"ignoreFileExtensions":[]}},{"resolve":"gatsby-remark-mermaid","options":{"mermaidOptions":{"themeCSS":"\n            .node rect,\n            .node circle,\n            .node polygon,\n            .node path {\n              stroke-width: 2px;\n              stroke: #3f20ba;\n              fill: #F4F6F8;\n            }\n            .node.secondary rect,\n            .node.secondary circle,\n            .node.secondary polygon,\n            .node.tertiary rect,\n            .node.tertiary circle,\n            .node.tertiary polygon {\n              fill: white;\n            }\n            .node.secondary rect,\n            .node.secondary circle,\n            .node.secondary polygon {\n              stroke: #f25cc1;\n            }\n            .cluster rect,\n            .node.tertiary rect,\n            .node.tertiary circle,\n            .node.tertiary polygon {\n              stroke: #41d9d3;\n            }\n            .cluster rect {\n              fill: none;\n              stroke-width: 2px;\n            }\n            .label, .edgeLabel {\n              background-color: white;\n              line-height: 1.3;\n            }\n            .edgeLabel rect {\n              background: none;\n              fill: none;\n            }\n            .messageText, .noteText, .loopText {\n              font-size: 12px;\n              stroke: none;\n            }\n            g rect, polygon.labelBox {\n              stroke-width: 2px;\n            }\n            g rect.actor {\n              stroke: #26a29d;\n              fill: white;\n            }\n            g rect.note {\n              stroke: #f25cc1;\n              fill: white;\n            }\n            g line.loopLine, polygon.labelBox {\n              stroke: #3f20ba;\n              fill: white;\n            }\n          "}}},"gatsby-remark-code-titles",{"resolve":"gatsby-remark-prismjs","options":{"showLineNumbers":true}},"gatsby-remark-rewrite-relative-links",{"resolve":"gatsby-remark-check-links"}],"remarkPlugins":[[null,{"wrapperComponent":"MultiCodeBlock"}]],"extensions":[".mdx"],"defaultLayouts":{},"lessBabel":false,"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"],"root":"/Users/lessa/DEV/aws-lambda-powertools-python/docs"},
    },{
      plugin: require('/Users/lessa/DEV/aws-lambda-powertools-python/docs/node_modules/gatsby-theme-apollo-docs/gatsby-ssr'),
      options: {"plugins":[],"root":"/Users/lessa/DEV/aws-lambda-powertools-python/docs","menuTitle":"Helpful resources","githubRepo":"awslabs/aws-lambda-powertools-python","baseUrl":"https://awslabs.github.io/aws-lambda-powertools-python","algoliaApiKey":"a8491b576861e819fd50d567134eb9ce","algoliaIndexName":"aws-lambda-powertools-python","logoLink":"https://awslabs.github.io/aws-lambda-powertools-python","sidebarCategories":{"null":["index"],"Core utilities":["core/tracer","core/logger","core/metrics"],"Utilities":["utilities/middleware_factory","utilities/parameters","utilities/batch","utilities/typing","utilities/validation","utilities/data_classes","utilities/parser"]},"navConfig":{"Serverless Best Practices video":{"url":"https://www.youtube.com/watch?v=9IYpGTS7Jy0","description":"AWS re:Invent ARC307: Serverless architectural patterns & best practices - Origins of Powertools"},"AWS Well-Architected Serverless Lens":{"url":"https://d1.awsstatic.com/whitepapers/architecture/AWS-Serverless-Applications-Lens.pdf","description":"AWS Well-Architected Serverless Applications Lens whitepaper"},"Amazon Builders Library":{"url":"https://aws.amazon.com/builders-library/","description":"Collection of living articles covering topics across architecture, software delivery, and operations"},"AWS CDK Patterns":{"url":"https://cdkpatterns.com/patterns/","description":"CDK Patterns maintained by Matt Coulter (@nideveloper)"}},"footerNavConfig":{"API Reference":{"href":"https://awslabs.github.io/aws-lambda-powertools-python/api/","target":"_blank"},"Serverless":{"href":"https://aws.amazon.com/serverless/"},"AWS SAM Docs":{"href":"https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html"}}},
    },{
      plugin: require('/Users/lessa/DEV/aws-lambda-powertools-python/docs/node_modules/gatsby-remark-autolink-headers/gatsby-ssr'),
      options: {"plugins":[],"offsetY":0,"className":"anchor"},
    },{
      plugin: require('/Users/lessa/DEV/aws-lambda-powertools-python/docs/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[],"output":"/sitemap.xml","createLinkInHead":true},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
