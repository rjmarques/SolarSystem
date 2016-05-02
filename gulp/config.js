var dist = "dist";
var build = "build";
var src = 'src';

module.exports = {
	src: {
		src: src,
		app: src + "/app",
		lib: src + "/lib",
		scss: src + '/scss',
		img: src + '/img'
	},
	build: {
		build: build,
		css: build + '/css',
		js: build + "/js",
		img: build + "/img"
	},
	dist: {
		dist: dist,
		css: dist + '/css',
		js: dist + "/js",
		img: dist + "/img"		
	}
};
