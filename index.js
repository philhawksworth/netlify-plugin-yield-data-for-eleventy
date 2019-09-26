const fs = require('fs');


function netlifyPlugin(conf) {

  const DATA_DIR = conf.data_dir;

  return {

    // Hook into lifecycle
    prebuild: (data) => {
      const PLUGIN_CACHE_DIR = `${data.constants.CACHE_DIR}/netlify-plugin-fetch-feeds`;
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
