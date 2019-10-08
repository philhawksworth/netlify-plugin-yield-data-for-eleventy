const fs = require('fs');


function netlifyPlugin(conf) {

  // Where does the plugin config tell us to put data?
  const DATA_DIR = conf.data_dir;
  let PLUGIN_CACHE_DIR;

  return {

    // Hook into lifecycle
    preBuild: (data) => {

      const prodCache = '/opt/build/cache';
      if (fs.existsSync(prodCache)) {
        PLUGIN_CACHE_DIR = `${prodCache}/netlify-plugin-fetch-feeds`;
        console.log('prodCache exists. Cache here:', PLUGIN_CACHE_DIR);s
      } else {
        PLUGIN_CACHE_DIR = `${data.constants.CACHE_DIR}/netlify-plugin-fetch-feeds`;
        console.log('We are local. Cache here:', PLUGIN_CACHE_DIR);
      }

      // ensure the target directory exists
      if (!fs.existsSync(DATA_DIR)){
        fs.mkdirSync(DATA_DIR, {recursive: true})
      };


      // copy each file to the SSG's data directory
      fs.readdir(PLUGIN_CACHE_DIR, (err, files) => {
        files.forEach(file => {

          fs.writeFile(`${DATA_DIR}/${file}`, require(`${PLUGIN_CACHE_DIR}/${file}`).content, err => {
            if(err) {
              console.log(`Problem copying data file: ${file}`, err);
            } else {
              console.log(`Data saved for SSG: ${file}`);
            }
          });

        });
      });
    }

  };
};

module.exports = netlifyPlugin;
