
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    

// src/build/image-cdn.ts
var setImageConfig = async (ctx) => {
  const {
    images: { path: imageEndpointPath, loader: imageLoader }
  } = ctx.buildConfig;
  if (imageLoader === "default") {
    ctx.netlifyConfig.redirects.push({
      from: imageEndpointPath,
      // w and q are too short to be used as params with id-length rule
      // but we are forced to do so because of the next/image loader decides on their names
      // eslint-disable-next-line id-length
      query: { url: ":url", w: ":width", q: ":quality" },
      to: "/.netlify/images?url=:url&w=:width&q=:quality",
      status: 200
    });
  }
};

export {
  setImageConfig
};
