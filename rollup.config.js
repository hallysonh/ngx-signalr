export default {
  entry: './dist/index.js',
  dest: './dist/bundles/ngx-signalr.umd.js',
  format: 'umd',
  // Global namespace.
  moduleName: 'ng.ngx-signalr',
  // External libraries.
  external: ['@angular/core', '@angular/common', '@angular/router', 'rxjs'],
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/router': 'ng.router',
    rxjs: 'Rx'
  },
  onwarn: () => {
    return;
  }
};
