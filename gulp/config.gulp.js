var paths = {
    root: 'app/public/',
    fonts: 'app/public/fonts/',
    css: 'app/public/css/',
    img: 'app/public/img/',
    js: 'app/public/js/'
};

module.exports = {
    paths: paths,
    buildPath: buildPath
};

function buildPath(type, prefix){

    if (typeof prefix === 'undefined') {
        prefix = '';
    }

    return prefix + paths[type];
}