var deployContainer = process.env.DEPLOY_CONTAINER || 'test';
var deployCdnName = process.env.DEPLOY_AZURE_CDN_NAME;
var deployCdnUrl = process.env.DEPLOY_AZURE_CDN_URL;
var deployCdnSecret = process.env.DEPLOY_AZURE_CDN_SECRET;

var gulp = require('gulp');
var deployCdn = require('deploy-azure-cdn');

gulp.task('deploy',function () {
return gulp.src(['index.html', 'images/**', 'bower_components'], {
}).pipe(deployCdn.gulpPlugin({
    containerName: deployContainer,
    serviceOptions: [deployCdnName, deployCdnSecret],
    folder: '',
    zip: true,
    deleteExistingBlobs: false,
    metadata: {
        cacheControl: 'no-cache' // no cache in browser because this page changes with every release
        // we'll trust Azure cache heuristics for now for controlling CDN edge cache: http://msdn.microsoft.com/en-us/library/windowsazure/gg680306.aspx

    }
}))
});