var onReady = function() {
	var View = require('threejs-managed-view').View;
	var SplineLoop = require('threejs-spline-loop');
	var SplineLoopHelper = require('./');
	var view = new View({
		useRafPolyfill: false
	});
	var scene = view.scene;
	view.camera.updateMatrixWorld();

	var pointsTotal = 8;
	var radius = 4;
	var points = [];
	for (var i = 0; i < pointsTotal; i++) {
		var ratio = i / pointsTotal;
		var radian = ratio * Math.PI * 2;
		var point = new THREE.Vector3();
		point.set(
			Math.cos(radian) * radius,
			1,
			Math.sin(radian) * radius
		);
		point.x += Math.random() - .5;
		point.y += Math.random() - .5;
		point.z += Math.random() - .5;
		points.push(point);
	};

	var spline = new SplineLoop(points);
	spline.cache(100);
	var splineHelper = new SplineLoopHelper(spline, {
		color: 0xffdfff,
		handleRadius: .15,
		alwaysOnTop: true
	});
	scene.add(splineHelper);

	var playHandle = splineHelper.handles[0];
	view.renderManager.onEnterFrame.add(function() {
		playHandle.position.x *= .9;
		playHandle.point.copy(playHandle.position);
		spline.updateCache();
		splineHelper.update();
	})
	
}

var loadAndRunScripts = require('loadandrunscripts');
loadAndRunScripts(
	[
		'bower_components/three.js/three.js'
	],
	onReady
);