import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

const fs = require('fs');

/**
 * Get project root path
 * @descrition without trailing slash
 */
export function getRootPath() {
  return path.resolve(process.cwd());
}

/**
 * Get the project src path
 * @param srcName - src directory name (default: "src")
 * @descrition without trailing slash
 */
export function getSrcPath(srcName = 'src') {
  const rootPath = getRootPath();

  return `${rootPath}/${srcName}`;
}

export default defineConfig(() => {
  const rootPath = getRootPath();
  const srcPath = getSrcPath();

  return {
    define: {

    },
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath
      }
    },
    build: {
      minify: false,
      cssMinify: true,
      cssCodeSplit: true,
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code == 'MODULE_LEVEL_DIRECTIVE') {
            return;
          }
          warn(warning);
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              let arrId = [
                'antd',
                '@ant-design/icons',
                '@fortawesome',
                '@syncfusion/ej2-base',
                '@syncfusion/ej2-calendars',
                '@syncfusion/ej2-data',
                '@syncfusion/ej2-dropdowns',
                '@syncfusion/ej2-grids',
                '@syncfusion/ej2-inputs',
                '@syncfusion/ej2-navigations',
                '@syncfusion/ej2-popups',
                '@syncfusion/ej2-schedule',
                '@syncfusion'
              ];
              for (let index = 0; index < arrId.length; index++) {
                const element = arrId[index];
                if (id.includes(element)) { return element.replace('/', '-'); }
              }

              /**
              if (id.includes('@syncfusion')) {
                let newId = manualChunksSplitId(id, '@syncfusion');
                if (newId) { return newId; }
              }
              */
            }
          }
        }
      }
    },
    plugins: [
      react(),
      {
        name: 'version-plugin',
        writeBundle() {
          const hash = Date.now().toString();
          fs.writeFileSync('dist/version.json', JSON.stringify({ hash }));
        }
      }
    ],
    css: {
      modules: {
        localsConvention: 'dashes'
      }
    },
    base: `./`,
    server: {
      // port: 1841
    }
  };
});
