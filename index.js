const fs = require('fs');


function netlifyPlugin(conf) {

  // Where does the plugin config tell us to put data?
  const DATA_DIR = conf.data_dir;
  let PLUGIN_CACHE_ROOT;
  let CACHE_FOLDERS = [];

  return {

    // Hook into lifecycle
    onPreBuild: (data) => {

      const prodCache = '/opt/build/cache';
      if (fs.existsSync(prodCache)) {
        PLUGIN_CACHE_ROOT = `${prodCache}`;
        console.log('prodCache exists. Cache here:', PLUGIN_CACHE_ROOT);
      } else {
        PLUGIN_CACHE_ROOT = `${data.constants.CACHE_DIR}`;
        console.log('We are local. Cache here:', PLUGIN_CACHE_ROOT);
      }

      // collect an array of every folder specified in yaml
      conf.cache_sources.forEach(folder => {
        CACHE_FOLDERS.push(`${PLUGIN_CACHE_ROOT}/${folder}`)
      });




      // ensure the target directory exists
      if (!fs.existsSync(DATA_DIR)){
        fs.mkdirSync(DATA_DIR, {recursive: true})
      };


      console.log('CACHE_FOLDERS :', CACHE_FOLDERS);


      CACHE_FOLDERS.forEach(folder => {


        // copy each file to the SSG's data directory
        fs.readdir(folder, (err, files) => {
          files.forEach(file => {

            fs.writeFile(`${DATA_DIR}/${file}`, require(`${folder}/${file}`).content, err => {
              if(err) {
                console.log(`Problem copying data file: ${file}`, err);
              } else {
                console.log(`Data saved for SSG: ${file}`);
              }
            });

          });
        });

      });
    }

  };
};

module.exports = netlifyPlugin;
